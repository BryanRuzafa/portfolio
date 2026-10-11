import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/**
 * Imagen para compartir (Open Graph / Twitter): se genera en el build con los mismos
 * colores y tipografía que la web. El retrato es un PNG en _og/ porque next/og no lee WebP.
 */
export const alt = `${siteConfig.name} · Full-Stack Developer & Cybersecurity Student`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fonts = join(process.cwd(), "node_modules/geist/dist/fonts");

export default async function OpengraphImage() {
  const [semibold, regular, mono, portrait] = await Promise.all([
    readFile(join(fonts, "geist-sans/Geist-SemiBold.ttf")),
    readFile(join(fonts, "geist-sans/Geist-Regular.ttf")),
    readFile(join(fonts, "geist-mono/GeistMono-Medium.ttf")),
    readFile(join(process.cwd(), "src/app/_og/portrait.png")),
  ]);
  const portraitSrc = `data:image/png;base64,${portrait.toString("base64")}`;
  const [first, ...rest] = siteConfig.name.split(" ");
  const domain = siteConfig.url.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#090d16",
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          fontFamily: "Geist",
          color: "#e6ebf3",
        }}
      >
        {/* Halo navy */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            backgroundImage: "radial-gradient(ellipse 700px 380px at 600px 0px, rgba(30,58,138,0.5), rgba(30,58,138,0))",
          }}
        />

        {/* Texto */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 80px", width: 780 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "Geist Mono", fontSize: 22, color: "#38bdf8" }}>
            <div style={{ width: 10, height: 10, borderRadius: 9999, backgroundColor: "#0ea5e9" }} />
            {domain}
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 28, fontSize: 76, fontWeight: 600, lineHeight: 0.98, letterSpacing: "-0.04em" }}>
            <span>{first}</span>
            <span>{rest.join(" ")}</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#e6ebf3" }}>Full-Stack Developer & Cybersecurity Student</div>
          <div style={{ display: "flex", gap: 10, marginTop: 34 }}>
            {["NestJS", "Vue", "Docker", "Linux", "OWASP"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  padding: "8px 16px",
                  borderRadius: 10,
                  border: "1px solid #283349",
                  backgroundColor: "rgba(13,19,32,0.8)",
                  fontSize: 22,
                  color: "#94a3b8",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Retrato con marco, la cabeza sobresale por arriba como en el hero */}
        <div style={{ display: "flex", position: "absolute", right: 56, bottom: 0, width: 360, height: 480 }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 95,
              bottom: -40,
              borderRadius: 32,
              border: "1px solid rgba(14,165,233,0.45)",
              background: "radial-gradient(90% 70% at 50% 10%, rgba(30,58,138,0.7), rgba(13,19,32,1) 75%)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portraitSrc}
            width={368}
            height={480}
            style={{ position: "absolute", left: -4, bottom: 0, objectFit: "contain" }}
            alt=""
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
