import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const res = intl(req);
  const location = res.headers.get("location");
  // /en is never a page URL (English lives at the bare paths), so its redirect
  // is permanent, not next-intl's temporary 307.
  if (location && res.status === 307 && /^\/en(\/|$)/.test(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(location, req.url), 308);
  }
  // On a page response NEXT_LOCALE only repeats the language already in the
  // URL (the language switcher writes it itself on a change), and a response
  // that sets a cookie is never cached at Vercel's edge. Redirects keep it.
  if (!location) res.headers.delete("set-cookie");
  return res;
}

export const config = {
  // Everything except Next internals, API routes and files with an extension (images,
  // robots.txt, sitemap.xml, social-link.png, ...).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
