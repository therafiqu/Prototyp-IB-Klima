import { ImageResponse } from "next/og";
import {
  brandGradient,
  BrandLockup,
  loadMetadataBrandAssets,
  metadataBrandFonts,
} from "@/lib/metadata-brand";

export const dynamic = "force-static";
export const alt = "InsideBeta — Klimatyzacja w Małopolsce";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const { fontBold, lockupSrc } = await loadMetadataBrandAssets();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brandGradient,
          fontFamily: "Montserrat",
        }}
      >
        <BrandLockup lockupSrc={lockupSrc} lockupWidth={520} taglineSize={36} taglineGap={4} />
      </div>
    ),
    {
      ...size,
      fonts: metadataBrandFonts(fontBold),
    },
  );
}
