import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Shared Open Graph / Twitter card renderer: black/gold TAOS branding, generated at build
// time so no large share images need to live in public/.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const GOLD = "#d4af37";

function Swirl() {
  return (
    <svg width="240" height="28" viewBox="0 0 240 28" fill="none">
      <path
        d="M4 14 C 40 14, 60 4, 86 8 C 100 10, 104 20, 96 22 C 90 23, 88 16, 94 14 L 108 14"
        stroke={GOLD}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M236 14 C 200 14, 180 4, 154 8 C 140 10, 136 20, 144 22 C 150 23, 152 16, 146 14 L 132 14"
        stroke={GOLD}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M120 6 L 128 14 L 120 22 L 112 14 Z" fill={GOLD} />
    </svg>
  );
}

export async function renderOg({ title, subtitle }: { title: string; subtitle: string }) {
  const playfair = await readFile(join(process.cwd(), "assets/fonts/PlayfairDisplay-SemiBold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          backgroundImage:
            "radial-gradient(circle at 50% 42%, rgba(212,175,55,0.20), rgba(0,0,0,0) 62%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: "1px solid rgba(212,175,55,0.55)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 7,
            color: GOLD,
            marginBottom: 22,
          }}
        >
          THE ART OF SENSUALITY
        </div>
        <Swirl />
        <div
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            fontFamily: "Playfair Display",
            fontSize: 68,
            lineHeight: 1.15,
            color: "#fff",
            maxWidth: 1000,
            marginTop: 30,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            fontSize: 30,
            color: GOLD,
            maxWidth: 980,
            marginTop: 26,
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 54,
            display: "flex",
            fontSize: 20,
            letterSpacing: 2,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          theartofsensuality.com
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [{ name: "Playfair Display", data: playfair, weight: 600, style: "normal" }],
    },
  );
}
