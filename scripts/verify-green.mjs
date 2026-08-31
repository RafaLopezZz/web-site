import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const astroCli = resolve(root, "node_modules/astro/bin/astro.mjs");
const e2eRunner = resolve(root, "scripts/run-e2e.mjs");
const focusedTest = process.argv[2];
const regressions = [
  "tests/site-header.spec.ts",
  "tests/surface-foundation.spec.ts",
  "tests/action-system.spec.ts",
  "tests/locale-system.spec.ts",
  "tests/theme-system.spec.ts",
];

if (!focusedTest) throw new Error("Usage: npm run verify:green -- tests/<focused>.spec.ts");

const run = (command, args) => {
  const result = spawnSync(command, args, { cwd: root, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
};

const validateDesign = async () => {
  const design = await readFile(resolve(root, "DESIGN.md"), "utf8");
  if (!design.includes("## Post-GREEN Validation Gate")) throw new Error("DESIGN.md is missing the post-GREEN gate.");
};

run(process.execPath, [astroCli, "build"]);
run(process.execPath, [e2eRunner, focusedTest]);
run(process.execPath, [e2eRunner, ...regressions]);
run(process.execPath, [e2eRunner]);
run(process.execPath, [astroCli, "build"]);
await validateDesign();
run("git", ["-c", `safe.directory=${root.replaceAll("\\", "/")}`, "-C", root, "diff", "--check"]);

console.log("Automated GREEN gate passed. Human visual review is still required before accepting the design; do not fix visual snapshots yet.");
