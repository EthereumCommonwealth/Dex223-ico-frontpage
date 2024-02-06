import styles from "./Roadmap.module.scss";
import NeonBlock from "@/components/organisms/others/NeonBlock";
import ArticleHeading from "@/components/atoms/ArticleHeading";
import React from "react";
import ExternalTextLink from "@/components/atoms/ExternalTextLink";
import Text from "@/components/atoms/Text";
import Spacer from "@/components/atoms/Spacer";
import clsx from "clsx";
import { IconName } from "@/components/atoms/Svg/svgIconsMap";
import Svg from "@/components/atoms/Svg";
function SchemeItem({text, date, icon}: {text: string, date: string, icon: IconName}) {
  return <div className={styles.schemeItem}>
    <div className={styles.imageWrapper}>
      <div className={styles.svgWrapper}>
        <Svg iconName={icon} />
      </div>
      <div className={styles.roadmapArrow}>
        <div className={styles.arrowLine} />
        <svg className={styles.point} width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.113281L5 3.00003L5.04736e-07 5.88678L2.96079e-07 3.50003L2.08656e-07 2.50003L0 0.113281Z" fill="currentColor"/>
        </svg>
      </div>
      <div className={styles.lastRowRoadmapArrow}>
        <svg className={styles.lastRowArrowPoint} width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.113281L5 3.00003L5.04736e-07 5.88678L2.96079e-07 3.50003L2.08656e-07 2.50003L0 0.113281Z" fill="currentColor"/>
        </svg>
      </div>
      <div className={styles.leftRoadmapArrow}>
        <svg className={styles.leftRowArrowPoint} width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.113281L5 3.00003L5.04736e-07 5.88678L2.96079e-07 3.50003L2.08656e-07 2.50003L0 0.113281Z" fill="currentColor"/>
        </svg>
      </div>
    </div>

    <div>
      <Text weight={700} variant={18}>{date}</Text>
      <Spacer height={4}/>
      <p className={styles.text}>{text}</p>
    </div>

  </div>
}
export default function Roadmap() {
  return <><NeonBlock
    icon="roadmap"
    color="purple"
    overlineText="Development timeline"
    anchor="roadmap"
    leftContent={
      <>
        <ArticleHeading text="Roadmap"/>
        <div className={styles.paragraphs}>
          <p className={styles.text}>The deployment schedule of the DEX223 platform on other chains will be released
            after the deployment on BSC. You can follow the Roadmap on our <ExternalTextLink text="Github"
                                                                                                href="https://github.com/EthereumCommonwealth/Roadmap/issues/72"/>.
          </p>
        </div>
      </>
    }
  />
    <div className={"container"}>
      <div className={styles.roadmapSchemeContainer}>
        <SchemeItem icon="aggressive" date={"May 2024"} text="DEX223 platform prototype release (DEX223 exchange, margin trading disabled, auto-listing contracts supported)."/>
        <SchemeItem icon="auto-listing" date={"May 2024"} text="Auto-listing contracts deployment." />
        <SchemeItem icon="test" date={"June 2024"} text="DEX223 deployment on testnet. Public testing stage & bug bounties launch." />
        <SchemeItem icon="margin-trading" date={"June - July 2024"} text="Margin trading module release & testnet deployment." />
        <SchemeItem icon="bug" date={"July 2024"} text="Public testing stage of the margin trading features, security audits & bug bounties." />
        <SchemeItem icon="eth" date={"August - September 2024"} text="DEX223 initial deployment on Ethereum mainnet." />
        <SchemeItem icon="eos" date={"October 2024"} text="DEX223 deployment on EOS EVM & BSC."/>
      </div>
    </div>
  </>
}
