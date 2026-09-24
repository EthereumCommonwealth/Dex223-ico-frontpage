import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { ReactNode } from "react";

import ArticleHeading from "@/components/ArticleHeading";
import BulletListItem from "@/components/atoms/BulletListItem";
import Pattern, { PatternColor } from "@/components/atoms/Pattern";
import Svg from "@/components/atoms/Svg";
import { IconName } from "@/components/atoms/Svg/svgIconsMap";
import TextLink from "@/components/atoms/TextLink";
import Container from "@/components/Container";
// import Text from "@/components/atoms/Text";
import NeonBlock from "@/components/organisms/NeonBlock";

function SchemeItem({
  text,
  date,
  icon,
  isPassed = false,
  isActive = false,
}: {
  text: ReactNode;
  date: string;
  icon: IconName;
  isPassed?: boolean;
  isActive?: boolean;
}) {
  return (
    <div
      className="group flex flex-col gap-4 relative pr-[15px] w-full
      2xl:[&:nth-child(1)]:order-[1] 2xl:[&:nth-child(2)]:order-[2] 2xl:[&:nth-child(3)]:order-[3] 2xl:[&:nth-child(4)]:order-[4] 2xl:[&:nth-child(5)]:order-[7] 2xl:[&:nth-child(6)]:order-[6] 2xl:[&:nth-child(7)]:col-start-2 2xl:[&:nth-child(7)]:col-span-1 2xl:[&:nth-child(7)]:order-[5]
      lg:[&:nth-child(1)]:order-[1] lg:[&:nth-child(2)]:order-[2] lg:[&:nth-child(3)]:order-[3] lg:[&:nth-child(4)]:order-[6] lg:[&:nth-child(5)]:order-[5] lg:[&:nth-child(6)]:order-[4] lg:[&:nth-child(7)]:order-[7] lg:[&:nth-child(7)]:col-start-1
      sm:[&:nth-child(1)]:order-[1] sm:[&:nth-child(2)]:order-[2] sm:[&:nth-child(3)]:order-[4] sm:[&:nth-child(4)]:order-[3] sm:[&:nth-child(5)]:order-[5] sm:[&:nth-child(6)]:order-[6] sm:[&:nth-child(7)]:col-start-2 sm:[&:nth-child(7)]:col-span-1 sm:[&:nth-child(7)]:order-[7]
      [&:nth-child(1)]:order-[1] [&:nth-child(2)]:order-[2] [&:nth-child(3)]:order-[3] [&:nth-child(4)]:order-[4] [&:nth-child(5)]:order-[5] [&:nth-child(6)]:order-[6] [&:nth-child(7)]:order-[7]
    "
    >
      <div className="flex gap-5 items-center">
        <div
          className={clsx(
            "w-12 h-12 rounded-full border-2 flex-shrink-0 flex items-center justify-center",
            isPassed || isActive
              ? "text-purple border-purple"
              : "border-secondary-border text-secondary-border",
            isActive
              ? "bg-purple  text-secondary-bg shadow shadow-purple/60"
              : "bg-primary-bg text-primary-text",
            !isActive && !isPassed && "text-tertiary-text border-transparent",
          )}
        >
          <Svg iconName={icon} />
        </div>
        <div
          className={clsx(
            "relative w-full  -mr-[30px]",
            "2xl:group-[&:nth-child(5)]:hidden sm:max-lg:group-[&:nth-child(2)]:hidden sm:max-2xl:group-[&:nth-child(3)]:hidden lg:group-[&:nth-child(4)]:hidden sm:max-lg:group-[&:nth-child(6)]:hidden",
            "max-sm:group-[&:nth-child(1)]:hidden max-sm:group-[&:nth-child(2)]:hidden max-sm:group-[&:nth-child(3)]:hidden max-sm:group-[&:nth-child(4)]:hidden max-sm:group-[&:nth-child(5)]:hidden max-sm:group-[&:nth-child(6)]:hidden max-2xl:group-[&:nth-child(7)]:hidden",
            "lg:group-[&:nth-child(5)]:rotate-180 lg:group-[&:nth-child(6)]:rotate-180 lg:group-[&:nth-child(7)]:rotate-180 sm:max-lg:group-[&:nth-child(4)]:rotate-180",
            isPassed || isActive ? "text-purple" : "text-secondary-border",
          )}
        >
          <div
            className={clsx("h-0.5 ", isPassed || isActive ? "bg-purple" : "bg-secondary-border")}
          />
          <svg
            className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2"
            width="11"
            height="12"
            viewBox="0 0 11 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.975595 11.7736L10.9756 6.00005L0.975577 0.226565L0.975595 11.7736Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          className={clsx(
            "hidden absolute  h-[calc(100%_+_40.5px)] border-2 border-l-0 rounded-r-5  left-[68px] top-6 w-[calc(100%_-_68px)]",
            "2xl:group-[&:nth-child(4)]:block lg:max-2xl:group-[&:nth-child(3)]:block sm:max-lg:group-[&:nth-child(2)]:block max-sm:group-[&:nth-child(1)]:block sm:max-lg:group-[&:nth-child(6)]:block",
            "max-sm:group-[&:nth-child(3)]:block max-sm:group-[&:nth-child(5)]:block",
            isPassed
              ? "border-purple text-purple"
              : "text-secondary-border border-secondary-border",
          )}
        >
          <svg
            className="absolute -bottom-1.5 -translate-x-[2px] -rotate-180 origin-center"
            width="11"
            height="12"
            viewBox="0 0 11 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.975595 11.7736L10.9756 6.00005L0.975577 0.226565L0.975595 11.7736Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          className={clsx(
            "hidden absolute w-[18px] border-r-0 border-2 rounded-l-2 top-6 -left-[34px] h-[calc(100%_+_40.5px)]",
            "sm:max-lg:group-[&:nth-child(4)]:block max-sm:group-[&:nth-child(2)]:block max-sm:group-[&:nth-child(4)]:block lg:max-2xl:group-[&:nth-child(6)]:block max-sm:group-[&:nth-child(6)]:block",
            isPassed
              ? "border-purple text-purple"
              : "border-secondary-border text-secondary-border",
          )}
        >
          <svg
            className="absolute -bottom-1.5 translate-x-[2px] origin-center right-0"
            width="11"
            height="12"
            viewBox="0 0 11 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.975595 11.7736L10.9756 6.00005L0.975577 0.226565L0.975595 11.7736Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      <div>
        <p
          className={clsx(
            "text-20 font-bold mb-1",
            isActive ? "text-purple" : "text-secondary-text",
          )}
        >
          {date}
        </p>
        <div className="text-secondary-text text-18 -mr-[15px]">{text}</div>
      </div>
    </div>
  );
}

const milestones: {
  key: string;
  icon: IconName;
  items: string[];
  isPassed?: boolean;
  isActive?: boolean;
}[] = [
  {
    key: "q1_2024",
    icon: "aggressive",
    isPassed: true,
    items: [
      "launchInfrastructure",
      "coreErc223Support",
      "legalFramework",
      "testnetContracts",
      "autoListingDevelopment",
    ],
  },
  {
    key: "q2_2024",
    icon: "auto-listing",
    isPassed: true,
    items: [
      "prototypeForTesting",
      "gasEfficiency",
      "mergedLiquidityPools",
      "mobileUi",
      "autoListingContracts",
    ],
  },
  {
    key: "q3_2024",
    icon: "test",
    isPassed: true,
    items: [
      "marginTradingModule",
      "bugBounty",
      "securityAuditProcess",
      "eosTesting",
      "portfolioAndListing",
    ],
  },
  {
    key: "q4_2024",
    icon: "security",
    isPassed: true,
    items: [
      "d223V2Token",
      "tokenUpgrading",
      "deepSecurityAudits",
      "mainnetContracts",
      "migratePresaleTokens",
      "blogAndDocumentation",
    ],
  },
  {
    key: "q1q3_2025",
    icon: "code",
    isPassed: true,
    items: ["internalAudit", "externalAudit", "cexListing", "fiatOnRamp"],
  },
  {
    key: "q4_2025",
    icon: "evm",
    isActive: true,
    items: ["ethereumMainnet", "moreEvmChains", "revenueFeature", "marginModuleAudit"],
  },
  {
    key: "future",
    icon: "integration",
    items: ["marginTradingSupport"],
  },
];

export default function Roadmap() {
  const t = useTranslations("Roadmap");

  return (
    <>
      <NeonBlock
        icon="roadmap"
        color="purple"
        overlineText={t("overline")}
        anchor="roadmap"
        differentColumns
        patterns={
          <>
            <Pattern
              patternColor={PatternColor.PURPLE}
              className="w-250 h-250 -right-[631px] top-0"
            />
            <Pattern
              patternColor={PatternColor.PURPLE}
              className="w-150 h-150 -left-[391px] top-[500px]"
            />
          </>
        }
        leftContent={
          <>
            <ArticleHeading text={t("heading")} />

            <p className="text-18 text-secondary-text">
              {t.rich("intro", {
                link: (chunks) => (
                  <TextLink
                    text={chunks}
                    href="https://github.com/EthereumCommonwealth/Roadmap/issues/72"
                  />
                ),
              })}
            </p>
          </>
        }
      />
      <Container>
        <div className="min-w-full justify-items-end grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 lg:pt-[60px] pt-6 max-2xl:pl-8 max-lg:pr-0 -mt-12">
          {milestones.map(({ key, icon, items, isPassed, isActive }) => (
            <SchemeItem
              key={key}
              isPassed={isPassed}
              isActive={isActive}
              icon={icon}
              date={t(`milestones.${key}.date`)}
              text={
                <ul className="flex flex-col gap-1 pr-2">
                  {items.map((item) => (
                    <BulletListItem key={item}>
                      {t(`milestones.${key}.items.${item}`)}
                    </BulletListItem>
                  ))}
                </ul>
              }
            />
          ))}
        </div>
      </Container>
    </>
  );
}
