"use client";

import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

import ArticleHeading from "@/components/ArticleHeading";
import TextLink from "@/components/atoms/TextLink";
import Container from "@/components/Container";
import NeonBlock from "@/components/organisms/NeonBlock";

export default function Allocation() {
  const [isIntersected, setIsIntersected] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersected(true);
        observer.disconnect();
      }
    });

    if (ref.current && !isIntersected) {
      observer.observe(ref.current!);
    }

    return () => observer.disconnect();
  }, [isIntersected]);

  return (
    <>
      <NeonBlock
        icon="chart"
        color="purple"
        overlineText="Allocation"
        differentColumns
        anchor="tokenomics"
        leftContent={
          <>
            <ArticleHeading text="Tokenomics" />

            <div className="flex flex-col gap-5 mb-24 text-18 text-secondary-text">
              <p>
                DEX223’s tokenomics draws inspiration from{" "}
                <TextLink href={"#"} text="Ethereum’s highly successful launch" isExternal /> model,
                emphasizing both security and sustainability. The original D223 tokens were issued
                in November 2023 on the Ethereum mainnet. From the moment DEX223 is launched, a fee
                will be charged on every on-platform trade, and those fees will be redistributed
                proportionally among D223 token holders.
              </p>
              <p>
                Any tokens that remain unsold will be removed from the total supply. For instance,
                if 32% of platform tokens are sold, the existing tokens will claim that revenue,
                effectively treating the remaining 68% as non-existent. Decision will be made by
                DEX223 DAO on redistribution of unsold tokens from pre-ICO or public rounds.
              </p>
              <p>
                In the spirit of financial transparency, the development team commits to publishing{" "}
                <TextLink href={"/development#reports"} text="monthly report" /> detailing the
                distribution and use of any funds collected through ICO events or private sales,
                ensuring that every aspect of DEX223’s growth and progress remains visible to the
                community.
              </p>

              <div className="flex justify-between items-center border-y border-secondary-border py-2.5 text-primary-text">
                <div className="flex flex-col">
                  <span className="text-20">Total</span>
                  <span>100%</span>
                </div>
                <span className="text-40">8,000,000,000 D223</span>
              </div>
            </div>
          </>
        }
      />
      <div ref={ref} />
      <Container className="w-full pl-[108px]">
        <div>
          <div className="mt-[110px] h-[10px] relative pointer-events-none">
            <div className="grid grid-cols-5 absolute bottom-0 w-full h-[1000px] mb-5 gap-5">
              <div className="flex items-end relative">
                <div
                  className={clsx(
                    "bg-green-hover h-2.5 relative rounded-3",
                    isIntersected && "animate-grow-column-1",
                  )}
                  style={{ width: "100%" }}
                >
                  <span className="absolute z-[2] -top-[60px] left-1/2 -translate-x-1/2 text-primary-text text-40">
                    <span>3%</span>
                  </span>
                </div>
              </div>
              <div className="flex items-end relative">
                <div
                  className={clsx(
                    "bg-green h-2.5 relative rounded-3",
                    isIntersected && "animate-grow-column-2",
                  )}
                  style={{ width: "100%" }}
                >
                  <span className="absolute z-[2] -top-[60px] left-1/2 -translate-x-1/2 text-primary-text text-40">
                    <span>9.5%</span>
                  </span>
                </div>
              </div>
              <div className="flex items-end relative">
                <div
                  className={clsx(
                    "bg-[#6F8381] h-2.5 relative rounded-3",
                    isIntersected && "animate-grow-column-3",
                  )}
                  style={{ width: "100%" }}
                >
                  <span className="absolute z-[2] -top-[60px] left-1/2 -translate-x-1/2 text-primary-text text-40">
                    <span>9.5%</span>
                  </span>
                </div>
              </div>
              <div className="flex items-end relative">
                <div
                  className={clsx(
                    "bg-green-bg-hover h-2.5 relative rounded-3",
                    isIntersected && "animate-grow-column-4",
                  )}
                  style={{ width: "100%" }}
                >
                  <span className="absolute z-[2] -top-[60px] left-1/2 -translate-x-1/2 text-primary-text text-40">
                    <span>10%</span>
                  </span>
                </div>
              </div>
              <div className="flex items-end relative ">
                <div
                  className={clsx(
                    "bg-green-bg h-2.5 relative rounded-3",
                    isIntersected && "animate-grow-column-5",
                  )}
                  style={{ width: "100%" }}
                >
                  <span className="absolute z-[2] -top-[60px] left-1/2 -translate-x-1/2 text-primary-text text-40">
                    <span>68%</span>
                  </span>
                </div>
              </div>
            </div>
            {/*<Spacer height={20} />*/}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-5">
          <div className="grid gap-2 grid-rows-[1fr_auto]">
            <span className="text-secondary-text pr-2.5">Discounted pre-ICO sales</span>
            <span className="font-bold">
              240,000,000 D223 <span className="hidden">3%</span>
            </span>
          </div>
          <div className="grid gap-2 grid-rows-[1fr_auto]">
            <span className="text-secondary-text pr-2.5">Core team allocation</span>
            <span className="font-bold">
              760,000,000 D223 <span className="hidden">9.5%</span>
            </span>
          </div>
          <div className="grid gap-2 grid-rows-[1fr_auto]">
            <span className="text-secondary-text pr-2.5">Project development</span>
            <span className="font-bold">
              760,000,000 D223 <span className="hidden">9.5%</span>
            </span>
          </div>
          <div className="grid gap-2 grid-rows-[1fr_auto]">
            <span className="text-secondary-text pr-2.5">Private investment rounds</span>
            <span className="font-bold">
              800,000,000 D223 <span className="hidden">10%</span>
            </span>
          </div>
          <div className="grid gap-2 grid-rows-[1fr_auto]">
            <span className="text-secondary-text pr-2.5">Public sales</span>
            <span className="font-bold">
              5,440,000,000 D223 <span className="hidden">68%</span>
            </span>
          </div>
        </div>
      </Container>
    </>
  );
}
