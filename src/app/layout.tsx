import "../assets/styles/global.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Golos_Text } from "next/font/google";
import { headers } from "next/headers";
import { PropsWithChildren } from "react";
import { cookieToInitialState } from "wagmi";

import Providers from "@/app/providers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SEOAgent from "@/components/SEOAgent";
import { config } from "@/config/wagmi/config";

const isProd = process.env.NODE_ENV === "production";

const golos_text = Golos_Text({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

const description =
  "Next generation decentralized exchange for ERC-223 & ERC-20 tokens with margin trading, 15% cheaper GAS fees and transparent auto-listings for any tokens.";

export default async function RootLayout({ children }: PropsWithChildren<{}>) {
  const initialState = cookieToInitialState(config, (await headers()).get("cookie"));

  return (
    <html>
      <head>{isProd ? <SEOAgent /> : null}</head>

      <body className={golos_text.className}>
        <Providers initialState={initialState}>
          <Header />
          <div className="flex flex-col h-full">
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-E9D88G4XGB" />
    </html>
  );
}

export const metadata = {
  title: "Dex223",
  description:
    "Explore in-depth insights, updates, and guides on Dex223 – your go-to source for decentralized exchange (DEX) development, token standards, and blockchain innovations. Stay ahead in the Web3 ecosystem!",
  openGraph: {
    siteName: "DEX223",
    title: "DEX223: Decentralized exchange for ERC-223 & ERC-20 tokens!",
    description,
    url: "https://dex223.io",
    images: [
      {
        url: "https://www.dex223.io/social-link.png", // Must be an absolute URL
        width: 1600,
        height: 900,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
