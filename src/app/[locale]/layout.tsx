import "@/assets/styles/global.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Golos_Text } from "next/font/google";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { PropsWithChildren } from "react";
import { cookieToInitialState } from "wagmi";

import Providers from "@/app/providers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MotionController from "@/components/MotionController";
import SEOAgent from "@/components/SEOAgent";
import { pageMetadata, SITE_NAME, SITE_URL, siteJsonLd } from "@/config/seo";
import { config } from "@/config/wagmi/config";
import { Locale, routing } from "@/i18n/routing";

const isProd = process.env.NODE_ENV === "production";

const golos_text = Golos_Text({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

type Params = Promise<{ locale: string }>;

export default async function RootLayout({
  children,
  params,
}: PropsWithChildren<{ params: Params }>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const initialState = cookieToInitialState(config, (await headers()).get("cookie"));
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          // Static data built from our own constants, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd(locale)) }}
        />
        {isProd ? <SEOAgent /> : null}
      </head>

      <body className={golos_text.className}>
        <NextIntlClientProvider messages={messages}>
          <Providers initialState={initialState}>
            <MotionController />
            <Header />
            <div className="flex flex-col h-full">
              <div className="flex-grow">{children}</div>
              <Footer />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId="G-E9D88G4XGB" />
    </html>
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Seo" });
  const page = pageMetadata({
    locale,
    path: "",
    title: t("home.title"),
    description: t("home.description"),
  });

  return {
    ...page,
    metadataBase: new URL(SITE_URL),
    title: { default: t("home.title"), template: `%s | ${SITE_NAME}` },
    applicationName: SITE_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}
