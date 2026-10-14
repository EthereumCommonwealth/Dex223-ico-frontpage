const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Put title, description, canonical and share tags in <head> for every visitor. By default
  // Next.js streams them into <body> for anything it does not recognize as a limited bot, which
  // includes Googlebot and AI crawlers (GPTBot, ClaudeBot, PerplexityBot) that read only <head>.
  htmlLimitedBots: /.*/,
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
}

module.exports = withNextIntl(nextConfig)
