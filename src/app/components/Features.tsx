import React, { ReactNode } from "react";

import ArticleHeading from "@/components/ArticleHeading";
import Svg from "@/components/atoms/Svg";
import { IconName } from "@/components/atoms/Svg/svgIconsMap";
import TextLink from "@/components/atoms/TextLink";
import Container from "@/components/Container";
import NeonBlock from "@/components/organisms/NeonBlock";

function KeyFeatureCard({
  iconName,
  heading,
  text,
}: {
  text: ReactNode;
  heading: string;
  iconName: IconName;
}) {
  return (
    <div className="p-5 bg-primary-bg rounded-5">
      <h3 className="flex gap-2 mb-2 font-bold text-18 lg:text-20">
        <span className="w-6 h-6 lg:w-8 lg:h-8 mt-px">
          <Svg size={24} className="text-green flex-shrink-0 !w-full !h-full" iconName={iconName} />
        </span>
        {heading}
      </h3>
      <p className="text-secondary-text text-16 lg:text-18">{text}</p>
    </div>
  );
}

export default function Features() {
  return (
    <div>
      <NeonBlock
        color="green"
        icon="key"
        differentColumns
        leftContent={
          <div className="lg:mb-[60px] mb-6">
            <ArticleHeading text="Key features of DEX223" />
            <p className="text-secondary-text text-16 lg:text-18">
              DEX223 combines security, versatility, and transparency. With the ERC-223 standard, it
              prevents token transfer errors, supports seamless operation across multiple
              EVM-compatible blockchains, enables inclusive token listings, and ensures trust
              through publicly accessible financial reporting.
            </p>
          </div>
        }
        overlineText="Features"
      />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 lg:gap-5">
          <KeyFeatureCard
            heading="Solving a real problem"
            text="Every year, millions of dollars are lost due to transaction errors involving ERC-20 tokens. By adopting the
      ERC-223 standard, DEX223 takes the first crucial step toward eliminating these costly
      mistakes. We are confident that this enhanced standard, which prevents fund losses, will
      become the industry norm in the long run."
            iconName="solving-problem"
          />
          <KeyFeatureCard
            heading="Maximizing chain support"
            text="DEX223 is designed to operate seamlessly across all EVM-compatible blockchains, including
      Ethereum, EOS EVM, Arbitrum, Optimism, BASE, and many others. This broad compatibility ensures
      that DEX223 will be the most versatile exchange in the market, supporting the largest number
      of networks in the industry"
            iconName="references"
          />

          <KeyFeatureCard
            heading="Non-discrimination philosophy"
            text="Inclusivity is at the heart of DEX223. The protocol allows for any token to be listed,
          embracing the diverse and growing market of meme coins. Recognizing that listing these
          tokens can be challenging, we provide out-of-the-box solutions to make the process smooth
          and accessible for all projects"
            iconName="non-discrimination"
          />
          <KeyFeatureCard
            heading="Financial transparency"
            text={
              <span>
                Transparency is a cornerstone of our operations. DEX223 adheres to a strict policy
                of financial openness, ensuring that the usage of ICO funds is publicly documented
                and accessible to everyone on <TextLink text="Github" href="#" isExternal />. This
                commitment allows our community to trust and verify how funds are being managed and
                utilized.
              </span>
            }
            iconName="financial-transparency"
          />
        </div>
      </Container>
    </div>
  );
}
