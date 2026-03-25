import { ImageResponse } from "next/og";
import { getGuide } from "@/lib/guides";

export const alt = "Panduan Belajar | AMRT.dev";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props { params: Promise<{ slug: string }> }

const categoryLabel: Record<string, string> = {
  HTML: "HTML",
  CSS: "CSS",
  JavaScript: "JavaScript",
  Project: "Project",
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);

  const inter = await fetch(
    "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff"
  ).then((r) => r.arrayBuffer());

  const title = guide?.title ?? "Panduan Web";
  const description = guide?.description ?? "Belajar web development gratis";
  const category = guide ? (categoryLabel[guide.category] ?? guide.category) : "Guide";
  const duration = guide?.duration ?? "";

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
          <span style={{ color: "#555", fontSize: "15px" }}>Belajar</span>
          <span style={{ color: "#333", fontSize: "15px" }}>›</span>
          <span style={{ color: "#666", fontSize: "15px" }}>{category}</span>
        </div>

        {/* Center */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                background: "#161616",
                border: "1px solid #2a2a2a",
                color: "#888",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                padding: "6px 14px",
                borderRadius: "100px",
              }}
            >
              {category}
            </span>
            {duration && (
              <span style={{ color: "#444", fontSize: "14px" }}>{duration}</span>
            )}
          </div>

          <h1
            style={{
              color: "#fff",
              fontSize: title.length > 30 ? "56px" : "68px",
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: "-2px",
              margin: 0,
              maxWidth: "900px",
            }}
          >
            {title}
          </h1>

          <p style={{ color: "#555", fontSize: "20px", margin: 0, maxWidth: "700px", lineHeight: 1.5 }}>
            {description}
          </p>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                background: "#fff",
                borderRadius: "7px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "14px", height: "14px", background: "#0a0a0a", borderRadius: "3px", display: "flex" }} />
            </div>
            <span style={{ color: "#fff", fontSize: "16px", fontWeight: 700 }}>
              AMRT<span style={{ color: "#444" }}>.dev</span>
            </span>
          </div>
          <p style={{ color: "#333", fontSize: "15px", margin: 0 }}>amertadev.my.id/belajar</p>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Inter", data: inter, weight: 400, style: "normal" }],
    }
  );
}
