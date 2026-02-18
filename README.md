# eriktaheri.com

Personal blog and portfolio site — fully static, zero JavaScript frameworks, shipped to the edge.

**[eriktaheri.com](https://eriktaheri.com)**

## Tech Stack

- **[Astro v5](https://astro.build)** — Static site generation with zero client-side JS by default
- **[Tailwind CSS v4](https://tailwindcss.com)** — Utility-first styling via the native Vite plugin (no config file)
- **[Cloudflare Pages](https://pages.cloudflare.com)** — Edge deployment with global CDN

## Features

### AI-Generated Audio (ElevenLabs TTS)

Every blog post gets a "Listen" button with an inline audio player. A pre-build script (`scripts/generate-audio.ts`) converts Markdown to speech using ElevenLabs' API:

- Strips code blocks, images, tables, and HTML before sending to TTS
- Content-hashed manifest for incremental builds — only regenerates audio when post content changes
- Chunked requests for long posts that exceed the API character limit
- Inline player with play/pause, seek bar, and remaining time display

### Dynamic OG Images (Satori + Sharp)

Open Graph share images are generated at build time for every writing and project post using [Satori](https://github.com/vercel/satori) (JSX-to-SVG) and [Sharp](https://sharp.pixelplumbing.com) (SVG-to-PNG). Each image uses the site's Space Grotesk font and matches the dark theme, so links look polished on Twitter/Slack/Discord without maintaining any image files.

### GSAP Cursor-Follow Effect

The homepage hero has a hover interaction where a portrait image tracks the cursor with spring physics using GSAP. Disabled on touch devices.

### View Transitions

Astro's `ClientRouter` provides smooth page-to-page transitions with SPA-like feel while remaining fully static. Audio playback and theme state are preserved across navigations via `astro:before-swap` and `astro:after-swap` lifecycle hooks.

### Dark Mode with System Detection

Three-way theme toggle (light / dark / system) persisted to `localStorage`. An inline script in `<head>` applies the theme before first paint to prevent flash-of-wrong-theme. Respects OS-level preference changes in real time when set to system.

### Dual Syntax Highlighting

Shiki code blocks are configured with both `github-light` and `github-dark` themes, switching automatically with the dark mode toggle via CSS custom properties.

### Content Architecture

Astro v5 Content Layer API with Zod-validated schemas and `glob()` loaders for three collections: writing, work history, and projects. Draft filtering, reading time estimation, and date-grouped listings are all computed at build time.

## Project Structure

```
src/
├── components/       # Astro components (Header, Footer, ArrowCard, ThemeToggle, etc.)
├── content/
│   ├── writing/      # Blog posts (Markdown/MDX)
│   ├── work/         # Work history entries
│   └── projects/     # Project entries (Markdown/MDX)
├── layouts/          # Shared page layout with SEO, transitions, animations
├── lib/              # Utilities (og-image generator, date formatting, reading time)
├── pages/            # File-based routing + OG image endpoints + RSS feed
└── styles/           # Tailwind v4 theme (CSS custom properties, prose overrides)
scripts/
└── generate-audio.ts # ElevenLabs TTS pre-build script
```

## Development

```bash
pnpm install
pnpm dev        # Start dev server
pnpm build      # Type-check + build (runs audio generation first)
pnpm preview    # Preview production build locally
```

### Environment Variables

| Variable | Description |
| --- | --- |
| `ELEVENLABS_API_KEY` | ElevenLabs API key for TTS audio generation |
| `ELEVENLABS_VOICE_ID` | Voice ID (optional, has default) |

Audio generation is skipped gracefully when the API key is not set.
