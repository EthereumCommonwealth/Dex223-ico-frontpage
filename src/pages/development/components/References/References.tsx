import React, { useEffect, useRef } from "react";
import styles from "./References.module.scss";
import ArticleHeading from "../../../../components/atoms/ArticleHeading";
import Svg from "../../../../components/atoms/Svg";
import clsx from "clsx";
import DevSourcesImage from "../../../../assets/images/dev-src-2.svg";
import NeonBlock from "../../../../components/organisms/NeonBlock";
import { useIntersectionObserver } from "../../../../hooks/useIntersectionObserver";

const references = [
  {
    text: "ICO page source codes",
    href: "https://github.com/Dexaran/Dex223-ICO-page"
  },
  {
    text: "ICO smart-contracts",
    href: "https://github.com/Dexaran/D223ICO"
  },
  {
    text: "Auto-listings smart-contract source code (beta)",
    href: "https://github.com/Dexaran/Dex223-exchange/blob/main/auto-listing.sol"
  },
  {
    text: "ERC-223 hub page",
    href: "https://dexaran.github.io/erc223/"
  },
  {
    text: "ERC-223 page source codes",
    href: "https://github.com/Dexaran/dexaran.github.io/tree/master/erc223-page-sources"
  },
  {
    text: "Token Converter UI (work-in-progress / test version)",
    href: "https://dexaran.github.io/token-converter"
  },
  {
    text: "Token Converter UI source code",
    href: "https://github.com/Dexaran/dexaran.github.io/tree/master/token-converter-sources"
  },
  {
    text: "Token standard converter smart-contract source code (work-in-progress / test version)",
    href: "https://github.com/Dexaran/TokenStandardConverter"
  },
  {
    text: "ERC-20 losses calculator script",
    href: "https://github.com/Dexaran/lost_tokens_react/tree/master"
  },
  {
    text: "ERC-20 losses old version (deprecated)",
    href: "https://dexaran.github.io/erc20_losses/"
  }
];

export default function References({ refEl }) {
  const referencesEntryRef = useRef();
  const referencesEntry = useIntersectionObserver(referencesEntryRef, { threshold: 0.6, freezeOnceVisible: true });

  return <div>
    <div ref={refEl}/>
    <NeonBlock
      icon="references"
      color="green"
      overlineText="References"
      anchor="references"
      leftContent={
        <>
          <div className={styles.paragraphs}>
            <p className={styles.text}>Here you can track the progress:
            </p>
          </div>
          <ul className={styles.problemsList}>
            {references.map((reference) => {
              return <li key={reference.text} className={styles.problemItem}>
                <a target="_blank" href={reference.href} className={styles.problemItemLink}>
                  <span>{reference.text}</span>
                  <Svg iconName="forward"/>
                </a>
              </li>
            })}
          </ul>
        </>
      }
      rightContent={
        <div ref={referencesEntryRef}
             className={clsx(styles.rightContent, referencesEntry?.isIntersecting && "animated")}>
          <DevSourcesImage/>
        </div>
      }
    />
  </div>
}
