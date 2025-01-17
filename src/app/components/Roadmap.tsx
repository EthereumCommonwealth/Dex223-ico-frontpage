import clsx from "clsx";
import React from "react";

import ArticleHeading from "@/components/ArticleHeading";
import Svg from "@/components/atoms/Svg";
import { IconName } from "@/components/atoms/Svg/svgIconsMap";
import TextLink from "@/components/atoms/TextLink";
// import Text from "@/components/atoms/Text";
import NeonBlock from "@/components/organisms/NeonBlock";

function SchemeItem({
  text,
  date,
  icon,
  isPassed = false,
  isActive = false,
}: {
  text: string;
  date: string;
  icon: IconName;
  isPassed?: boolean;
  isActive?: boolean;
}) {
  return (
    <div className="{styles.schemeItem}">
      <div className="{styles.imageWrapper}">
        <div className="{clsx(styles.svgWrapper, isPassed && styles.passed, isActive && styles.active)}">
          <Svg iconName={icon} />
        </div>
        <div className="{clsx(styles.roadmapArrow, isPassed && styles.passed)}">
          <div className="{clsx(styles.arrowLine, isPassed && styles.passed)}" />
          <svg
            className="{styles.point}"
            width="5"
            height="6"
            viewBox="0 0 5 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0.113281L5 3.00003L5.04736e-07 5.88678L2.96079e-07 3.50003L2.08656e-07 2.50003L0 0.113281Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="{clsx(styles.lastRowRoadmapArrow, isPassed && styles.passed)}">
          <svg
            className="{styles.lastRowArrowPoint}"
            width="5"
            height="6"
            viewBox="0 0 5 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0.113281L5 3.00003L5.04736e-07 5.88678L2.96079e-07 3.50003L2.08656e-07 2.50003L0 0.113281Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="{clsx(styles.leftRoadmapArrow, isPassed && styles.passed)}">
          <svg
            className="{styles.leftRowArrowPoint}"
            width="5"
            height="6"
            viewBox="0 0 5 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0.113281L5 3.00003L5.04736e-07 5.88678L2.96079e-07 3.50003L2.08656e-07 2.50003L0 0.113281Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      <div>
        <p className="text-18 font-bold mb-1">{date}</p>
        <p className="text-secondary-text text-20">{text}</p>
      </div>
    </div>
  );
}
export default function Roadmap() {
  return (
    <>
      <NeonBlock
        icon="roadmap"
        color="green"
        overlineText="Development timeline"
        anchor="roadmap"
        leftContent={
          <>
            <ArticleHeading text="Roadmap" />
            <div className="{styles.paragraphs}">
              <p className="{styles.text}">
                The deployment schedule of the DEX223 platform on other chains will be released
                after the deployment on BSC. You can follow the Roadmap on our{" "}
                <TextLink
                  text="Github"
                  href="https://github.com/EthereumCommonwealth/Roadmap/issues/72"
                />
                .
              </p>
            </div>
          </>
        }
      />
      <div className={"container_internal"}>
        <div className="{styles.roadmapSchemeContainer}">
          <SchemeItem
            isPassed
            icon="aggressive"
            date={"May 2024"}
            text="DEX223 platform prototype release (DEX223 exchange, margin trading disabled, auto-listing contracts supported)."
          />
          <SchemeItem
            isPassed
            icon="auto-listing"
            date={"May 2024"}
            text="Auto-listing contracts deployment."
          />
          <SchemeItem
            isPassed
            icon="test"
            date={"June 2024"}
            text="DEX223 deployment on testnet. Public testing stage & bug bounties launch."
          />
          <SchemeItem
            isActive
            icon="margin-trading"
            date={"June - July 2024"}
            text="Margin trading module release & testnet deployment."
          />
          <SchemeItem
            icon="bug"
            date={"July 2024"}
            text="Public testing stage of the margin trading features, security audits & bug bounties."
          />
          <SchemeItem
            icon="eth"
            date={"August - September 2024"}
            text="DEX223 initial deployment on Ethereum mainnet."
          />
          <SchemeItem icon="eos" date={"October 2024"} text="DEX223 deployment on EOS EVM & BSC." />
        </div>
      </div>
    </>
  );
}
