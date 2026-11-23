import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const src = join(dir, "entry.txt");
// The entry is a single letter: one code point, one byte, no newline.
const letter = readFileSync(src, "utf8");
if ([...letter].length !== 1 || Buffer.byteLength(letter) !== 1) {
  throw new Error("entry.txt must contain exactly one byte");
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "entry.txt"));
