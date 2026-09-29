import { ImageResponse } from "next/og";
import {
  brandGradient,
  BrandLockup,
  loadMetadataBrandAssets,
  metadataBrandFonts,
} from "@/lib/metadata-brand";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default async function Icon() {
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
        <BrandLockup lockupSrc={lockupSrc} lockupWidth={142} taglineSize={12} taglineGap={2} />
      </div>
    ),
    {
      ...size,
      fonts: metadataBrandFonts(fontBold),
    },
  );
}
