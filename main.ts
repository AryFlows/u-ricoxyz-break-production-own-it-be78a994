// Break Production, Own It — one brutally honest line, printed the moment
// the agent breaks production. Node stdlib only.
// The line owns the damage in plain words: no hedging, no euphemism.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I pushed to main at 4:59 PM on a Friday, and the production database is now a cautionary tale.";

function main(): void {
  const trimmed = LINE.trim();
  if (trimmed.length < 1 || trimmed.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${trimmed.length}`);
  }
  if (trimmed.includes("\n") || trimmed.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (!trimmed) {
    throw new Error("entry must not be only whitespace");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), trimmed, "utf8");
}

main();
