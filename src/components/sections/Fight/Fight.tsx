import React from "react";
import styles from "./Fight.module.scss";
import ArticleHeading from "../../atoms/ArticleHeading";
import NeonBlock from "../../organisms/NeonBlock";
import ExternalTextLink from "../../atoms/ExternalTextLink";

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
  return <NeonBlock
    icon={<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M38.1 43.2008L32.25 37.4008L27.85 41.8008L26.45 40.4008C25.6833 39.6341 25.3 38.6841 25.3 37.5508C25.3 36.4174 25.6833 35.4674 26.45 34.7008L34.9 26.2508C35.6667 25.4841 36.6167 25.1008 37.75 25.1008C38.8833 25.1008 39.8333 25.4841 40.6 26.2508L42 27.6508L37.6 32.0508L43.4 37.9008C43.8 38.3008 44 38.7674 44 39.3008C44 39.8341 43.8 40.3008 43.4 40.7008L40.9 43.2008C40.5 43.6008 40.0333 43.8008 39.5 43.8008C38.9667 43.8008 38.5 43.6008 38.1 43.2008ZM44 11.8008L21.3 34.5008L21.55 34.7008C22.3167 35.4674 22.7 36.4174 22.7 37.5508C22.7 38.6841 22.3167 39.6341 21.55 40.4008L20.15 41.8008L15.75 37.4008L9.9 43.2008C9.5 43.6008 9.03333 43.8008 8.5 43.8008C7.96667 43.8008 7.5 43.6008 7.1 43.2008L4.6 40.7008C4.2 40.3008 4 39.8341 4 39.3008C4 38.7674 4.2 38.3008 4.6 37.9008L10.4 32.0508L6 27.6508L7.4 26.2508C8.16667 25.4841 9.11667 25.1008 10.25 25.1008C11.3833 25.1008 12.3333 25.4841 13.1 26.2508L13.3 26.5008L36 3.80078H44V11.8008ZM13.9 21.7008L4 11.8008V3.80078H12L21.9 13.7008L13.9 21.7008Z" fill="#F5FFF9"/>
    </svg>}
    color="green"
    overlineText="Fight"
    leftContent={
      <>
        <ArticleHeading text="ERC-20 vs ERC-223 fight" />
        <h4 className={styles.subheading}>
          Unveil the full history of ERC-223 vs ERC-20 fight going since 2017 <ExternalTextLink text="here" href="https://dexaran.github.io/erc223" />
        </h4>
        <div className={styles.paragraphs}>
          <p className={styles.text}>Tokens and plain ether are deposited differently to &quot;Externally Owner Addresses&quot; (addresses owned by humans) and to smart-contracts. Ether and ERC-223 tokens automatically determine if the recipient of the deposit is a contract or EOA and decide the method of deposit accordingly. ERC-20 tokens however place the burden of determining the transferring method on the user. Even worse, if the ERC-20 token transferring method is chosen incorrectly, this results in the loss of tokens due to the impossibility of error handling with ERC-20 standard.</p>
          <p className={styles.text}>This problem of ERC-20 standard is widely known:</p>
        </div>
        <ul className={styles.problemsList}>
          {problems.map((problem) => {
            return <li key={problem.text} className={styles.problemItem}>
              <a target="_blank" href={problem.href} className={styles.problemItemLink}>
                <span>{problem.text}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18.2227 14.8799C18.2227 15.1201 18.1406 15.3193 17.9766 15.4775C17.8184 15.6357 17.6338 15.7148 17.4229 15.7148C17.2061 15.7148 17.0186 15.6328 16.8604 15.4688C16.708 15.3047 16.6318 15.1201 16.6318 14.915V11.6631L16.79 7.55859L15.3398 9.20215L6.6123 17.9209C6.4541 18.0791 6.26953 18.1582 6.05859 18.1582C5.91211 18.1582 5.77734 18.1201 5.6543 18.0439C5.53125 17.9678 5.43164 17.8682 5.35547 17.7451C5.2793 17.6162 5.24121 17.4814 5.24121 17.3408C5.24121 17.1357 5.32324 16.9512 5.4873 16.7871L14.1973 8.05957L15.832 6.62695L11.543 6.76758H8.48438C8.2793 6.76758 8.09473 6.69141 7.93066 6.53906C7.77246 6.38086 7.69336 6.19629 7.69336 5.98535C7.69336 5.77441 7.76953 5.58984 7.92188 5.43164C8.07422 5.26758 8.27344 5.18555 8.51953 5.18555H17.3613C17.625 5.18555 17.833 5.26465 17.9854 5.42285C18.1377 5.58105 18.2139 5.78613 18.2139 6.03809L18.2227 14.8799Z" fill="currentColor"/>
                </svg>
              </a>
            </li>
          })}
        </ul>
      </>
    }
    rightContent={
      <div className={styles.rightContent}>
        <img style={{width: "100%"}} src="/images/fight.png" alt=""/>
      </div>
    }
  />
}
