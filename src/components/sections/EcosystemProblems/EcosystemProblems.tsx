import React, {useEffect, useMemo, useRef, useState} from "react";
import styles from "./EcosystemProblems.module.scss";
import clsx from "clsx";
import OverlineText from "../../atoms/OverlineText";
import ExternalTextLink from "../../atoms/ExternalTextLink";
import Image from "next/image";
import {useSwipeable} from "react-swipeable";
import Svg from "../../atoms/Svg";
import {useIntersectionObserver} from "@/hooks/useIntersectionObserver";
import InterfaceDecentralizationImage from "../../../assets/images/last-slide.svg";
import ListingsImage from "../../../assets/images/slider-listings.svg";

function LostCard({icon, name, lost, percentage, color, active = false, animate = false}) {
  return <div className={clsx(styles.lostCard, active && styles.active)}>
    <div className={styles.lostCardHeader}>
      <div className={styles.lostCardName}>{icon} {name}</div>
      <span className={styles.lostValue}>{lost}</span>
    </div>
    <div className={styles.lostProgress}>
      <div style={{width: animate ? `${percentage}%` : "1%", backgroundColor: color, transitionDuration: "1s", transitionTimingFunction: "ease-in-out"}}/>
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
    illustration: ({animate, key}) => <div key={key} className={styles.slide1IllustrationWrapper}>
      <div className={styles.slide1IllustrationHeader}>
        <span>Problem</span>
        <span>Lost</span>
      </div>
      <div className={styles.problemCards}>
        <LostCard animate={animate} color="#F79290" lost={"$60M"} icon={<Image width={32} height={32} src="/images/curve-logo.png" alt=""/>} name="Curve hack" percentage={20}/>
        <LostCard animate={animate} color="#F8827F" lost={"$62M"} icon={<Image src="/images/problem-logos/dao.svg" alt="" width={32} height={32} />} name="DAO hack" percentage={20}/>
        <LostCard animate={animate} color="#F0504D" lost={"$150M"} icon={<Image src="/images/problem-logos/compound.svg" alt="" width={32} height={32} />} name="Compound hack" percentage={40}/>
        <LostCard animate={animate} active color="#FF3333" lost={"$201M"} icon={<Image src="/images/problem-logos/user-errors.svg" alt="" width={32} height={32} />} name="ERC-20 user errors" percentage={50}/>
        <LostCard animate={animate} color="#790003" lost={"$326M"} icon={<Image src="/images/problem-logos/wormhole.svg" alt="" width={32} height={32} />} name="Wormhole hack" percentage={70}/>
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
    illustration: ({animate, key}) => <div key={key} className={styles.approveProblemsWrapper}>
      <div className={clsx(styles.attentionMark, animate && styles.animate)} />
      <div className={styles.approveProblemsFooter}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M13.9997 19.834C14.3302 19.834 14.6073 19.7222 14.8309 19.4986C15.0545 19.275 15.1663 18.9979 15.1663 18.6673C15.1663 18.3368 15.0545 18.0597 14.8309 17.8361C14.6073 17.6125 14.3302 17.5007 13.9997 17.5007C13.6691 17.5007 13.392 17.6125 13.1684 17.8361C12.9448 18.0597 12.833 18.3368 12.833 18.6673C12.833 18.9979 12.9448 19.275 13.1684 19.4986C13.392 19.7222 13.6691 19.834 13.9997 19.834ZM12.833 15.1673H15.1663V8.16732H12.833V15.1673ZM13.9997 25.6673C12.3858 25.6673 10.8691 25.3611 9.44967 24.7486C8.03023 24.1361 6.79551 23.3048 5.74551 22.2548C4.69551 21.2048 3.86426 19.9701 3.25176 18.5507C2.63926 17.1312 2.33301 15.6145 2.33301 14.0007C2.33301 12.3868 2.63926 10.8701 3.25176 9.45065C3.86426 8.03121 4.69551 6.79648 5.74551 5.74648C6.79551 4.69648 8.03023 3.86523 9.44967 3.25273C10.8691 2.64023 12.3858 2.33398 13.9997 2.33398C15.6136 2.33398 17.1302 2.64023 18.5497 3.25273C19.9691 3.86523 21.2038 4.69648 22.2538 5.74648C23.3038 6.79648 24.1351 8.03121 24.7476 9.45065C25.3601 10.8701 25.6663 12.3868 25.6663 14.0007C25.6663 15.6145 25.3601 17.1312 24.7476 18.5507C24.1351 19.9701 23.3038 21.2048 22.2538 22.2548C21.2038 23.3048 19.9691 24.1361 18.5497 24.7486C17.1302 25.3611 15.6136 25.6673 13.9997 25.6673ZM13.9997 23.334C16.6052 23.334 18.8122 22.4298 20.6205 20.6215C22.4288 18.8132 23.333 16.6062 23.333 14.0007C23.333 11.3951 22.4288 9.18815 20.6205 7.37982C18.8122 5.57148 16.6052 4.66732 13.9997 4.66732C11.3941 4.66732 9.18717 5.57148 7.37884 7.37982C5.57051 9.18815 4.66634 11.3951 4.66634 14.0007C4.66634 16.6062 5.57051 18.8132 7.37884 20.6215C9.18717 22.4298 11.3941 23.334 13.9997 23.334Z"
            fill="#FF0000"/>
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
    illustration: ({animate, key}) => <div key={key} className={styles.erc20Problems}>
      <div className={styles.erc20ProblemsLeftColumn}>
        <div className={clsx(styles.erc20ProblemsGreen1, animate && styles.animate)}>
          <img src="images/prob1.png"/>
        </div>
        <div className={clsx(styles.erc20ProblemsGreen2, animate && styles.animate)}>
          <img src="images/prob2.png"/>
        </div>
      </div>
      <div>

        <div className={clsx(styles.erc20ProblemsRed, animate && styles.animate)}>
          <img src="images/prob3.png"/>
        </div>
      </div>
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
        <li><ExternalTextLink
          href="https://explorer.callisto.network/tx/0xa20d2838ea371759f92e7d4ae9700d2de96cf65de738b518dea1753db7180377"
          text="Approval"/> 45K GAS
        </li>
        <li><ExternalTextLink
          href="https://explorer.callisto.network/tx/0xedf726375e86b2e1df80a614049ab5e1a797174fb762d81471e3379e98497d36"
          text="Tokens swap"/> 212K GAS
        </li>
      </ul>
      <p className={styles.secondaryParagraph}>
        ERC-223 swap of the same token consumed 220K GAS
        and doesn&apos;t require an approval transaction at all.
      </p>
      <ul className={styles.slideList}>
        <li><ExternalTextLink
          href="https://explorer.callisto.network/tx/0x8cf1d1454723c2c4e0d57b1f7d202bccd47d780de1ffb1482de377a4ae1bef9b"
          text="ERC-223 tokens swap"/> 220K GAS
        </li>
      </ul>
    </div>,
    illustration: ({animate, key}) => <div key={key} className={styles.secureErc20}>
        <div>
          <div className={clsx(styles.secureErc20Green1, animate && styles.animated)}>
            <img src="/images/sec1.png" alt=""/>
          </div>
        </div>
        <div className={styles.erc20ProblemsLeftColumn}>
          <div className={clsx(styles.secureErc20Green2, animate && styles.animated)}>
            <img src="/images/sec2.png" alt=""/>
          </div>
          <div className={clsx(styles.secureErc20Red, animate && styles.animated)}>
            <img src="/images/sec3.png" alt=""/>
          </div>
        </div>
      </div>
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
    illustration: ({animate, key}) => <div key={key} className={clsx(styles.lastSlide, animate && "animated")}>
      <InterfaceDecentralizationImage />
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
    illustration: ({animate, key}) => <div key={key} className={clsx(styles.gasOptimisationIllustration, animate && "animated")}>
      <div className={styles.gasOptimisationIllustrationCircle}/>
      <ListingsImage />
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
  const [animationPlayed, setAnimationPlayed] = useState<number[]>([0]);

  const ref = useRef();

  useEffect(() => {
    if (animationPlayed.includes(activeSlide)) {
      return;
    }

    setAnimationPlayed([...animationPlayed, activeSlide]);
  }, [activeSlide, animationPlayed]);

  const entry = useIntersectionObserver(ref, {threshold: 0.5, freezeOnceVisible: true});

  const nextSlide = () => {
    setActiveSlide((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const previousSlide = () => {
    setActiveSlide((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => previousSlide(),
  });


  return <div className="container">
    <div className={styles.ecosystemProblems}>
      <div className={styles.pattern1}>
        <Image alt="" src="/images/patterns/purple.svg" width={1067} height={1075} />
      </div>
      <div className={styles.pattern2}>
        <Image alt="" src="/images/patterns/purple.svg" width={599} height={604} />
      </div>
      <div className={styles.sliderContainer}>
        <div ref={ref} className={styles.slides}>
          <div {...handlers} className={styles.slide}>
            <div className={clsx(styles.illustration)}>
              {slides[activeSlide].illustration({animate: entry?.isIntersecting && animationPlayed.includes(activeSlide), key: activeSlide})}
            </div>
            <div className={styles.slideTextContent}>
              <div>
                <OverlineText text="Problems Of Ecosystem" color="purple"/>
                {slides.map((slide, index) => {
                  return <div key={index} className={styles.slideTextWrapper}>
                    <EcosystemSlide index={index} slide={slide} activeSlide={activeSlide}/>
                  </div>
                })}
              </div>
              <div className={styles.navigation}>
                <button onClick={previousSlide}>
                  <Svg iconName="arrow-left"/>
                </button>
                <button onClick={nextSlide}>
                  <Svg iconName="arrow-right"/>
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
  </div>
    ;
}
