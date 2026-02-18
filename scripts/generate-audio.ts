import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Load .env file if present (local dev); on Cloudflare Pages env vars are injected directly
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = join(ROOT, ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx > 0) {
      const key = trimmed.slice(0, idx).trim();
      let value = trimmed.slice(idx + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[key] ??= value;
    }
  }
}

const CONTENT_DIR = join(ROOT, "src", "content", "writing");
const AUDIO_DIR = join(ROOT, "public", "audio");
const MANIFEST_PATH = join(AUDIO_DIR, ".manifest.json");

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "bIHbv24MWmeRgasZH58o";
const MODEL_ID = "eleven_flash_v2_5";
const API_BASE = "https://api.elevenlabs.io/v1";

interface ManifestEntry {
  hash: string;
}

function parseFrontmatter(content: string): {
  data: Record<string, string>;
  body: string;
} {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };

  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      let value = line.slice(idx + 1).trim();
      // Strip surrounding quotes
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      data[key] = value;
    }
  }
  return { data, body: match[2] };
}

function stripMarkdownForTTS(markdown: string): string {
  return (
    markdown
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, "")
      // Remove inline code
      .replace(/`[^`]+`/g, "")
      // Remove images
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
      // Convert links to just their text
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      // Remove HTML tags
      .replace(/<[^>]+>/g, "")
      // Remove tables (lines starting with |)
      .replace(/^\|.*$/gm, "")
      // Remove horizontal rules
      .replace(/^---+$/gm, "")
      // Remove heading markers but keep text
      .replace(/^#{1,6}\s+/gm, "")
      // Remove bold/italic markers
      .replace(/\*{1,3}([^*]+)\*{1,3}/g, "$1")
      // Remove remaining markdown formatting chars
      .replace(/[_~`>]/g, "")
      // Collapse whitespace
      .replace(/\n{3,}/g, "\n\n")
      .replace(/[ \t]+/g, " ")
      .trim()
  );
}

function hashContent(content: string): string {
  return createHash("sha256").update(content).digest("hex").slice(0, 16);
}

function chunkText(text: string, maxChars = 38000): string[] {
  if (text.length <= maxChars) return [text];

  const chunks: string[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    if (remaining.length <= maxChars) {
      chunks.push(remaining);
      break;
    }

    // Find a sentence boundary within the limit
    let splitAt = -1;
    for (let i = maxChars - 1; i >= maxChars / 2; i--) {
      if (".!?".includes(remaining[i])) {
        splitAt = i + 1;
        break;
      }
    }
    if (splitAt === -1) {
      // Fall back to space
      splitAt = remaining.lastIndexOf(" ", maxChars);
      if (splitAt === -1) splitAt = maxChars;
    }

    chunks.push(remaining.slice(0, splitAt).trim());
    remaining = remaining.slice(splitAt).trim();
  }

  return chunks;
}

async function generateSpeech(text: string): Promise<Buffer> {
  const chunks = chunkText(text);
  const buffers: Uint8Array[] = [];

  for (let i = 0; i < chunks.length; i++) {
    if (chunks.length > 1) {
      console.log(`    Chunk ${i + 1}/${chunks.length} (${chunks[i].length} chars)`);
    }

    const response = await fetch(
      `${API_BASE}/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": API_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: chunks[i],
          model_id: MODEL_ID,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `ElevenLabs API error ${response.status}: ${errorText}`
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    buffers.push(new Uint8Array(arrayBuffer));
  }

  return Buffer.concat(buffers);
}

async function main() {
  if (!API_KEY) {
    console.log(
      "ELEVENLABS_API_KEY not set — skipping audio generation."
    );
    return;
  }

  console.log("Generating audio for writing posts...\n");

  // Ensure output dir exists
  mkdirSync(AUDIO_DIR, { recursive: true });

  // Load manifest
  let manifest: Record<string, ManifestEntry> = {};
  if (existsSync(MANIFEST_PATH)) {
    manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"));
  }

  // Find all writing posts
  const files = readdirSync(CONTENT_DIR).filter(
    (f) => f.endsWith(".md") || f.endsWith(".mdx")
  );

  let generated = 0;
  let skipped = 0;

  for (const file of files) {
    const slug = basename(file, file.endsWith(".mdx") ? ".mdx" : ".md");
    const content = readFileSync(join(CONTENT_DIR, file), "utf-8");
    const { data, body } = parseFrontmatter(content);

    // Skip drafts
    if (data.draft === "true") {
      console.log(`  [skip] ${slug} (draft)`);
      skipped++;
      continue;
    }

    const hash = hashContent(body);

    // Check cache
    if (manifest[slug]?.hash === hash && existsSync(join(AUDIO_DIR, `${slug}.mp3`))) {
      console.log(`  [cache] ${slug} — unchanged, skipping`);
      skipped++;
      continue;
    }

    const title = data.title || slug;
    const ttsText = `${title}.\n\n${stripMarkdownForTTS(body)}`;
    console.log(`  [gen] ${slug} (${ttsText.length} chars)`);

    const mp3 = await generateSpeech(ttsText);
    writeFileSync(join(AUDIO_DIR, `${slug}.mp3`), new Uint8Array(mp3));
    manifest[slug] = { hash };
    generated++;
  }

  // Write manifest
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  console.log(
    `\nDone. Generated: ${generated}, Skipped: ${skipped}`
  );
}

main().catch((err) => {
  console.error("Audio generation failed:", err);
  process.exit(1);
});
