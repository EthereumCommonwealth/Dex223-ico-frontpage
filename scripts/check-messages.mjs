// Checks every messages/<locale>.json against messages/en.json:
// same keys, same {placeholders} and <rich> tags per string, no em dashes.
// Usage: node scripts/check-messages.mjs [locale...]
import { readFileSync, readdirSync } from "node:fs";

const read = (l) => JSON.parse(readFileSync(new URL(`../messages/${l}.json`, import.meta.url), "utf8"));
const flatten = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([k, v]) =>
    typeof v === "object" && v !== null ? flatten(v, `${prefix}${k}.`) : [[`${prefix}${k}`, v]],
  );
const tokens = (s) => [...s.matchAll(/\{[a-zA-Z0-9_]+\}|<\/?[a-zA-Z0-9]+>/g)].map((m) => m[0]).sort().join(" ");

const en = new Map(flatten(read("en")));
const requested = process.argv.slice(2);
const locales = requested.length
  ? requested
  : readdirSync(new URL("../messages", import.meta.url)).filter((f) => f.endsWith(".json") && f !== "en.json").map((f) => f.replace(".json", ""));

let failed = false;
for (const locale of locales) {
  const problems = [];
  const other = new Map(flatten(read(locale)));
  for (const [key, value] of en) {
    if (!other.has(key)) problems.push(`missing ${key}`);
    else if (tokens(String(value)) !== tokens(String(other.get(key)))) problems.push(`tags/placeholders differ at ${key}`);
  }
  for (const [key, value] of other) {
    if (!en.has(key)) problems.push(`extra ${key}`);
    if (String(value).includes("—")) problems.push(`em dash at ${key}`);
  }
  console.log(`${locale}: ${other.size}/${en.size} keys, ${problems.length} problem(s)`);
  problems.slice(0, 40).forEach((p) => console.log(`  ${p}`));
  if (problems.length) failed = true;
}
process.exit(failed ? 1 : 0);
