"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";

import ArticleHeading from "@/components/ArticleHeading";
import Pattern, { PatternColor } from "@/components/atoms/Pattern";
import TextLink from "@/components/atoms/TextLink";
import Container from "@/components/Container";
import NeonBlock from "@/components/organisms/NeonBlock";
import ERC223SupportImage from "@/inlined-svgs/ERC-223SupportImage";
import MTImage from "@/inlined-svgs/MTImage";
import TransparentALImage from "@/inlined-svgs/TransparentALImage";

import BulletListItem from "../../components/atoms/BulletListItem";

function FeatureBlock({
  heading,
  content,
  image,
  anchor,
}: {
  heading: string;
  content: ReactNode;
  image: ReactNode;
  anchor?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [positions, setPositions] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (ref.current) {
      const currentNode = ref.current;

      const recalculatePositions = (e: MouseEvent) => {
        const positions1 = currentNode.getBoundingClientRect();

        setPositions({
          left: e.clientX - positions1.left,
          top: e.clientY - positions1.top,
          width: positions1.width,
          height: positions1.height,
        });
      };

      currentNode.addEventListener("mouseenter", () => {
        currentNode.addEventListener("mousemove", recalculatePositions);
      });
      currentNode.addEventListener("mouseleave", () => {
        currentNode.removeEventListener("mousemove", recalculatePositions);
      });

      return () => {
        // currentNode.removeEventListener('mousemove', recalculatePositions);
      };
    }
  }, []);

  const [rotations, setRotations] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const xRotation = (positions.top / positions.height - 0.5) * -2;
    const yRotation = (positions.left / positions.width - 0.5) * -2;

    setRotations({ x: xRotation, y: yRotation });
  }, [positions.height, positions.left, positions.top, positions.width]);

  return (
    <div
      ref={ref}
      onMouseLeave={() => {
        setRotations({ x: 0, y: 0 });
      }}
      style={{
        transform: `perspective(700px) rotateX(${rotations.x}deg) rotateY(${rotations.y}deg)`,
      }}
      className="relative bg-primary-bg rounded-5 p-4 lg:p-10 group overflow-hidden duration-300 hover:duration-100"
    >
      <div className="absolute -top-10" id={anchor} />
      <div
        style={{ left: positions.left, top: positions.top }}
        className="absolute pointer-events-none w-0 h-0 -translate-x-1/2 -translate-y-1/2 opacity-[.22] z-[1] blur-[20px] group-hover:w-[700px] group-hover:h-[700px] bg-[radial-gradient(circle_closest-side,#7D97A4,transparent)]"
      />

      <div className="flex items-center gap-5 mb-5">
        {image}
        <h4 className="text-18 lg:text-24 font-bold">{heading}</h4>
      </div>
      {content}
    </div>
  );
}

export default function Advantages() {
  return (
    <>
      <NeonBlock
        icon="star"
        color="blue"
        overlineText="Advantages"
        differentColumns
        leftContent={
          <>
            <ArticleHeading text="Unique Features" />
            <p className="mb-6 lg:mb-[60px] text-16 lg:text-18 text-secondary-text">
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
          patternColor={PatternColor.BLUE}
          className="w-300 h-300 -left-[401px] top-[148px]"
        />
        <Pattern
          patternColor={PatternColor.BLUE}
          className="w-250 h-250 -right-[681px] -top-[276px] -scale-100"
        />

        <div className="grid lg:grid-cols-2 gap-4 lg:gap-5 grid-cols-1">
          <FeatureBlock
            image={<MTImage />}
            content={
              <>
                <div className="flex flex-col gap-5 text-secondary-text text-16 lg:text-18">
                  <p>
                    DEX223 introduces an innovative lending mechanism that enables users to create
                    “lending orders” with full control over terms and conditions. Here’s how it
                    works:
                  </p>

                  <div>
                    <h5 className="text-18 lg:text-20 font-bold mb-3">Flexible lending orders</h5>
                    <ul className="flex flex-col gap-2">
                      <BulletListItem>
                        <b className="text-18 lg:text-20">Funds: </b> Place any token in your
                        lending order.
                      </BulletListItem>
                      <BulletListItem>
                        <b className="text-18 lg:text-20">Interest Rate & Deadline: </b> Define your
                        desired annualized interest rate and loan duration.
                      </BulletListItem>
                      <BulletListItem>
                        <b className="text-18 lg:text-20">Permitted Markets: </b> Specify which
                        markets the borrower can trade on.
                      </BulletListItem>
                      <li>
                        <b className="text-18 lg:text-20">Collateral & Configuration: </b> Require a
                        minimum collateral amount and set optional parameters for customization.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-18 lg:text-20 font-bold mb-3">Borrower access & control</h5>
                    <ul className="flex flex-col gap-2">
                      <BulletListItem>
                        A borrower deposits the required collateral to accept your lending order.
                      </BulletListItem>
                      <BulletListItem>
                        They gain the ability to trade with the borrowed funds on the permitted
                        markets but cannot withdraw those funds from DEX223.
                      </BulletListItem>
                      <BulletListItem>
                        This ensures the lender maintains ultimate security while still allowing the
                        borrower to engage in active market strategies.
                      </BulletListItem>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-18 lg:text-20 font-bold mb-3">Flexible lending orders</h5>
                    <ul className="flex flex-col gap-2">
                      <BulletListItem>
                        The lender sets an “expected balance” for the borrower’s positions at any
                        moment during the loan. For example, if 15 ETH is lent at 20% for 30 days,
                        the borrower’s cumulative balance must be 18 ETH on day 30 or 16.5 ETH on
                        day 15.
                      </BulletListItem>
                      <BulletListItem>
                        At any point, the borrower’s actual balance is measured by the immediate
                        market sell value of all their positions (accounting for liquidity).
                      </BulletListItem>
                      <BulletListItem>
                        If the actual balance falls below the expected balance, anyone can trigger
                        liquidation in return for a small reward—defined by the lender at order
                        creation.
                      </BulletListItem>
                      <BulletListItem>
                        Liquidation automatically closes the borrower’s positions on the spot,
                        protecting the lender’s investment.
                      </BulletListItem>
                      <BulletListItem>
                        This self-contained approach removes reliance on external price oracles,
                        bolstering security and transparency.
                      </BulletListItem>
                    </ul>
                  </div>

                  <p>
                    Encapsulated Margin Trading on DEX223 combines flexibility with robust
                    safeguards, allowing users to lend and borrow on their own terms while keeping
                    everyone’s funds protected.
                  </p>

                  <p>
                    Deep Dive:{" "}
                    <TextLink text="DEX223 Margin Trading Showcase video" isExternal href="#" />
                  </p>
                </div>
              </>
            }
            heading="Encapsulated margin trading"
          />
          <div className="flex flex-col gap-5">
            <FeatureBlock
              anchor="margin"
              image={<ERC223SupportImage />}
              content={
                <div className="flex flex-col gap-5 text-16 lg:text-18 text-secondary-text">
                  <p>
                    Integrating ERC-223 directly addresses a key shortcoming of the ERC-20 design,
                    which has led to the loss of approximately $201,690,000 worth of tokens on
                    Ethereum mainnet as of 29 August 2023. By adopting ERC-223, our platform ensures
                    users have full control over their tokens during the exchange process,
                    eliminating the need for traditional approval steps. This not only enhances
                    security but can also reduce GAS costs by up to 15% in certain transactions.
                  </p>
                  <p>
                    Additionally, ERC-223 paves the way for implementing our “Encapsulated Margin
                    Trading” feature, further expanding the scope of decentralized finance on the
                    platform.
                  </p>
                  <p>
                    For users who still prefer ERC-20, the exchange will maintain full support
                    alongside ERC-223, allowing a seamless fallback whenever necessary. As EIP-7417
                    moves toward standardization, it will enable ERC-20 and ERC-223 tokens to be
                    used interchangeably. Through a simple wrapping process, any existing ERC-20
                    token can be upgraded to an ERC-223 equivalent, bolstering fund security. These
                    wrapped tokens and their original ERC-20 counterparts will share unified
                    liquidity pools, delivering both convenience and confidence to all participants.
                  </p>
                </div>
              }
              heading="ERC-223 Support"
            />
            <FeatureBlock
              image={<TransparentALImage />}
              content={
                <div className="flex flex-col gap-5 text-16 lg:text-18 text-secondary-text">
                  <p>
                    DEX223 empowers users to freely import any existing token list from{" "}
                    <TextLink href="https://tokenlists.org" isExternal text="tokenlists.org" /> or
                    integrate new tokens directly through{" "}
                    <TextLink
                      text="our auto-listing
                    contract"
                      href="https://test-app.dex223.io/en/token-listing"
                      isExternal
                    />
                    . This open, permissionless approach allows anyone to list a token without
                    seeking approval from the exchange team or intermediaries. Acting as a
                    decentralized alternative to traditional token lists, the auto-listing contract
                    collects listing fees that are then distributed among DEX223 token holders as
                    revenue. Through on-chain voting, the community also determines listing fees,
                    reinforcing collective governance and ensuring that DEX223 remains transparent,
                    inclusive, and owned by its users.
                  </p>
                </div>
              }
              heading="Transparent Auto-Listings"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
