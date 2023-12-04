import React, { useRef } from "react";
import styles from "./Fight.module.scss";
import ArticleHeading from "../../../../components/atoms/ArticleHeading";
import NeonBlock from "../../../../components/organisms/others/NeonBlock";
import ExternalTextLink from "../../../../components/atoms/ExternalTextLink";
import Svg from "../../../../components/atoms/Svg";
import FightImage from "../../../../assets/images/fight.svg";
import clsx from "clsx";
import { useIntersectionObserver } from "../../../../hooks/useIntersectionObserver";
import Image from "next/image";

const problems = [
  {
    text: "The problem was first reported in 2017 and there were about $10,000 lost at that moment",
    href: "https://www.reddit.com/r/ethereum/comments/60ql37/attention_be_careful_using_ethereum_tokens/"
  },
  {
    text: "There was a discussion regarding this problem with Ethereum Foundation members, there were $13,000 lost at that moment",
    href: "https://www.reddit.com/r/ethereum/comments/66gr2a/metropolis_and_erc23_request_for/"
  },
  {
    text: "The problem was reported during ERC-20 standard finalization, there were $16,000 lost ethereum/EIPs#610 (comment)",
    href: "https://github.com/ethereum/EIPs/pull/610#issuecomment-296711733"
  },
  {
    text: "By 2018 the amount of lost tokens has grown to $1,000,000",
    href: "https://www.reddit.com/r/ethereum/comments/7mea1c/erc20_anniversary_new_ath_reached_1_000_000_lost/"
  },
  {
    text: "Fabian Vogelsteller, the creator of ERC-20 decided not to use this standard in his new project LUKSO",
    href: "https://twitter.com/feindura/status/1676623784726470658"
  },
  {
    text: "In 2023 the amount of lost tokens has grown to $201,000,000",
    href: "https://gist.github.com/Dexaran/40213a04ce46b394279ac7daa581ce87"
  }
]

export default function Fight() {
  const ref = useRef();

  const entry = useIntersectionObserver(ref, { threshold: 0.4, freezeOnceVisible: true });

  return <NeonBlock
    icon="fight"
    color="green"
    overlineText="Fight"
    leftContent={
      <>
        <ArticleHeading text="ERC-20 vs ERC-223 fight"/>
        <h4 className={styles.subheading}>
          Unveil the full history of ERC-223 vs ERC-20 fight going since 2017 <ExternalTextLink text="here"
                                                                                                href="https://dexaran.github.io/erc223"/>
        </h4>
        <div className={styles.paragraphs}>
          <p className={styles.text}>Tokens and plain ether are deposited differently to &quot;Externally Owner
            Addresses&quot; (addresses owned by humans) and to smart-contracts. Ether and ERC-223 tokens automatically
            determine if the recipient of the deposit is a contract or EOA and decide the method of deposit accordingly.
            ERC-20 tokens however place the burden of determining the transferring method on the user. Even worse, if
            the ERC-20 token transferring method is chosen incorrectly, this results in the loss of tokens due to the
            impossibility of error handling with ERC-20 standard.</p>
          <p className={styles.text}>This problem of ERC-20 standard is widely known:</p>
        </div>
        <ul className={styles.problemsList}>
          {problems.map((problem) => {
            return <li key={problem.text} className={styles.problemItem}>
              <a target="_blank" href={problem.href} className={styles.problemItemLink}>
                <span>{problem.text}</span>
                <Svg iconName="forward"/>
              </a>
            </li>
          })}
        </ul>
      </>
    }
    rightContent={
      <div ref={ref} className={clsx(styles.rightContent, entry?.isIntersecting && "animated")}>
        <div className="relative">
          <FightImage />
          <Image src="/images/fight-bg.png" alt="ERC-20 vs ERC223 Fight" layout="fill" />
        </div>
      </div>
    }
  />
}
