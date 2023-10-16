import React, {useEffect, useMemo, useRef, useState} from "react";
import styles from "./EcosystemProblems.module.scss";
import clsx from "clsx";
import OverlineText from "../../atoms/OverlineText";
import ExternalTextLink from "../../atoms/ExternalTextLink";
import Image from "next/image";
import {useSwipeable} from "react-swipeable";
import Svg from "../../atoms/Svg";
import {useIntersectionObserver} from "../../../hooks/useIntersectionObserver";
import InterfaceDecentralizationImage from "../../../assets/images/last-slide.svg";
import ListingsImage from "../../../assets/images/slider-listings.svg";
import Pattern1 from "../../../assets/images/purple.svg";

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
        <LostCard animate={animate} color="#F79290" lost={"$60M"} icon={
          <Image width={32} height={32} src="/images/curve-logo.png" alt=""/>
        } name="Curve hack" percentage={20}/>
        <LostCard animate={animate} color="#F8827F" lost={"$62M"} icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <g clip-path="url(#clip0_913_3652)">
              <path
                d="M10.4938 4.10034H6.02295V9.32962H10V10.6436H6.02295V15.767H10.4145C12.769 15.767 14.9559 14.4266 14.9559 9.98218C14.9647 5.53773 12.2752 4.10034 10.4938 4.10034Z"
                fill="#FF3B3B"/>
              <path
                d="M0 0V20H20V0H0ZM10.4321 17.716H4.01235V10.6437H2.52205V9.32981H4.01235V2.16049H10.5379C13.1481 2.16049 17.0635 4.07407 17.0635 10C17.0635 15.9259 13.8801 17.716 10.4321 17.716Z"
                fill="#FF3B3B"/>
            </g>
            <defs>
              <clipPath id="clip0_913_3652">
                <rect width="20" height="20" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        } name="DAO hack" percentage={20}/>
        <LostCard animate={animate} color="#F0504D" lost={"$150M"} icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <g clip-path="url(#clip0_913_3663)">
              <path
                d="M10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20Z"
                fill="#F5F5F5"/>
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M5.77692 13.3535C5.47792 13.1705 5.29492 12.8455 5.29492 12.4955V10.5415C5.29492 10.3095 5.48392 10.1215 5.71592 10.1225C5.78992 10.1225 5.86292 10.1425 5.92692 10.1795L10.3359 12.7505C10.5939 12.9005 10.7529 13.1765 10.7529 13.4755V15.4995C10.7539 15.7775 10.5289 16.0035 10.2509 16.0035C10.1579 16.0035 10.0659 15.9775 9.98692 15.9295L5.77692 13.3535ZM12.3489 9.64452C12.6069 9.79452 12.7649 10.0715 12.7659 10.3695V14.4775C12.7659 14.5985 12.7009 14.7105 12.5949 14.7695L11.6299 15.3125C11.6179 15.3195 11.6049 15.3245 11.5909 15.3285V13.0475C11.5909 12.7525 11.4359 12.4785 11.1819 12.3265L7.30992 10.0105V7.43552C7.30992 7.20352 7.49892 7.01552 7.73092 7.01652C7.80492 7.01652 7.87792 7.03652 7.94192 7.07352L12.3489 9.64452ZM14.2789 6.61052C14.5379 6.76052 14.6969 7.03752 14.6969 7.33652V13.3365C14.6959 13.4595 14.6279 13.5725 14.5199 13.6315L13.6049 14.1255V9.94852C13.6049 9.65352 13.4499 9.38052 13.1979 9.22852L9.23992 6.85452V4.41252C9.23992 4.33852 9.25992 4.26552 9.29592 4.20152C9.41292 4.00152 9.66992 3.93352 9.86992 4.04952L14.2789 6.61052Z"
                    fill="#00D395"/>
            </g>
            <defs>
              <clipPath id="clip0_913_3663">
                <rect width="20" height="20" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        } name="Compound hack" percentage={40}/>
        <LostCard animate={animate} active color="#FF3333" lost={"$201M"} icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M0.833008 15.8337V14.3337C0.833008 13.8615 0.954536 13.4275 1.19759 13.0317C1.44065 12.6358 1.76356 12.3337 2.16634 12.1254C3.02745 11.6949 3.90245 11.3719 4.79134 11.1567C5.68023 10.9414 6.58301 10.8337 7.49967 10.8337C8.41634 10.8337 9.31912 10.9414 10.208 11.1567C11.0969 11.3719 11.9719 11.6949 12.833 12.1254C13.2358 12.3337 13.5587 12.6358 13.8018 13.0317C14.0448 13.4275 14.1663 13.8615 14.1663 14.3337V15.8337C14.1663 16.0699 14.0865 16.2678 13.9268 16.4275C13.767 16.5872 13.5691 16.6671 13.333 16.6671H1.66634C1.43023 16.6671 1.23231 16.5872 1.07259 16.4275C0.912869 16.2678 0.833008 16.0699 0.833008 15.8337ZM15.4372 16.6671C15.5622 16.5699 15.6594 16.4483 15.7288 16.3025C15.7983 16.1567 15.833 15.9935 15.833 15.8129V14.1671C15.833 13.556 15.6629 12.9692 15.3226 12.4067C14.9823 11.8442 14.4997 11.3615 13.8747 10.9587C14.583 11.0421 15.2497 11.1844 15.8747 11.3858C16.4997 11.5872 17.083 11.8337 17.6247 12.1254C18.1247 12.4032 18.5066 12.7122 18.7705 13.0525C19.0344 13.3928 19.1663 13.7643 19.1663 14.1671V15.8337C19.1663 16.0699 19.0865 16.2678 18.9268 16.4275C18.767 16.5872 18.5691 16.6671 18.333 16.6671H15.4372ZM7.49967 10.0004C6.58301 10.0004 5.79829 9.67402 5.14551 9.02124C4.49273 8.36846 4.16634 7.58374 4.16634 6.66707C4.16634 5.75041 4.49273 4.96568 5.14551 4.31291C5.79829 3.66013 6.58301 3.33374 7.49967 3.33374C8.41634 3.33374 9.20106 3.66013 9.85384 4.31291C10.5066 4.96568 10.833 5.75041 10.833 6.66707C10.833 7.58374 10.5066 8.36846 9.85384 9.02124C9.20106 9.67402 8.41634 10.0004 7.49967 10.0004ZM15.833 6.66707C15.833 7.58374 15.5066 8.36846 14.8538 9.02124C14.2011 9.67402 13.4163 10.0004 12.4997 10.0004C12.3469 10.0004 12.1525 9.98305 11.9163 9.94832C11.6802 9.9136 11.4858 9.87541 11.333 9.83374C11.708 9.3893 11.9962 8.89624 12.1976 8.35457C12.399 7.81291 12.4997 7.25041 12.4997 6.66707C12.4997 6.08374 12.399 5.52124 12.1976 4.97957C11.9962 4.43791 11.708 3.94485 11.333 3.50041C11.5275 3.43096 11.7219 3.38582 11.9163 3.36499C12.1108 3.34416 12.3052 3.33374 12.4997 3.33374C13.4163 3.33374 14.2011 3.66013 14.8538 4.31291C15.5066 4.96568 15.833 5.75041 15.833 6.66707Z"
              fill="#F5FFF9"/>
          </svg>
        } name="ERC-20 user errors" percentage={50}/>
        <LostCard animate={animate} color="#790003" lost={"$326M"} icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <g clip-path="url(#clip0_913_3683)">
              <path
                d="M10 19.9834C7.34992 19.9817 4.80872 18.9288 2.93398 17.0557C1.05924 15.1827 0.00407392 12.6424 0 9.99234C0.00407334 7.34212 1.05918 4.80174 2.93389 2.92848C4.80858 1.05521 7.3498 0.00203392 10 0C12.6502 0.00203392 15.1914 1.05521 17.0662 2.92848C18.9408 4.80174 19.996 7.34212 20 9.99234C19.996 12.6424 18.9408 15.1827 17.066 17.0557C15.1913 18.9288 12.6501 19.9817 10 19.9834ZM10 0.769232C7.55371 0.770926 5.20797 1.74295 3.47745 3.47203C1.74692 5.20111 0.772966 7.54603 0.769232 9.99234C0.771611 12.4389 1.74518 14.7845 3.47603 16.5137C5.20689 18.2429 7.55342 19.2142 10 19.2142C12.4466 19.2142 14.7931 18.2429 16.524 16.5137C18.2548 14.7845 19.2285 12.4389 19.2308 9.99234C19.2271 7.54603 18.2531 5.20111 16.5226 3.47203C14.792 1.74295 12.4463 0.770926 10 0.769232Z"
                fill="white"/>
              <path
                d="M11.2643 18.4022C9.06875 18.4005 6.96349 17.5279 5.41037 15.976C3.85726 14.4241 2.98312 12.3195 2.97974 10.1239C2.98312 7.92833 3.85726 5.82373 5.41037 4.27181C6.96349 2.7199 9.06875 1.8474 11.2643 1.8457C13.4599 1.8474 15.5652 2.7199 17.1183 4.27181C18.6714 5.82373 19.5456 7.92833 19.5489 10.1239C19.5456 12.3195 18.6714 14.4241 17.1183 15.976C15.5652 17.5279 13.4599 18.4005 11.2643 18.4022ZM11.2643 2.44313C9.22732 2.44483 7.27414 3.25444 5.83327 4.69435C4.3924 6.13426 3.58149 8.0869 3.57844 10.1239C3.58183 12.1607 4.39291 14.113 5.83374 15.5527C7.27458 16.9923 9.22754 17.8017 11.2643 17.8034C13.3011 17.8017 15.2541 16.9923 16.6949 15.5527C18.1359 14.113 18.9468 12.1607 18.9503 10.1239C18.9468 8.08712 18.1359 6.1348 16.6949 4.69516C15.2541 3.25553 13.3011 2.44612 11.2643 2.44443V2.44313Z"
                fill="white"/>
              <path
                d="M12.5282 16.8233C10.7873 16.8219 9.11792 16.1301 7.88639 14.8995C6.65486 13.6689 5.96171 12.0001 5.95898 10.2592C5.96171 8.51821 6.65486 6.84941 7.88639 5.61884C9.11792 4.38827 10.7873 3.69642 12.5282 3.69507C14.2693 3.69608 15.9388 4.38782 17.1705 5.61847C18.402 6.8491 19.0951 8.5181 19.0974 10.2592C19.0948 12.0001 18.4015 13.6689 17.17 14.8995C15.9385 16.1301 14.2692 16.8219 12.5282 16.8233ZM12.5282 4.12199C10.9004 4.12301 9.33942 4.76976 8.18788 5.92033C7.03632 7.07091 6.38826 8.63133 6.38589 10.2592C6.3886 11.8868 7.03683 13.4469 8.18834 14.5972C9.33985 15.7474 10.9006 16.3941 12.5282 16.3951C14.1558 16.3941 15.7166 15.7474 16.8682 14.5972C18.0197 13.4469 18.6678 11.8868 18.6706 10.2592C18.6682 8.63133 18.0202 7.07091 16.8686 5.92033C15.7171 4.76976 14.1561 4.12301 12.5282 4.12199Z"
                fill="white"/>
              <path
                d="M13.7923 15.2421C12.506 15.241 11.2725 14.7299 10.3626 13.8206C9.45266 12.9114 8.94051 11.6784 8.93848 10.3921C8.94017 9.10549 9.45218 7.87214 10.3622 6.96265C11.2721 6.05316 12.5057 5.54179 13.7923 5.54077C15.0789 5.54179 16.3125 6.05316 17.2225 6.96265C18.1325 7.87214 18.6444 9.10549 18.6461 10.3921C18.6441 11.6784 18.1319 12.9114 17.2221 13.8206C16.3121 14.7299 15.0787 15.241 13.7923 15.2421ZM13.7923 5.79719C12.5738 5.7982 11.4054 6.28254 10.5435 7.14396C9.68158 8.00537 9.19658 9.17349 9.19489 10.3921C9.19692 11.6104 9.68206 12.7782 10.5439 13.6393C11.4058 14.5005 12.574 14.9846 13.7923 14.9856C15.0106 14.9846 16.1788 14.5005 17.0407 13.6393C17.9025 12.7782 18.3878 11.6104 18.3898 10.3921C18.3881 9.17349 17.9032 8.00537 17.0412 7.14396C16.1793 6.28254 15.0109 5.7982 13.7923 5.79719Z"
                fill="white"/>
            </g>
            <defs>
              <clipPath id="clip0_913_3683">
                <rect width="20" height="20" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        } name="Wormhole hack" percentage={70}/>
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
        <Pattern1 />

      </div>
      <div className={styles.pattern2}>
        <Pattern1 />
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
