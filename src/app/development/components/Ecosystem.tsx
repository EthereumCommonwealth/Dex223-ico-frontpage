import clsx from "clsx";
import Image from "next/image";
import React from "react";

import DevSourcesImage from "@/assets/images/dev-src-2.svg";
import ArticleHeading from "@/components/ArticleHeading";
import BulletListItem from "@/components/atoms/BulletListItem";
import TextLink from "@/components/atoms/TextLink";
import NeonBlock from "@/components/organisms/NeonBlock";

import EcosystemImage from "../../../assets/images/ecosystem.svg";

export default function Ecosystem() {
  return (
    <NeonBlock
      color="green"
      overlineText="Ecosystem"
      differentColumns
      icon="ecosystem"
      leftContent={
        <>
          <ArticleHeading text="ERC-223 ecosystem" />
          <div className="flex flex-col gap-4 text-secondary-text text-16 lg:text-18">
            <p className="text-16 lg:text-18">
              While not part of the DEX223 exchange itself, several initiatives bolster the adoption
              of the ERC-223 standard:
            </p>

            <ul className="text-16 lg:text-18 flex flex-col gap-2">
              <BulletListItem>
                <TextLink text="Token standard converter" />
                <p>
                  A smart-contract service that bridges ERC-20 and ERC-223 tokens. This tool ensures
                  seamless token compatibility, enabling users to convert from one standard to the
                  other.
                </p>
              </BulletListItem>
              <BulletListItem>
                <TextLink text="ERC-20 losses calculator" />
                <p>
                  A script that calculates “lost” ERC-20 tokens in real time, demonstrating how
                  ERC-223 enhances safety and reduces errors common with the older standard.
                </p>
              </BulletListItem>
              <BulletListItem>
                <TextLink text="ERC-223 aggregation page" />
                <p>
                  A central resource hosting development guidelines, articles, reference source
                  code, and a historical record of ERC-223’s evolution. This hub will inform and
                  connect projects aiming to harness the power of ERC-223.
                </p>
              </BulletListItem>
            </ul>
          </div>
        </>
      }
      rightContent={
        <div className={clsx("pt-0 lg:pt-[152px] animated")}>
          <Image src={EcosystemImage} className="w-full max-lg:max-w-[310px]" alt="" />
        </div>
      }
    />
  );
}
