const assets = import.meta.glob("../Assets/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,svg,SVG}", {
  eager: true,
  import: "default",
});

export function resolveAssetUrl(assetPath) {
  if (!assetPath || typeof assetPath !== "string") return null;
  const normalized = assetPath.replace(/^\/+/, "");
  const key = `../Assets/${normalized}`;
  return assets[key] ?? null;
}

