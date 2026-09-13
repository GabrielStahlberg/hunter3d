import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { common } from "@/content/common";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = common.description;

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public", "logo-mark.webp"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#fffef0",
          color: "#221f1a",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={96} height={92} alt="" />
        <div style={{ display: "flex", fontSize: 68, fontWeight: 600, marginTop: 24 }}>{site.name}</div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 20, color: "#5a5347", maxWidth: 820 }}>
          {site.seo.defaultTitle.split("—")[1]?.trim() ?? common.description}
        </div>
      </div>
    ),
    { ...size },
  );
}
