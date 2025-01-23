import clsx from "clsx";
import React, { ReactNode } from "react";

import ArticleHeading from "@/components/ArticleHeading";
import BulletListItem from "@/components/atoms/BulletListItem";
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
    <div className="group flex flex-col gap-4 relative pr-[15px] w-[calc(25%_-_30px)] [&:nth-child(1)]:order-[1] [&:nth-child(2)]:order-[2] [&:nth-child(3)]:order-[3] [&:nth-child(4)]:order-[4] [&:nth-child(5)]:order-[6] [&:nth-child(6)]:order-[5]">
      <div className="flex gap-5 items-center">
        <div
          className={clsx(
            "w-12 h-12 rounded-full border  flex-shrink-0 flex items-center justify-center text-white",
            isPassed ? "border-purple" : "border-[#848484]"
          )}
        >
          <Svg iconName={icon} />
        </div>
        <div
          className={clsx(
            "relative w-full text-[#848484] -mr-[30px] group-[&:nth-child(4)]:hidden group-[&:nth-child(5)]:hidden group-[&:nth-child(5)]:rotate-180 group-[&:nth-child(6)]:rotate-180",
            isPassed && "text-purple",
          )}
        >
          <div className={clsx("h-px bg-[#848484]", isPassed && "bg-purple")} />
          <svg
            className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2"
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
        <div className="hidden absolute text-[#848484] h-[calc(100%_+_40.5px)] border border-l-0 rounded-r-5 border-[#848484] left-[68px] top-6 w-[calc(100%_-_68px)] group-[&:nth-child(4)]:block">
          <svg
            className="absolute -bottom-[3.5px] -translate-x-[2px] -rotate-180 origin-center"
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
        <div className="hidden absolute w-[18px] border-r-0 border rounded-l-2 top-6 -left-[34px] h-[calc(100%_+_40.5px)] text-[#848484]">
          <svg
            className="absolute -bottom-[3.5px] translate-x-[1px] origin-center right-0"
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
        <div className="flex flex-wrap justify-end gap-10 pr-[20px] mt-[60px]">
          <SchemeItem
            isPassed
            icon="aggressive"
            date={"Q1 2024 (February-March)"}
            text={
              <ul className="flex flex-col gap-1">
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
              <ul className="flex flex-col gap-1">
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
              <ul className="flex flex-col gap-1">
                <BulletListItem>Complete margin trading module</BulletListItem>
                <BulletListItem>Initiate bug bounty program</BulletListItem>
                <BulletListItem>Begin security audit process</BulletListItem>
                <BulletListItem>Expand testing to EOS chain</BulletListItem>
                <BulletListItem>Deploy portfolio and listing features</BulletListItem>
              </ul>
            }
          />
          <SchemeItem
            isActive
            icon="margin-trading"
            date={"Q4 2024 (October-December)"}
            text={
              <ul className="flex flex-col gap-1">
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
            icon="bug"
            date={"Q1 2025 (January-March)"}
            text={
              <ul className="flex flex-col gap-1">
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
            icon="eos"
            date={"Future Milestones"}
            text={
              <ul>
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
