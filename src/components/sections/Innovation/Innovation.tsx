import React, {useEffect, useRef, useState} from "react";
import styles from "./Innovation.module.scss";
import NeonBlock from "../../organisms/NeonBlock";
import ArticleHeading from "../../atoms/ArticleHeading";
import Spacer from "../../atoms/Spacer";
import clsx from "clsx";
import ExternalTextLink from "../../atoms/ExternalTextLink";

function FeatureBlock({heading, content, image}) {
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

  const [rotations, setRotations] = useState({x: 0, y: 0});

  useEffect(() => {
    const xRotation = ((positions.top / positions.height) - 0.5) * -2;
    const yRotation = ((positions.left / positions.width) - 0.5) * -2;

    setRotations({x: xRotation, y: yRotation})
  }, [positions.height, positions.left, positions.top, positions.width]);

  return <div ref={ref} onMouseLeave={() => {
    setRotations({x: 0, y: 0})
  }
  } style={{transform: `perspective(700px) rotateX(${rotations.x}deg) rotateY(${rotations.y}deg)`}}
              className={clsx(styles.featureBlock)}>
    <div style={{left: positions.left, top: positions.top}} className={styles.gradientCursor}/>

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
      icon={<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path
          d="M24 44C23.1333 44 22.35 43.7917 21.65 43.375C20.95 42.9583 20.4 42.4 20 41.7C18.9 41.7 17.9583 41.3083 17.175 40.525C16.3917 39.7417 16 38.8 16 37.7V30.6C14.0333 29.3 12.4583 27.5833 11.275 25.45C10.0917 23.3167 9.5 21 9.5 18.5C9.5 14.4667 10.9083 11.0417 13.725 8.225C16.5417 5.40833 19.9667 4 24 4C28.0333 4 31.4583 5.40833 34.275 8.225C37.0917 11.0417 38.5 14.4667 38.5 18.5C38.5 21.0667 37.9083 23.4 36.725 25.5C35.5417 27.6 33.9667 29.3 32 30.6V37.7C32 38.8 31.6083 39.7417 30.825 40.525C30.0417 41.3083 29.1 41.7 28 41.7C27.6 42.4 27.05 42.9583 26.35 43.375C25.65 43.7917 24.8667 44 24 44ZM20 37.7H28V35.9H20V37.7ZM20 33.9H28V32H20V33.9ZM25.5 28V22.6L28.85 19.25C29.15 18.95 29.3 18.6 29.3 18.2C29.3 17.8 29.15 17.45 28.85 17.15C28.55 16.85 28.2 16.7 27.8 16.7C27.4 16.7 27.05 16.85 26.75 17.15L24 19.9L21.25 17.15C20.95 16.85 20.6 16.7 20.2 16.7C19.8 16.7 19.45 16.85 19.15 17.15C18.85 17.45 18.7 17.8 18.7 18.2C18.7 18.6 18.85 18.95 19.15 19.25L22.5 22.6V28H25.5Z"
          fill="#F5FFF9"/>
      </svg>}
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
    <div className="container">
      <div className={styles.cardWrapper}>
        <FeatureBlock image={<img src="/images/feature-1.png" alt=""/>} content={
          <>
            <div className={styles.paragraphs}>
              <div className={styles.text}>The support of ERC-223 token standard will solve the problem of ERC-20 design
                that caused a loss of $201,690,000 worth of tokens on Ethereum mainnet as of 29/08/2023, allow us to
                give users full control over their funds during the exchange process eliminating the need for approvals.
                This can optimize the GAS usage by approximately 15% in some cases and also lay the foundation for the
                implementation of &quot;encapsulated margin trading&quot; at the platform.
              </div>
              <div className={styles.text}>It will still be possible to fallback to ERC-20 for the users of our platform
                however should it be necessary. The exchange will fully support the ERC-20 standard alongside ERC-223.
              </div>
              <div className={styles.text}>EIP-7417 will make ERC-20 and ERC-223 tokens interchangeable so that it will
                be possible to create a ERC-223 wrapper for any existing ERC-20 tokens in order to enhance the security
                of token holders funds. ERC-223 versions of existing ERC-20 tokens created via EIP-7417 and their ERC-20
                origins will be merged into one liquidity pool.
              </div>
            </div>
            <div className={styles.anchor} id="margin"/>
          </>
        } heading="ERC-223 Support"/>
        <FeatureBlock image={<img src="/images/feature-2.png" alt=""/>} content={<div className={styles.paragraphs}>
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
            allowed to execute the &quot;liquidation&quot; of the borrower in exchange for a small reward specified by the lender
            at the time of order creation. Liquidation will trigger the market sell of all the active borrowers
            positions.
          </div>
          <div className={styles.text}>This implementation eliminates the problem of price oracles.</div>
        </div>} heading="Encapsulated Margin Trading"/>
        <FeatureBlock image={<img src="/images/feature-3.png" alt=""/>} content={<div className={styles.paragraphs}>
          <div className={styles.text}>On DEX223 users will be allowed to import any existing tokenlist from{" "}
             <ExternalTextLink text="http://tokenlist.org/" href="http://tokenlist.org/" /> or import tokens from the auto-listing contract. Auto-listing contract will allow
            anyone to list a token on the platform without asking for anyones permission or interacting with the
            exchange team.
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
