import { readFile } from "node:fs/promises";
import { join } from "node:path";

const fontPath = join(process.cwd(), "src/fonts/Montserrat-Bold.ttf");
const lockupPath = join(process.cwd(), "src/images/logo-insidebeta.png");

export const brandGradient =
  "linear-gradient(135deg, #061828 0%, #0A2540 58%, #1565C0 100%)";

export async function loadMetadataBrandAssets() {
  const [fontBold, lockup] = await Promise.all([
    readFile(fontPath),
    readFile(lockupPath),
  ]);

  return {
    fontBold,
    lockupSrc: `data:image/png;base64,${lockup.toString("base64")}`,
  };
}

export function metadataBrandFonts(fontBold: Buffer) {
  return [{ name: "Montserrat", data: fontBold, weight: 700 as const, style: "normal" as const }];
}

/** Lockup PNG with the legal line cropped; tagline rendered separately as white text. */
export function BrandLockup({
  lockupSrc,
  lockupWidth,
  taglineSize,
  taglineGap,
}: {
  lockupSrc: string;
  lockupWidth: number;
  taglineSize: number;
  taglineGap: number;
}) {
  const lockupHeight = Math.round(lockupWidth * (428 / 550));
  const visibleHeight = Math.round(lockupHeight * 0.84);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          overflow: "hidden",
          height: visibleHeight,
          width: lockupWidth,
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        {/* ImageResponse requires a native img; next/image is not supported here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={lockupSrc} alt="" width={lockupWidth} height={lockupHeight} />
      </div>
      <div
        style={{
          marginTop: taglineGap,
          fontSize: taglineSize,
          fontWeight: 700,
          letterSpacing: 0.5,
          color: "#ffffff",
        }}
      >
        Klimatyzacja
      </div>
    </div>
  );
}
