import "@/assets/styles/global.css";

import { GoogleAnalytics } from "@next/third-parties/google";
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
import { config } from "@/config/wagmi/config";
import { Locale, locales, routing } from "@/i18n/routing";

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
      <head>{isProd ? <SEOAgent /> : null}</head>

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

const ogLocales: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  zh: "zh_CN",
  ko: "ko_KR",
  fr: "fr_FR",
  pt: "pt_BR",
  ru: "ru_RU",
};

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: "Dex223",
    description: t("description"),
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, l === routing.defaultLocale ? "/" : `/${l}`]),
      ),
    },
    metadataBase: new URL("https://www.dex223.io"),
    openGraph: {
      siteName: "DEX223",
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: "https://dex223.io",
      images: [
        {
          url: "https://www.dex223.io/social-link.png", // Must be an absolute URL
          width: 1600,
          height: 900,
        },
      ],
      locale: ogLocales[locale as Locale] ?? "en_US",
      type: "website",
    },
  };
}
