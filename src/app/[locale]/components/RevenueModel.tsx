import Image from "next/image";
import { useTranslations } from "next-intl";

import NeonBlock from "@/components/organisms/NeonBlock";
export default function RevenueModel() {
  const t = useTranslations("RevenueModel");

  return (
    <NeonBlock
      fullWidth
      onlyBottom
      icon="double-usd"
      color="green"
      overlineText={t("overline")}
      leftContent={
        <div className="w-full">
          <img src={"/images/revenue.png"} className="w-full max-sm:hidden" alt={""} />
          <img src={"/images/revenue-mobile.png"} className="w-full sm:hidden" alt={""} />
        </div>
      }
    />
  );
}
