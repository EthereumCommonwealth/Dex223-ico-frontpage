import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { PropsWithChildren } from "react";

import { pageMetadata } from "@/config/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Seo" });

  return pageMetadata({
    locale,
    path: "upgrade",
    title: t("upgrade.title"),
    description: t("upgrade.description"),
  });
}

export default function Layout({ children }: PropsWithChildren) {
  return children;
}
