import { readFileSync, writeFileSync, mkdirSync } from "fs";
import yaml from "js-yaml";
import { resolve } from "path";

const yamlPath = resolve(__dirname, "../../plan.yml");
const outDir = resolve(__dirname, "../data");
const outPath = resolve(outDir, "plan.json");

const raw = readFileSync(yamlPath, "utf8");
const plan = yaml.load(raw);
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, JSON.stringify(plan));
console.log("Built data/plan.json");
