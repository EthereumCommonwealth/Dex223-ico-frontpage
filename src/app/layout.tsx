import "../assets/styles/global.css";

import { Golos_Text } from "next/font/google";
import { headers } from "next/headers";
import { PropsWithChildren } from "react";
import { cookieToInitialState } from "wagmi";

import Providers from "@/app/providers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { config } from "@/config/wagmi/config";

const golos_text = Golos_Text({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export default async function RootLayout({ children }: PropsWithChildren<{}>) {
  const initialState = cookieToInitialState(config, (await headers()).get("cookie"));

  return (
    <html>
      <head></head>
      <body className={golos_text.className}>
        <Providers initialState={initialState}>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
