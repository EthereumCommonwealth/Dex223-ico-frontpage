import clsx from "clsx";
import React, { HTMLProps, ReactNode } from "react";

import ArticleHeading from "@/components/ArticleHeading";
import Pattern, { PatternColor } from "@/components/atoms/Pattern";
import Svg from "@/components/atoms/Svg";
import { IconName } from "@/components/atoms/Svg/svgIconsMap";
import Container from "@/components/Container";
import KeyFeatureCard from "@/components/KeyFeatureCard";
import NeonBlock from "@/components/organisms/NeonBlock";

export default function Innovation() {
  return (
    <div>
      <NeonBlock
        color="green"
        icon="lamp"
        overlineText="Innovation"
        differentColumns
        leftContent={
          <>
            <ArticleHeading text="Innovating decentralized trading" />
            <p className="text-secondary-text text-18 mb-[60px]">
              DEX223 introduces a number of revolutionary concepts that no other exchange implements
              in the same way currently. These features will drastically improve the security, make
              token listings as easy and transparent as possible and allow on-platform lending of
              assets.
            </p>
          </>
        }
      />

      <Container>
        <Pattern
          patternColor={PatternColor.GREEN}
          className="w-450 h-450 -left-[871px] -top-[276px] -scale-y-100"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          <div className="flex flex-col gap-4 lg:gap-5">
            <KeyFeatureCard
              text="The safety of user funds is paramount. Every component—from smart contracts to the
      interface—must be designed and audited to eliminate single points of failure. Our encapsulated
      margin trading system and auto-listing mechanisms are built with a proactive approach to
      security, reducing exposure to malicious activities and user errors alike."
              iconName="security"
              heading="Uncompromising security"
              className="flex-grow md:max-2xl:bg-[url('/images/innovation_bg_1_mobile.png')] bg-[url('/images/innovation_bg_1.png')] bg-bottom bg-contain bg-no-repeat pb-[224px] sm:pb-[300px] md:pb-[370px] lg:pb-0"
            />
            <KeyFeatureCard
              text="The platform’s incentive models, such as the revenue-sharing program from listing fees
            and lending order interest, are aimed at sustainable growth. By sharing rewards with
            DEX223 token holders, we cultivate a symbiotic relationship between protocol success and
            investor engagement."
              iconName="economic-sustainability"
              heading="Economic sustainability"
            />
          </div>
          <div className="flex flex-col gap-4 lg:gap-5">
            <KeyFeatureCard
              text="We envision an application that can operate indefinitely, free from external
            intervention or centralized oversight. Through smart-contract-driven listings,
            protocol-level governance, and distributed development, DEX223 aims to ensure that each
            step of trading, lending, and token listing is trustless and transparent."
              iconName="references"
              heading="True decentralization"
            />
            <KeyFeatureCard
              text="DEX223 is committed to fostering a secure environment through clear documentation,
            step-by-step tutorials, and accessible user interfaces. Educating users about safe
            trading practices and platform risks empowers them to navigate the DeFi space with
            confidence."
              iconName="educating"
              heading="Educating and empowering users"
              className="flex-grow md:max-2xl:bg-[url('/images/innovation_bg_2_mobile.png')] bg-[url('/images/innovation_bg_2.png')] bg-bottom bg-contain bg-no-repeat pb-[276px] md:pb-[312px] lg:pb-0"
            />
          </div>
          <div className="contents lg:flex flex-col gap-4 lg:gap-5">
            <KeyFeatureCard
              text="DEX223 embraces a model where anyone can build upon or integrate with our protocol.
            Tokens can be freely listed, and new financial instruments—like encapsulated margin
            trading—are made available to all participants without gatekeepers. This openness
            fosters ongoing experimentation and creativity in the ecosystem."
              iconName="permissionless"
              heading="Permissionless innovation"
              className="bg-[url('/images/innovation_bg_3.svg')] bg-right bg-cover bg-no-repeat"
            />
            <div className="flex flex-col gap-4 lg:gap-5">
              <KeyFeatureCard
                text="Holders of DEX223’s token are at the forefront of decision-making. Listing fees, new
            protocol features, and strategic proposals are subject to on-chain voting, ensuring
            direct democratic control over the platform’s development. This community-first design
            encourages transparent evolution of our protocol."
                iconName="team"
                heading="Community governance"
              />
              <KeyFeatureCard
                text="By focusing on a seamless user experience, open integration paths, and a robust security
            framework, DEX223 strives to be the go-to platform for next-generation decentralized
            trading. Once deployed, the protocol becomes a permanent fixture in the DeFi landscape,
            governed and improved by its community."
                iconName="long-term-vision"
                heading="Long-term vision"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
