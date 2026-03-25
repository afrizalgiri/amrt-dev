import { ImageResponse } from "next/og";

export const alt = "Belajar Web Gratis | AMRT.dev";
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
        {/* Top: breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#555", fontSize: "15px" }}>AMRT.dev</span>
          <span style={{ color: "#333", fontSize: "15px" }}>›</span>
          <span style={{ color: "#666", fontSize: "15px" }}>Belajar</span>
        </div>

        {/* Center */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p style={{ color: "#444", fontSize: "14px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", margin: 0 }}>
            Panduan Gratis
          </p>
          <h1
            style={{
              color: "#fff",
              fontSize: "72px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-2.5px",
              margin: 0,
            }}
          >
            Belajar membuat
            <br />
            website dari nol.
          </h1>
          <p style={{ color: "#555", fontSize: "22px", margin: 0, marginTop: "8px" }}>
            HTML, CSS & JavaScript untuk pemula. Gratis selamanya.
          </p>
        </div>

        {/* Bottom: stats */}
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ color: "#fff", fontSize: "26px", fontWeight: 700 }}>4+</span>
            <span style={{ color: "#444", fontSize: "14px" }}>Panduan</span>
          </div>
          <div style={{ width: "1px", height: "40px", background: "#1a1a1a" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ color: "#fff", fontSize: "26px", fontWeight: 700 }}>Gratis</span>
            <span style={{ color: "#444", fontSize: "14px" }}>Selamanya</span>
          </div>
          <div style={{ width: "1px", height: "40px", background: "#1a1a1a" }} />
          <span style={{ color: "#333", fontSize: "15px", marginLeft: "auto" }}>amertadev.my.id/belajar</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
