import { ImageResponse } from "next/og";

export const alt = "AMRT.dev | Digital Agency Indonesia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "Inter",
        }}
      >
        {/* Top: logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "#fff",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "20px", height: "20px", background: "#0a0a0a", borderRadius: "4px", display: "flex" }} />
          </div>
          <span style={{ color: "#fff", fontSize: "22px", fontWeight: 700, letterSpacing: "-0.5px" }}>
            AMRT<span style={{ color: "#555" }}>.dev</span>
          </span>
        </div>

        {/* Center: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p style={{ color: "#444", fontSize: "16px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", margin: 0 }}>
            Digital Agency Indonesia
          </p>
          <h1
            style={{
              color: "#fff",
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-2px",
              margin: 0,
              maxWidth: "820px",
            }}
          >
            Website profesional
            <br />
            untuk bisnis Anda.
          </h1>
        </div>

        {/* Bottom: tagline + domain */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ color: "#444", fontSize: "18px", margin: 0 }}>
            Web Development · Mobile App · UI/UX Design
          </p>
          <p style={{ color: "#333", fontSize: "16px", margin: 0 }}>amertadev.my.id</p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
