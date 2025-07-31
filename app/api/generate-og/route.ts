import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const text = searchParams.get("text") || "GRAFFITI"
    const style = searchParams.get("style") || "wildstyle"

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1f2937",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #374151 2%, transparent 0%), radial-gradient(circle at 75px 75px, #374151 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: "#fbbf24",
            textAlign: "center",
            marginBottom: 20,
            textShadow: "4px 4px 0px #000000",
            transform: "rotate(-2deg)",
          }}
        >
          {text.toUpperCase()}
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#e5e7eb",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Erstellt mit Graffiti Generator
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#9ca3af",
            textAlign: "center",
          }}
        >
          25+ Graffiti-Stile • Kostenlos • Sofort-Download
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
