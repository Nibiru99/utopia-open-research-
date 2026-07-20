import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { canonicalJson } from "./canonical-json.mjs";
import { runBenchmark } from "./benchmark.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const project = resolve(here, "..");
const configPath = resolve(project, "config/confirmatory-v2.0.0.json");
const outputPath = resolve(project, "results/rpc-v2-confirmatory.json");
const csvPath = resolve(project, "results/rpc-v2-per-seed.csv");

const configText = await readFile(configPath, "utf8");
const config = JSON.parse(configText);
const result = runBenchmark(config);
result.provenance = {
  config_path: "projects/rpc-v2/config/confirmatory-v2.0.0.json",
  config_sha256: createHash("sha256").update(configText, "utf8").digest("hex"),
  runtime: process.version,
  dependencies: [],
  command: "npm run rpc:run",
};

const json = canonicalJson(result);
const armNames = config.arms;
const header = ["seed", ...armNames.flatMap((arm) => [`${arm}_auc`, `${arm}_recovered`, `${arm}_recovery_steps`]), "observed_correlation", "surrogate_correlation"];
const lines = [header.join(",")];
for (const row of result.seed_rows) {
  const values = [row.seed];
  for (const arm of armNames) {
    const metrics = row.arms[arm];
    values.push(metrics.auc, metrics.recovered, metrics.recovery_steps ?? "");
  }
  values.push(row.diagnostic.observed_correlation, row.diagnostic.surrogate_correlation);
  lines.push(values.join(","));
}

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, json, "utf8");
await writeFile(csvPath, `${lines.join("\n")}\n`, "utf8");

console.log(JSON.stringify({
  experiment: result.experiment,
  primary_contract_pass: result.primary_contract_pass,
  full_contract_pass: result.full_contract_pass,
  hypotheses: result.hypotheses,
  result_sha256: createHash("sha256").update(json, "utf8").digest("hex"),
  output: outputPath,
  csv: csvPath,
}, null, 2));
