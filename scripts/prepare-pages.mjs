import {
  copyFileSync,
  existsSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

const base = process.env.GITHUB_PAGES === "true" ? "/wim-smart-brief" : "";
const publicDir = "dist/client";

if (!existsSync(publicDir)) {
  console.error(`Missing ${publicDir} — run vite build with GITHUB_PAGES=true first.`);
  process.exit(1);
}

const favicon = join("public", "favicon.ico");
if (existsSync(favicon)) {
  copyFileSync(favicon, join(publicDir, "favicon.ico"));
}

writeFileSync(join(publicDir, ".nojekyll"), "");

const indexPath = join(publicDir, "index.html");

if (!existsSync(indexPath)) {
  const assetsDir = join(publicDir, "assets");
  if (!existsSync(assetsDir)) {
    console.error("Missing dist/client/assets — vite client build may have failed.");
    process.exit(1);
  }

  const assets = readdirSync(assetsDir);
  const script = assets.find((file) => /^index-.*\.js$/.test(file));
  const stylesheet = assets.find((file) => /^styles-.*\.css$/.test(file));

  if (!script) {
    console.error("Could not find index-*.js in dist/client/assets.");
    process.exit(1);
  }

  writeFileSync(
    indexPath,
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>AXLE//WIM — High-Speed Weigh-In-Motion Systems</title>
    <meta
      name="description"
      content="Engineering-grade high-speed Weigh-In-Motion (HS-WIM) — sensors, calibration, and analytics for pavement preservation and overweight enforcement."
    />
    <link rel="icon" href="${base}/favicon.ico" type="image/x-icon" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
    />
    ${stylesheet ? `<link rel="stylesheet" href="${base}/assets/${stylesheet}" />` : ""}
  </head>
  <body>
    <script type="module" src="${base}/assets/${script}"></script>
  </body>
</html>
`,
  );
  console.log("Generated index.html fallback for GitHub Pages.");
}

copyFileSync(indexPath, join(publicDir, "404.html"));
console.log("Prepared GitHub Pages output in dist/client.");
