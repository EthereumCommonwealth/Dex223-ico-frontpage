// Sites we run ourselves. Links between them stay in the same tab so moving from the
// landing page to the app or the blog feels like one product.
const FIRST_PARTY_HOSTS = new Set([
  "dex223.io",
  "www.dex223.io",
  "app.dex223.io",
  "test-app.dex223.io",
  "blog.dex223.io",
]);

/** True for absolute http(s) links to a site we do not run. */
export function isThirdPartyHref(href: string): boolean {
  if (!/^https?:\/\//i.test(href)) {
    return false;
  }
  try {
    return !FIRST_PARTY_HOSTS.has(new URL(href).hostname.toLowerCase());
  } catch {
    return false;
  }
}

/** Third-party links open in a new tab without handing the new page a reference to ours. */
export function linkTargetProps(href: string): { target?: "_blank"; rel?: string } {
  return isThirdPartyHref(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
