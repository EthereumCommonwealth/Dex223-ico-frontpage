const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Put title, description, canonical and share tags in <head> for every visitor. By default
  // Next.js streams them into <body> for anything it does not recognize as a limited bot, which
  // includes Googlebot and AI crawlers (GPTBot, ClaudeBot, PerplexityBot) that read only <head>.
  htmlLimitedBots: /.*/,
  // Pages render the same HTML for every visitor (language comes from the URL,
  // the wallet reconnects in the browser), so Vercel's edge can serve them for
  // 5 minutes and refresh in the background. Browsers keep Next's Cache-Control.
  async headers() {
    return [
      {
        source: "/:path((?!api/|_next/|_vercel/).*)",
        headers: [{ key: "Vercel-CDN-Cache-Control", value: "s-maxage=300, stale-while-revalidate=3600" }],
      },
    ];
  },
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
}

module.exports = withNextIntl(nextConfig)
