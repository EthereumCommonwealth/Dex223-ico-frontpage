import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { ENGLISH_ONLY_PAGES, pageMetadata } from "@/config/seo";

// Published in English only, so every locale's canonical is the English page.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return pageMetadata({
    locale,
    path: "privacy-policy",
    englishOnly: true,
    ...ENGLISH_ONLY_PAGES["privacy-policy"],
  });
}

export default function Layout({ children }: PropsWithChildren) {
  return children;
}
