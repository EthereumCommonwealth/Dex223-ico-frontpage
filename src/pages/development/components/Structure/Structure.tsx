import React, { useEffect, useRef } from "react";
import styles from "./Structure.module.scss";
import NeonBlock from "../../../../components/organisms/NeonBlock";
import ArticleHeading from "../../../../components/atoms/ArticleHeading";
import clsx from "clsx";
import CubeImage from "../../../../assets/images/cube.svg";

export default function Structure({ refEl }) {
  const structureEntryRef = useRef();

  return <div>
    <div ref={refEl} className={styles.topRef}/>
    <NeonBlock anchor="structure" noAnimation onlyBottom icon="architecture" color="purple" overlineText="Structure"
               leftContent={
                 <>
                   <div className={styles.paragraphs}>
                     <p className={styles.text}>Dex223 will consists of multiple components:</p>
                     <ul>
                       <li className={styles.text}><b>Dex223 smart-contract</b>, the main logic of the exchange.</li>
                       <li className={styles.text}><b>Dex223 web interface.</b> There will be
                         an &quot;official&quot; version of the UI developed by the exchange team. There can be any
                         number of competing UIs as anyone can develop an interface that will interact with the
                         contract.
                       </li>
                       <li className={styles.text}><b>Auto-listing smart-contracts.</b> There will be at least
                         three &quot;default&quot; auto-listing smart-contracts with different fee settings. Dex223 UI
                         can automatically pull tokens from the auto-listing contracts when a user decides to enable it.
                         This means that after paying a specified fee any token can be listed and will become available
                         for trading instantly. A user can turn off &qout;auto-listing contracts&qout; at any moment
                         which will remove the auto-listed tokens from the UI. It is not possible to delist a token from
                         the auto-listing contract however.
                       </li>
                       <li className={styles.text}><b>Arbitrary auto-listing contracts.</b> Not only the development
                         team but anyone will be allowed to deploy a copy of an auto-listing contract with customizable
                         rules. These third party contracts can feed tokens into the Dex223 UI in a similar way as
                         default auto-listing contracts. A user would need to copy&paste the address of the third party
                         auto-listing contract in order to pull the tokens from it. Auto-listing contract source codes
                         will be publicly available to anyone.
                       </li>
                       <li className={styles.text}><b>Auto-liquidation bots.</b> Liquidation must be manually triggered
                         by lenders in Dex223. However, the lender can specify a % fee to be paid to anyone who calls
                         the liquidation function, which allows third-party liquidation bots to run and monitor
                         positions susceptible to liquidated. An example of such script will be developed and provided
                         by the exchange team.
                       </li>
                     </ul>
                     <p className={styles.text}>ERC-223 ecosystem. This services are not a part of Dex223 exchange but
                       their purpose is to boost the adoption of ERC-223 standard:</p>
                     <ul>
                       <li className={styles.text}><b>Token Standard Converter.</b> A smart-contract service that will
                         make ERC-20 and ERC-223 tokens interoperable. Any ERC-20 token can be converted to ERC-223
                         version. Any ERC-223 token can be converted to ERC-20 version.
                       </li>
                       <li className={styles.text}><b>ERC-20 losses calculator.</b> We are building a script that will
                         calculate the amount of &quot;lost&quot; tokens realtime. A live demonstration of the scale of
                         the problems with the old standard.
                       </li>
                       <li className={styles.text}><b>ERC-223 aggregation page.</b> A hub for all the upcoming ERC-223
                         development guidelines, articles, reference source codes and a record of its development
                         history.
                       </li>
                     </ul>
                   </div>
                 </>
               }
               rightContent={
                 <div ref={structureEntryRef} className={clsx(styles.rightContent, "animated")}>
                   <CubeImage/>
                 </div>
               }
    />
  </div>
}
