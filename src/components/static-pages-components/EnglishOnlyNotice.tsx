import { useLocale, useTranslations } from "next-intl";
import React from "react";

import Svg from "@/components/atoms/Svg";

/**
 * Legal documents stay authoritative in English. On any other locale this tells the
 * reader so, instead of machine-translating binding text.
 */
export default function EnglishOnlyNotice() {
  const locale = useLocale();
  const t = useTranslations("Legal");

  if (locale === "en") {
    return null;
  }

  return (
    <div className="mt-6 flex items-start gap-2 rounded-3 border border-white/[0.06] bg-primary-bg px-4 py-3 text-14 text-secondary-text">
      <Svg iconName="info" className="flex-shrink-0" />
      <p>{t("englishOnly")}</p>
    </div>
  );
}
