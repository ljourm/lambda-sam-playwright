import { build } from "esbuild";
import { globSync } from "node:fs";

const entryPoints = globSync("./src/functions/*/index.ts");

console.log("Building entry points:", entryPoints);

build({
  entryPoints,
  outdir: "dist/functions",
  bundle: true,
  platform: "node",
  target: "node22",
  sourcemap: true,
  minify: false,
  format: "cjs",
  outbase: "./src/functions",
});

console.log("Build completed.");
