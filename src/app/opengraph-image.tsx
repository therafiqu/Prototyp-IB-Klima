import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "IB-Klima — profesjonalny montaż klimatyzacji w całej Małopolsce";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const font = await readFile(join(process.cwd(), "src/fonts/Montserrat-Bold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #061828 0%, #0A2540 58%, #1565C0 100%)",
          color: "white",
          padding: "72px",
          fontFamily: "Montserrat",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 36, fontWeight: 700 }}>
          IB-Klima
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 62, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1, maxWidth: 920 }}>
            Profesjonalny montaż klimatyzacji w całej Małopolsce
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#dbeafe" }}>
            Montaż od 1999 zł · Darmowa wycena · 696 658 661
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Montserrat", data: font, weight: 700, style: "normal" }],
    },
  );
}
