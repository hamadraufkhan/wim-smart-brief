import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const publicDir = "dist/client";
const indexPath = join(publicDir, "index.html");

if (!existsSync(indexPath)) {
  console.error(`Missing ${indexPath} — SPA prerender may have failed.`);
  process.exit(1);
}

copyFileSync(indexPath, join(publicDir, "404.html"));
console.log("Created 404.html SPA fallback for GitHub Pages.");
