import clsx from "clsx";
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
      2xl:[&:nth-child(1)]:order-[1] 2xl:[&:nth-child(2)]:order-[2] 2xl:[&:nth-child(3)]:order-[3] 2xl:[&:nth-child(4)]:order-[4] 2xl:[&:nth-child(5)]:order-[6] 2xl:[&:nth-child(6)]:col-start-3 2xl:[&:nth-child(6)]:col-span-1 2xl:[&:nth-child(6)]:order-[5]
      lg:[&:nth-child(1)]:order-[1] lg:[&:nth-child(2)]:order-[2] lg:[&:nth-child(3)]:order-[3] lg:[&:nth-child(4)]:order-[6] lg:[&:nth-child(5)]:order-[5] lg:[&:nth-child(6)]:order-[4]
      sm:[&:nth-child(1)]:order-[1] sm:[&:nth-child(2)]:order-[2] sm:[&:nth-child(3)]:order-[4] sm:[&:nth-child(4)]:order-[3] sm:[&:nth-child(5)]:order-[5] sm:[&:nth-child(6)]:order-[6]
      [&:nth-child(1)]:order-[1] [&:nth-child(2)]:order-[2] [&:nth-child(3)]:order-[3] [&:nth-child(4)]:order-[4] [&:nth-child(5)]:order-[5] [&:nth-child(6)]:order-[6]
    "
    >
      <div className="flex gap-5 items-center">
        <div
          className={clsx(
            "w-12 h-12 rounded-full border-2 flex-shrink-0 flex items-center justify-center",
            isPassed || isActive ? "border-purple" : "border-[#848484]",
            isActive ? "bg-purple text-secondary-bg" : "bg-primary-bg text-primary-text",
            !isActive && !isPassed && "text-tertiary-text border-transparent",
          )}
        >
          <Svg iconName={icon} />
        </div>
        <div
          className={clsx(
            "relative w-full text-[#848484] -mr-[30px]",
            "2xl:group-[&:nth-child(5)]:hidden sm:max-lg:group-[&:nth-child(2)]:hidden sm:max-2xl:group-[&:nth-child(3)]:hidden lg:group-[&:nth-child(4)]:hidden sm:max-lg:group-[&:nth-child(6)]:hidden",
            "max-sm:group-[&:nth-child(1)]:hidden max-sm:group-[&:nth-child(2)]:hidden max-sm:group-[&:nth-child(3)]:hidden max-sm:group-[&:nth-child(4)]:hidden max-sm:group-[&:nth-child(5)]:hidden max-sm:group-[&:nth-child(6)]:hidden",
            "lg:group-[&:nth-child(5)]:rotate-180 lg:group-[&:nth-child(6)]:rotate-180 sm:max-lg:group-[&:nth-child(4)]:rotate-180",
            (isPassed || isActive) && "text-purple",
          )}
        >
          <div className={clsx("h-0.5 bg-[#848484]", (isPassed || isActive) && "bg-purple")} />
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
            "hidden absolute text-[#848484] h-[calc(100%_+_40.5px)] border-2 border-l-0 rounded-r-5 border-[#848484] left-[68px] top-6 w-[calc(100%_-_68px)] 2xl:group-[&:nth-child(4)]:block lg:max-2xl:group-[&:nth-child(3)]:block sm:max-lg:group-[&:nth-child(2)]:block max-sm:group-[&:nth-child(1)]:block max-sm:group-[&:nth-child(3)]:block max-sm:group-[&:nth-child(5)]:block",
            isPassed && "border-purple text-purple",
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
            "hidden absolute w-[18px] border-r-0 border-2 rounded-l-2 top-6 -left-[34px] h-[calc(100%_+_40.5px)] text-[#848484] sm:max-lg:group-[&:nth-child(4)]:block max-sm:group-[&:nth-child(2)]:block max-sm:group-[&:nth-child(4)]:block",
            isPassed && "border-purple text-purple",
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
        <p className="text-20 text-secondary-text font-bold mb-1">{date}</p>
        <div className="text-secondary-text text-18 -mr-[15px]">{text}</div>
      </div>
    </div>
  );
}

export default function Roadmap() {
  return (
    <>
      <NeonBlock
        icon="roadmap"
        color="purple"
        overlineText="Development timeline"
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
            <ArticleHeading text="Roadmap" />

            <p className="text-18 text-secondary-text">
              We plan to announce our multi-chain deployment timeline once BSC deployment is
              complete. Visit our{" "}
              <TextLink
                text="Github"
                href="https://github.com/EthereumCommonwealth/Roadmap/issues/72"
              />{" "}
              for the latest details and updates.
            </p>
          </>
        }
      />
      <Container>
        <div className="min-w-full justify-items-end grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 lg:pt-[60px] pt-6 max-lg:pl-8 max-lg:pr-0 -mt-12">
          <SchemeItem
            isPassed
            icon="aggressive"
            date={"Q1 2024 (February-March)"}
            text={
              <ul className="flex flex-col gap-1 pr-2">
                <BulletListItem>Launch initial DEX infrastructure</BulletListItem>
                <BulletListItem>Implement core ERC-223 support</BulletListItem>
                <BulletListItem>Establish legal framework for DEX</BulletListItem>
                <BulletListItem>Deploy basic smart contracts on testnet</BulletListItem>
                <BulletListItem>Begin auto-listing development</BulletListItem>
              </ul>
            }
          />
          <SchemeItem
            isPassed
            icon="auto-listing"
            date={"Q2 2024 (April-June)"}
            text={
              <ul className="flex flex-col gap-1 pr-2">
                <BulletListItem>Launch DEX prototype for testing</BulletListItem>
                <BulletListItem>Optimize gas efficiency</BulletListItem>
                <BulletListItem>Complete merged liquidity pools</BulletListItem>
                <BulletListItem>Implement mobile UI</BulletListItem>
                <BulletListItem>Deploy auto-listing contracts</BulletListItem>
              </ul>
            }
          />
          <SchemeItem
            isPassed
            icon="test"
            date={"Q3 2024 (July-September)"}
            text={
              <ul className="flex flex-col gap-1 pr-2">
                <BulletListItem>Complete margin trading module</BulletListItem>
                <BulletListItem>Initiate bug bounty program</BulletListItem>
                <BulletListItem>Begin security audit process</BulletListItem>
                <BulletListItem>Expand testing to EOS chain</BulletListItem>
                <BulletListItem>Deploy portfolio and listing features</BulletListItem>
              </ul>
            }
          />
          <SchemeItem
            isPassed
            icon="security"
            date={"Q4 2024 (October-December)"}
            text={
              <ul className="flex flex-col gap-1 pr-2">
                <BulletListItem>Launch D223-v2 token</BulletListItem>
                <BulletListItem>Start token upgrading process</BulletListItem>
                <BulletListItem>Deep security audits and bug fixing</BulletListItem>
                <BulletListItem>Deploy mainnet contracts</BulletListItem>
                <BulletListItem>Migrate presale tokens to ETH</BulletListItem>
                <BulletListItem>Add blog & documentation to prototype</BulletListItem>
              </ul>
            }
          />
          <SchemeItem
            isActive
            icon="code"
            date={"Q1 2025 (January-March)"}
            text={
              <ul className="flex flex-col gap-1 pr-2">
                <BulletListItem>Finalizing internal security audit</BulletListItem>
                <BulletListItem>External security audit</BulletListItem>
                <BulletListItem>D223 listing on CEX (BitMart)</BulletListItem>
                <BulletListItem>Launch DEX223 on Ethereum Mainnet</BulletListItem>
                <BulletListItem>Launch DEX223 on more EVM chains</BulletListItem>
                <BulletListItem>EVM deployment schedule to be released</BulletListItem>
              </ul>
            }
          />
          <SchemeItem
            icon="integration"
            date={"Future Milestones"}
            text={
              <ul className="flex flex-col gap-1 pr-2">
                <BulletListItem>Integration of AI Agents</BulletListItem>
                <BulletListItem>Traditional Stock trading functionality</BulletListItem>
                <BulletListItem>NFT&apos;s</BulletListItem>
              </ul>
            }
          />
        </div>
      </Container>
    </>
  );
}
