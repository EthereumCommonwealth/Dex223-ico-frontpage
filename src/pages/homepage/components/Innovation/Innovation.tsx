import React, { useEffect, useRef, useState } from "react";
import styles from "./Innovation.module.scss";
import NeonBlock from "../../../../components/organisms/others/NeonBlock";
import ArticleHeading from "../../../../components/atoms/ArticleHeading";
import Spacer from "../../../../components/atoms/Spacer";
import clsx from "clsx";
import ExternalTextLink from "../../../../components/atoms/ExternalTextLink";
import FirstCardImage from "../../../../assets/images/gear.svg";
import SecondCardImage from "../../../../assets/images/margin.svg";
import ThirdCardImage from "../../../../assets/images/listings.svg";
import Image from "next/image";

function FeatureBlock({ heading, content, image }) {
  const ref = useRef<HTMLDivElement>();
  const [positions, setPositions] = useState({
    left: 0, top: 0, width: 0, height: 0
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
          height: positions1.height
        })
      }

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
    const xRotation = ((positions.top / positions.height) - 0.5) * -2;
    const yRotation = ((positions.left / positions.width) - 0.5) * -2;

    setRotations({ x: xRotation, y: yRotation })
  }, [positions.height, positions.left, positions.top, positions.width]);

  return <div ref={ref} onMouseLeave={() => {
    setRotations({ x: 0, y: 0 })
  }
  } style={{ transform: `perspective(700px) rotateX(${rotations.x}deg) rotateY(${rotations.y}deg)` }}
              className={clsx(styles.featureBlock)}>
    <div style={{ left: positions.left, top: positions.top }} className={styles.gradientCursor}/>

    <div className={styles.textBlock}>
      <h4 className={styles.featureCardHeading}>{heading}</h4>
      {content}
    </div>
    <div className={styles.imageBlock}>
      {image}
    </div>
  </div>
}

export default function Innovation() {
  return <>

    <NeonBlock
      icon="lamp"
      color="blue"
      overlineText="Innovation"
      leftContent={
        <>
          <ArticleHeading text="Unique Features"/>
          <p className={styles.text}>DEX223 introduces a number of revolutionary concepts that no other exchange
            implements in the same way currently. These features will drastically improve the security, make token
            listings as easy and transparent as possible and allow on-platform lending of assets.</p>
          <Spacer height={40}/>
        </>
      }
    />
    <div className="container relative">
      <div className={styles.pattern1}>
        <Image alt="" src="/images/patterns/blue.svg" width={1000} height={1000}/>
      </div>
      <div className={styles.pattern2}>
        <Image alt="" src="/images/patterns/blue.svg" width={1000} height={1000}/>
      </div>
      <div className={styles.cardWrapper}>
        <FeatureBlock image={<FirstCardImage/>} content={
          <>
            <div className={styles.paragraphs}>
              <div className={styles.text}>The support of ERC-223 token standard will <span className="bold primary-color">solve the problem of ERC-20 design
                that caused a loss of $201,690,000</span> worth of tokens on Ethereum mainnet as of 29/08/2023, allow us to
                give users full control over their funds during the exchange process eliminating the need for approvals.
                This can <span className="bold primary-color">optimize the GAS usage by approximately 15%</span> in some cases and also lay the foundation for the
                implementation of &quot;encapsulated margin trading&quot; at the platform.
              </div>
              <div className={styles.text}>It will still be possible to fallback to ERC-20 for the users of our platform
                however should it be necessary. The exchange will fully support the ERC-20 standard alongside ERC-223.
              </div>
              <div className={styles.text}><span className="bold primary-color">EIP-7417 will make ERC-20 and ERC-223 tokens interchangeable</span> so that it will
                be possible to create a ERC-223 wrapper for any existing ERC-20 tokens in order to enhance the security
                of token holders funds. ERC-223 versions of existing ERC-20 tokens created via EIP-7417 and their ERC-20
                origins will be merged into one liquidity pool.
              </div>
            </div>
            <div className={styles.anchor} id="margin"/>
          </>
        } heading="ERC-223 Support"/>
        <FeatureBlock image={<SecondCardImage/>} content={<div className={styles.paragraphs}>
          <div className={styles.text}>On DEX223 users will be allowed to create &quot;lending orders&quot; where they
            can place their funds (in any token) and specify
          </div>
          <div className={styles.list}>
            <ul>
              <li className={styles.text}>interest rate</li>
              <li className={styles.text}>deadline</li>
              <li className={styles.text}>markets that borrowers are allowed to trade on</li>
              <li className={styles.text}>required collateral</li>
              <li className={styles.text}>other configuration options</li>
            </ul>
          </div>
          <div className={styles.text}>Another user can borrow the funds from the &quot;lending order&quot; if they
            deposit the required collateral amount. After entering the lending order the borrower will gain control over
            the borrowed funds and will be allowed to make market trades with them at the markets specified by the
            lender but not to withdraw them from the platform.
          </div>
          <div className={styles.text}>Liquidation will be implemented as a function of time and expected balance. If
            the lender provided 15 ETH at 20% interest rate for 30 days then the cumulative balance of the borrowers
            positions must be 18 ETH at 30th day or 16.5 ETH at 15th day. For each moment it is possible to calculate
            the expected balance and actual balance that the borrower would have if he sold all the tokens immediately
            accounting for liquidity. If the actual balance does not match the expected balance then anyone would be
            allowed to execute the &quot;liquidation&quot; of the borrower in exchange for a small reward specified by
            the lender
            at the time of order creation. Liquidation will trigger the market sell of all the active borrowers
            positions.
          </div>
          <div className={styles.text}>This implementation eliminates the problem of price oracles.</div>
        </div>} heading="Encapsulated Margin Trading"/>
        <FeatureBlock image={<ThirdCardImage/>} content={<div className={styles.paragraphs}>
          <div className={styles.text}>On DEX223 users will be allowed to import any existing tokenlist from{" "}
            <ExternalTextLink text="https://tokenlists.org" href="https://tokenlists.org/"/> or import tokens from the
            auto-listing contract. <span className="bold primary-color">Auto-listing contract will allow
            anyone to list a token on the platform without asking for anyones permission or interacting with the
              exchange team.</span>
          </div>
          <div className={styles.text}>Auto-listings contract will serve as a more decentralized version of tokenlists.
            The collected listing fees will be redistributed between DEX223 token holders as revenue. Listing fees will
            be configurable by DEX223 token holders via the voting sessions.
          </div>
        </div>} heading="Transparent Auto-Listings"/>
      </div>

    </div>
  </>;
}
