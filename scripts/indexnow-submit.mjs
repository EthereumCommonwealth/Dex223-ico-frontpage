/**
 * Tell IndexNow engines (Bing, Yandex, Naver, Seznam, Yep) about every URL in
 * the live sitemap. Google does not use IndexNow; it reads the sitemap that
 * Search Console already has.
 *
 * The key is public by design: engines verify ownership by fetching
 * https://www.dex223.io/<key>.txt and checking it holds the same key.
 *
 * Run: node scripts/indexnow-submit.mjs [siteUrl] [--dry-run]
 *   --dry-run  checks the key file and reads the sitemap, but does not submit.
 * CI runs it after each successful production deploy (.github/workflows/indexnow.yml).
 */
import { readdirSync } from "node:fs";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const siteArg = args.find((a) => !a.startsWith("--"));
const SITE = (siteArg || process.env.SITE_URL || "https://www.dex223.io").replace(/\/+$/, "");

// The verification file lives in public/ as <key>.txt, so the key is read
// from its name rather than repeated here.
const keyFiles = readdirSync(new URL("../public/", import.meta.url)).filter((f) =>
  /^[0-9a-f]{32}\.txt$/.test(f),
);
if (keyFiles.length !== 1) {
  console.error(`Expected one IndexNow key file in public/, found ${keyFiles.length}.`);
  process.exit(1);
}
const KEY = keyFiles[0].slice(0, -4);
const host = new URL(SITE).host;
const keyLocation = `${SITE}/${KEY}.txt`;

const keyRes = await fetch(keyLocation);
const keyBody = (await keyRes.text()).trim();
const keyOk = keyRes.ok && keyBody === KEY;
if (!keyOk) {
  const msg = `Key file not served correctly at ${keyLocation} (HTTP ${keyRes.status}).`;
  if (!dryRun) {
    console.error(`${msg} Not submitting.`);
    process.exit(1);
  }
  console.warn(`[dry run] ${msg} A real run would stop here until it is deployed.`);
}

const sitemapRes = await fetch(`${SITE}/sitemap.xml`);
if (!sitemapRes.ok) {
  console.error(`Could not read ${SITE}/sitemap.xml (HTTP ${sitemapRes.status}).`);
  process.exit(1);
}
const sitemap = await sitemapRes.text();
const urlList = [
  ...new Set(
    [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => m[1].trim())
      .filter((u) => new URL(u).host === host),
  ),
];
if (urlList.length === 0) {
  console.log("Sitemap lists no URLs on this host. Nothing to submit.");
  process.exit(0);
}

if (dryRun) {
  console.log(
    `[dry run] Would submit ${urlList.length} URLs for ${host} (key file ${keyOk ? "OK" : "NOT OK"}). Nothing sent.`,
  );
  for (const u of urlList) console.log(`  ${u}`);
  process.exit(keyOk ? 0 : 2);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation, urlList }),
});
// 200 = accepted, 202 = accepted, key validation pending.
console.log(`IndexNow: submitted ${urlList.length} URLs for ${host}, HTTP ${res.status}`);
if (res.status !== 200 && res.status !== 202) {
  console.error((await res.text()).slice(0, 300));
  process.exit(1);
}
