import satori from "satori";
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const fontsDir = join(process.cwd(), "src/assets/fonts");
const fontRegular = readFileSync(join(fontsDir, "SpaceGrotesk-Regular.ttf"));
const fontBold = readFileSync(join(fontsDir, "SpaceGrotesk-Bold.ttf"));

export async function generateOgImage({
  title,
  description,
}: {
  title: string;
  description?: string;
}): Promise<Uint8Array> {
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#0a0a0a",
          padding: "60px",
          fontFamily: "Space Grotesk",
        },
        children: [
          // Top accent border
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(to right, #a1a1aa, #fafafa, #a1a1aa)",
              },
            },
          },
          // ET. wordmark
          {
            type: "div",
            props: {
              style: {
                fontSize: "28px",
                fontWeight: 700,
                color: "#fafafa",
                letterSpacing: "-0.02em",
              },
              children: "ET.",
            },
          },
          // Spacer
          {
            type: "div",
            props: { style: { flex: 1 } },
          },
          // Title
          {
            type: "div",
            props: {
              style: {
                fontSize: title.length > 60 ? "40px" : "52px",
                fontWeight: 700,
                color: "#fafafa",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: description ? "20px" : "0",
              },
              children: title,
            },
          },
          // Description
          ...(description
            ? [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "22px",
                      fontWeight: 400,
                      color: "#a1a1aa",
                      lineHeight: 1.4,
                    },
                    children:
                      description.length > 120
                        ? description.slice(0, 117) + "..."
                        : description,
                  },
                },
              ]
            : []),
          // Bottom row
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "32px",
                fontSize: "18px",
                fontWeight: 400,
                color: "#71717a",
              },
              children: "eriktaheri.com",
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Space Grotesk",
          data: fontRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Space Grotesk",
          data: fontBold,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Uint8Array(png.buffer, png.byteOffset, png.byteLength);
}
