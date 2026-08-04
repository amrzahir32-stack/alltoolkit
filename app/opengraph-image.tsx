import { ImageResponse } from "next/og";

export const alt = "AllToolkit — free online tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FAF7F2 0%, #F1E4D5 55%, #E6C8A5 100%)",
          color: "#2D241C",
          fontFamily: "Arial, sans-serif",
          padding: 72,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "2px solid rgba(167,116,77,.35)",
            borderRadius: 44,
            padding: 56,
            background: "rgba(255,252,248,.82)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            <div
              style={{
                width: 70,
                height: 70,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                borderRadius: 22,
                background: "linear-gradient(135deg, #D6B48B, #A7744D)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  left: 23,
                  width: 24,
                  height: 5,
                  borderRadius: 999,
                  background: "white",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  left: 32,
                  width: 6,
                  height: 32,
                  borderRadius: 999,
                  background: "white",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 29,
                  left: 27,
                  width: 16,
                  height: 16,
                  borderRadius: 999,
                  background: "white",
                }}
              />
            </div>
            <span>AllToolkit</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 72,
                lineHeight: 1.05,
                fontWeight: 900,
                letterSpacing: -3,
              }}
            >
              <span>Free online tools.</span>
              <span>One simple website.</span>
            </div>
            <div style={{ display: "flex", fontSize: 28, color: "#6B5B4D" }}>
              <span>PDFs · Images · Student tools · Calculators · Developer utilities</span>
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 24, color: "#8E6240", fontWeight: 700 }}>
            <span>Fast · Mobile-friendly · No account required</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
