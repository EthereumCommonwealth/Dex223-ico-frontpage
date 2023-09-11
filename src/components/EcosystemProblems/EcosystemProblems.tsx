import React, {useMemo, useState} from "react";
import styles from "./EcosystemProblems.module.scss";
import clsx from "clsx";
import OverlineText from "../OverlineText";
import ExternalTextLink from "../ExternalTextLink";
import Text from "../atoms/Text";
import Image from "next/image";

function LostCard({icon, name, lost, percentage}) {
  return <div className={styles.lostCard}>
    <div className={styles.lostCardHeader}>
      <div className={styles.lostCardName}>{icon} {name}</div>
      <Text weight={700} variant={20}>{lost}</Text>
    </div>
    <div className={styles.lostProgress}>
      <div style={{width: `${percentage}%`}} />
    </div>
  </div>
}

const slides = [
  {
    heading: "Security problems of ERC-20 standard",
    content: <div className={styles.slideParagraphs}>
      <p className={styles.primaryParagraph}>
        ERC-20 standard violates common secure software design principles
        which resulted in a loss of $201M worth of tokens for the users.
      </p>
      <p className={styles.secondaryParagraph}>
        ERC-20 was designed in 2015. At that time there was a bug in EthereumVM.
        In order to make tokens not affected by this bug ERC-20 was designed in a clunky
        way which does not allow for error handling. As the result of impossibility
        of handling user mistakes $201M worth of ERC-20 tokens were lost.
      </p>
      <p className={styles.secondaryParagraph}>
        ERC-223 is designed with security in mind. ERC-223 would allow to prevent
        user mistakes and we believe than in the long term a standard
        that prevents user mistakes and losses of funds will thrive.
      </p>
    </div>,
    illustration: <div className={styles.slide1IllustrationWrapper}>
      <div className={styles.slide1IllustrationHeader}>
        <span>Problem</span>
        <span>Lost</span>
      </div>
      <div className={styles.problemCards}>
        <LostCard lost={"$60M"} icon={
          <Image width={32} height={32} src="/images/curve-logo.png" alt="" />
        } name="Curve hack" percentage={20} />
        <LostCard lost={"$62M"} icon={
          <Image width={32} height={32} src="/images/curve-logo.png" alt="" />
        } name="DAO hack" percentage={20} />
        <LostCard lost={"$150M"} icon={
          <Image width={32} height={32} src="/images/curve-logo.png" alt="" />
        } name="Compound hack" percentage={40} />
        <LostCard lost={"$201M"} icon={
          <Image width={32} height={32} src="/images/curve-logo.png" alt="" />
        } name="ERC-20 user errors" percentage={50} />
        <LostCard lost={"$326M"} icon={
          <Image width={32} height={32} src="/images/curve-logo.png" alt="" />
        } name="Wormhole hack" percentage={70} />
      </div>

    </div>
  },
  {
    heading: "Security problems of approve & transferFrom pattern",
    content: <div className={styles.slideParagraphs}>
      <p className={styles.primaryParagraph}>
        Transacting method of ERC-20 tokens can put users funds at risk by
        authorizing DEX contract to operate funds on users behalf.
      </p>
      <p className={styles.secondaryParagraph}>
        ERC-20 tokens can&apos;t be directly deposited to smart-contracts. An
        approval must be issued first. Approval and Swap are two different
        transactions. In order to reduce GAS costs and improve user experience
        DEXes suggest that user issue an unlimited approval once and let it stay
        to avoid issuing it next time. By issuing an approval the user authorizes
        the contract to do anything with the funds on users behalf and
        if the contract gets hacked 15 years later the
        user will get their tokens drained.
      </p>
      <p className={styles.tertiaryParagraph}>
        ERC-223 tokens can be swapped without approvals. The user has the control over their ERC-223 tokens at any
        moment and no third party is authorized to make transfers on users behalf.
      </p>
    </div>,
    illustration: <div className={styles.approveProblemsWrapper}>
      <div className={styles.approveProblemsFooter}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M13.9997 19.834C14.3302 19.834 14.6073 19.7222 14.8309 19.4986C15.0545 19.275 15.1663 18.9979 15.1663 18.6673C15.1663 18.3368 15.0545 18.0597 14.8309 17.8361C14.6073 17.6125 14.3302 17.5007 13.9997 17.5007C13.6691 17.5007 13.392 17.6125 13.1684 17.8361C12.9448 18.0597 12.833 18.3368 12.833 18.6673C12.833 18.9979 12.9448 19.275 13.1684 19.4986C13.392 19.7222 13.6691 19.834 13.9997 19.834ZM12.833 15.1673H15.1663V8.16732H12.833V15.1673ZM13.9997 25.6673C12.3858 25.6673 10.8691 25.3611 9.44967 24.7486C8.03023 24.1361 6.79551 23.3048 5.74551 22.2548C4.69551 21.2048 3.86426 19.9701 3.25176 18.5507C2.63926 17.1312 2.33301 15.6145 2.33301 14.0007C2.33301 12.3868 2.63926 10.8701 3.25176 9.45065C3.86426 8.03121 4.69551 6.79648 5.74551 5.74648C6.79551 4.69648 8.03023 3.86523 9.44967 3.25273C10.8691 2.64023 12.3858 2.33398 13.9997 2.33398C15.6136 2.33398 17.1302 2.64023 18.5497 3.25273C19.9691 3.86523 21.2038 4.69648 22.2538 5.74648C23.3038 6.79648 24.1351 8.03121 24.7476 9.45065C25.3601 10.8701 25.6663 12.3868 25.6663 14.0007C25.6663 15.6145 25.3601 17.1312 24.7476 18.5507C24.1351 19.9701 23.3038 21.2048 22.2538 22.2548C21.2038 23.3048 19.9691 24.1361 18.5497 24.7486C17.1302 25.3611 15.6136 25.6673 13.9997 25.6673ZM13.9997 23.334C16.6052 23.334 18.8122 22.4298 20.6205 20.6215C22.4288 18.8132 23.333 16.6062 23.333 14.0007C23.333 11.3951 22.4288 9.18815 20.6205 7.37982C18.8122 5.57148 16.6052 4.66732 13.9997 4.66732C11.3941 4.66732 9.18717 5.57148 7.37884 7.37982C5.57051 9.18815 4.66634 11.3951 4.66634 14.0007C4.66634 16.6062 5.57051 18.8132 7.37884 20.6215C9.18717 22.4298 11.3941 23.334 13.9997 23.334Z" fill="#FF0000"/>
        </svg>
        <span>
        An approval must be issued every time you perform a swap. If an exchange prompts you to issue
        a one-time approval then it authorizes the contracts to do anything with your tokens forever.
        </span>
      </div>
    </div>

  },
  {
    heading: "Security problems of existing ERC-20 exchanges",
    content: <div className={styles.slideParagraphs}>
      <p className={styles.primaryParagraph}>
        Most ERC-20 exchanges prompt a user to issue a one-time &quot;unlimited&quot; approval.
        This puts users funds at risk as the contract will have unlimited
        access to users funds even after the user stopped using it.
      </p>
    </div>,
    illustration: <div className={styles.erc20Problems}>
      <div className={styles.erc20ProblemsGreen1} />
      <div className={styles.erc20ProblemsGreen2} />
      <div className={styles.erc20ProblemsRed} />
    </div>
  },
  {
    heading: "GAS optimization",
    content: <div className={styles.slideParagraphs}>
      <p className={styles.secondaryParagraph}>
        ERC-223 token swaps can be 15% cheaper than ERC-20 swaps.
      </p>
      <p className={styles.secondaryParagraph}>
        ERC-20 swap consumed 257K GAS.
      </p>
      <ul className={styles.slideList}>
        <li><ExternalTextLink href="#" text="Approval"/> 45K GAS</li>
        <li><ExternalTextLink href="#" text="Tokens swap"/> 212K GAS</li>
      </ul>
      <p className={styles.secondaryParagraph}>
        ERC-223 swap of the same token consumed 220K GAS
        and doesn&apos;t require an approval transaction at all.
      </p>
      <ul className={styles.slideList}>
        <li><ExternalTextLink href="#" text="ERC-223 tokens swap"/> 220K GAS</li>
      </ul>
    </div>,
    illustration: <img src="/images/slide-6.png" alt=""/>
  },
  {
    heading: "Interface decentralization",
    content: <div className={styles.slideParagraphs}>
      <p className={styles.primaryParagraph}>
        Most DEXes still run one instance of centralized UI.
      </p>
      <p className={styles.secondaryParagraph}>
        The ideology of cryptocurrencies is built upon decentralization. However
        the benefits of decentralization are lost as soon as a centralized gateway
        becomes involved. The emergence of DEXes is a big step towards decentralization.
        Smart-contracts replaced the &quot;backend&quot; of traditional centralized exchanges
        but interfaces remained as centralized as they were before.
      </p>
      <p className={styles.tertiaryParagraph}>
        DEX223 will have multiple competing versions of the UI allowing for full decentralization.
      </p>
    </div>,
    illustration: <div className={styles.secureErc20}>
      <div className={styles.secureErc20Green1} />
      <div className={styles.secureErc20Green2} />
      <div className={styles.secureErc20Red} />
    </div>
  },
  {
    heading: "Centralized token listings governed by exchange teams",
    content: <div className={styles.slideParagraphs}>
      <p className={styles.primaryParagraph}>
        Most &quot;decentralized&quot; exchanges still rely on teams decision to list
        a new token. This can be a nightmare for both token developers
        who have to comply with the listing rules and users who may
        not have some tokens available for trading.
      </p>
      <p className={styles.secondaryParagraph}>
        Uniswap did a big step towards listing decentralization with their tokenlists
        project but DEX223 goes even further. DEX223 will have an option to import
        any asset from tokenlists as well as import a list of assets from a contract
        deployed on Ethereum mainnet which will act as one decentralized tokenlist.
      </p>
      <p className={styles.tertiaryParagraph}>
        Anyone will be able to list a new token on DEX223 without asking a permission
        from exchange team just by paying an anti-spam listing fee via the
        autolisting contract.
      </p>
    </div>,
    illustration: <div className={styles.lastSlide}>
      <img src="/images/last-slide.png" alt=""/>
    </div>
  }
];

function EcosystemSlide({index, activeSlide, slide}) {

  return <div className={clsx(styles.slideTest, index === activeSlide && styles.active)}>
      <h2 className={styles.sliderHeading}>{slide.heading}</h2>
      {slide.content}
    </div>;
}

export default function EcosystemProblems() {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const nextSlide = () => {
    setActiveSlide((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const previousSlide = () => {
    setActiveSlide((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };


  return <div className="container">
    <div className={styles.ecosystemProblems}>
      <div className={styles.sliderContainer}>
        <div className={styles.slides}>
          <div className={styles.slide}>
            <div className={styles.illustration}>
              {slides[activeSlide].illustration}
            </div>
            <div className={styles.slideTextContent}>
              <div>
                <OverlineText text="Problem Of Ecosystem" color="purple"/>
                {slides.map((slide, index) => {
                  return <div key={index} className={styles.slideTextWrapper}>
                    <EcosystemSlide index={index} slide={slide} activeSlide={activeSlide}/>
                  </div>
                })}
              </div>
              <div className={styles.navigation}>
                <button onClick={previousSlide}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7.36621 11.6543C7.36621 11.874 7.4541 12.0674 7.62109 12.2344L14.582 19.0459C14.7402 19.2041 14.9336 19.2832 15.1621 19.2832C15.6104 19.2832 15.9619 18.9404 15.9619 18.4834C15.9619 18.2549 15.874 18.0615 15.7334 17.9121L9.33496 11.6543L15.7334 5.39648C15.874 5.24707 15.9619 5.04492 15.9619 4.8252C15.9619 4.36816 15.6104 4.02539 15.1621 4.02539C14.9336 4.02539 14.7402 4.10449 14.582 4.25391L7.62109 11.0742C7.4541 11.2324 7.36621 11.4346 7.36621 11.6543Z"
                      fill="#F5FFF9"/>
                  </svg>
                </button>
                <button onClick={nextSlide}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15.9619 11.6543C15.9619 11.874 15.874 12.0674 15.707 12.2344L8.74609 19.0459C8.58789 19.2041 8.39453 19.2832 8.16602 19.2832C7.71777 19.2832 7.36621 18.9404 7.36621 18.4834C7.36621 18.2549 7.4541 18.0615 7.59473 17.9121L13.9932 11.6543L7.59473 5.39648C7.4541 5.24707 7.36621 5.04492 7.36621 4.8252C7.36621 4.36816 7.71777 4.02539 8.16602 4.02539C8.39453 4.02539 8.58789 4.10449 8.74609 4.25391L15.707 11.0742C15.874 11.2324 15.9619 11.4346 15.9619 11.6543Z"
                      fill="#F5FFF9"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.indicatorsContainer}>
          {slides.map((item, index) => {
            return <div role="button" onClick={() => setActiveSlide(index)} key={index}
                        className={clsx(styles.indicator, index === activeSlide && styles.activeIndicator)}/>
          })}
        </div>
      </div>
    </div>
  </div>;
}
