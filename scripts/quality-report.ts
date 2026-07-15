/**
 * Local documentation quality report.
 *
 * Usage:
 *   npm run quality - typecheck, lint, knip, depcheck
 *
 * Knip is advisory during the initial rollout: it is reported in the summary,
 * but it does not make this script fail until the unused-code baseline is clean.
 */

import { spawnSync } from "child_process";

type StepStatus = "ok" | "failed";

interface StepResult {
  name: string;
  script: string;
  status: StepStatus;
  durationMs: number;
  blocking: boolean;
}

const steps: { name: string; script: string; blocking: boolean }[] = [
  { name: "Typecheck", script: "typecheck", blocking: true },
  { name: "ESLint", script: "lint", blocking: true },
  { name: "Knip", script: "quality:knip", blocking: false },
  { name: "Depcheck", script: "quality:deps", blocking: true },
];

function runStep(name: string, script: string, blocking: boolean): StepResult {
  const start = Date.now();
  console.log(`\n-- ${name} (npm run ${script}) --\n`);

  const result = spawnSync("npm", ["run", script], {
    stdio: "inherit",
    shell: process.platform === "win32",
    cwd: process.cwd(),
  });

  const durationMs = Date.now() - start;
  const status: StepStatus = result.status === 0 ? "ok" : "failed";

  return { name, script, status, durationMs, blocking };
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

console.log("Documentation quality report");
console.log("Knip is advisory during the initial rollout.\n");

const results: StepResult[] = [];

for (const step of steps) {
  results.push(runStep(step.name, step.script, step.blocking));
}

console.log("\n======================================");
console.log("Summary");
console.log("======================================\n");

const colName = 12;
const colScript = 16;
const colStatus = 10;
const colMode = 10;
const colTime = 8;

console.log(
  `${"Step".padEnd(colName)} ${"Script".padEnd(colScript)} ${"Status".padEnd(
    colStatus
  )} ${"Mode".padEnd(colMode)} ${"Time".padEnd(colTime)}`
);
console.log("-".repeat(colName + colScript + colStatus + colMode + colTime + 4));

for (const result of results) {
  const statusLabel = result.status === "ok" ? "ok" : "FAILED";
  const modeLabel = result.blocking ? "blocking" : "advisory";
  console.log(
    `${result.name.padEnd(colName)} ${result.script.padEnd(
      colScript
    )} ${statusLabel.padEnd(colStatus)} ${modeLabel.padEnd(
      colMode
    )} ${formatDuration(result.durationMs).padEnd(colTime)}`
  );
}

const failed = results.filter((result) => result.status === "failed");
const blockingFailed = failed.filter((result) => result.blocking);
const advisoryFailed = failed.filter((result) => !result.blocking);

console.log();

if (blockingFailed.length === 0) {
  if (advisoryFailed.length > 0) {
    console.log(
      `Advisory check(s) failed: ${advisoryFailed
        .map((result) => result.name)
        .join(", ")}.`
    );
    console.log("Blocking checks passed.");
  } else {
    console.log("All checks passed.");
  }
} else {
  console.log(
    `${blockingFailed.length} blocking check(s) failed: ${blockingFailed
      .map((result) => result.name)
      .join(", ")}.`
  );
  if (advisoryFailed.length > 0) {
    console.log(
      `Advisory check(s) also failed: ${advisoryFailed
        .map((result) => result.name)
        .join(", ")}.`
    );
  }
  process.exit(1);
}
