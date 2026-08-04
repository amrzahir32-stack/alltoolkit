import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AllToolkit",
    short_name: "AllToolkit",
    description: "Free online tools for PDF files, documents, images, text, calculations, studying and development.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#FAF7F2",
    theme_color: "#A7744D",
    orientation: "any",
    categories: ["productivity", "utilities", "education"],
    icons: [
      { src: "/alltoolkit-icon-v3-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/alltoolkit-icon-v3-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/alltoolkit-icon-v3-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
