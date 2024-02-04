import styles from "./Roadmap.module.scss";
import NeonBlock from "@/components/organisms/others/NeonBlock";
import ArticleHeading from "@/components/atoms/ArticleHeading";
import React from "react";
import ExternalTextLink from "@/components/atoms/ExternalTextLink";
import Text from "@/components/atoms/Text";
import Spacer from "@/components/atoms/Spacer";
import clsx from "clsx";

function RoadmapArrow({className}: {className?: string}) {
  return <div className={clsx(className, styles.roadmapArrow)}>
    <div className={styles.arrowLine} />
    <svg className={styles.point} width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.113281L5 3.00003L5.04736e-07 5.88678L2.96079e-07 3.50003L2.08656e-07 2.50003L0 0.113281Z" fill="currentColor"/>
    </svg>
  </div>
}

function LastRowRoadmapArrow({className}: {className?: string}) {
  return <div className={clsx(className, styles.lastRowRoadmapArrow)}>
    <svg className={styles.lastRowArrowPoint} width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.113281L5 3.00003L5.04736e-07 5.88678L2.96079e-07 3.50003L2.08656e-07 2.50003L0 0.113281Z" fill="currentColor"/>
    </svg>
  </div>
}
function SchemeItem({text, lastNoArrow, lastWithArrow, reversedArrow}: {text: string, lastWithArrow?: boolean, lastNoArrow?: boolean, reversedArrow?: boolean}) {
  return <div className={styles.schemeItem}>
    <div className={styles.imageWrapper}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="23" fill="black" stroke="#9576EC" stroke-width="2"/>
        <path d="M18.1258 24.1509C18.5591 23.0509 19.0799 21.9926 19.6883 20.9759C20.2966 19.9593 20.9841 19.0009 21.7508 18.1009L20.4508 17.8259C20.1174 17.7593 19.7924 17.7759 19.4758 17.8759C19.1591 17.9759 18.8841 18.1426 18.6508 18.3759L15.5008 21.5259C15.2508 21.7759 15.1549 22.0759 15.2133 22.4259C15.2716 22.7759 15.4674 23.0176 15.8008 23.1509L18.1258 24.1509ZM32.8258 14.4009C31.0591 14.3176 29.3799 14.6593 27.7883 15.4259C26.1966 16.1926 24.7758 17.2009 23.5258 18.4509C22.7258 19.2509 22.0216 20.1176 21.4133 21.0509C20.8049 21.9843 20.2758 22.9676 19.8258 24.0009C19.7424 24.2176 19.7008 24.4384 19.7008 24.6634C19.7008 24.8884 19.7841 25.0843 19.9508 25.2509L23.0758 28.3759C23.2424 28.5426 23.4383 28.6259 23.6633 28.6259C23.8883 28.6259 24.1091 28.5843 24.3258 28.5009C25.3591 28.0509 26.3424 27.5218 27.2758 26.9134C28.2091 26.3051 29.0758 25.6009 29.8758 24.8009C31.1258 23.5509 32.1341 22.1301 32.9008 20.5384C33.6674 18.9468 34.0091 17.2676 33.9258 15.5009C33.9258 15.3676 33.8924 15.2343 33.8258 15.1009C33.7591 14.9676 33.6758 14.8509 33.5758 14.7509C33.4758 14.6509 33.3591 14.5676 33.2258 14.5009C33.0924 14.4343 32.9591 14.4009 32.8258 14.4009ZM26.4758 21.8509C26.0924 21.4676 25.9008 20.9968 25.9008 20.4384C25.9008 19.8801 26.0924 19.4093 26.4758 19.0259C26.8591 18.6426 27.3299 18.4509 27.8883 18.4509C28.4466 18.4509 28.9174 18.6426 29.3008 19.0259C29.6841 19.4093 29.8758 19.8801 29.8758 20.4384C29.8758 20.9968 29.6841 21.4676 29.3008 21.8509C28.9174 22.2343 28.4466 22.4259 27.8883 22.4259C27.3299 22.4259 26.8591 22.2343 26.4758 21.8509ZM24.1758 30.2009L25.1758 32.5259C25.3091 32.8593 25.5508 33.0593 25.9008 33.1259C26.2508 33.1926 26.5508 33.1009 26.8008 32.8509L29.9508 29.7009C30.1841 29.4676 30.3508 29.1884 30.4508 28.8634C30.5508 28.5384 30.5674 28.2093 30.5008 27.8759L30.2508 26.5759C29.3341 27.3426 28.3716 28.0301 27.3633 28.6384C26.3549 29.2468 25.2924 29.7676 24.1758 30.2009ZM16.0508 28.0509C16.6341 27.4676 17.3424 27.1718 18.1758 27.1634C19.0091 27.1551 19.7174 27.4426 20.3008 28.0259C20.8841 28.6093 21.1758 29.3176 21.1758 30.1509C21.1758 30.9843 20.8841 31.6926 20.3008 32.2759C19.5008 33.0759 18.5549 33.5509 17.4633 33.7009C16.3716 33.8509 15.2758 34.0009 14.1758 34.1509C14.3258 33.0509 14.4799 31.9551 14.6383 30.8634C14.7966 29.7718 15.2674 28.8343 16.0508 28.0509Z" fill="#F5FFF9"/>
      </svg>
      {!lastNoArrow && !lastWithArrow && <RoadmapArrow className={reversedArrow ? styles.reversed : ""} />}
      {lastWithArrow && <LastRowRoadmapArrow />}
    </div>

    <div>
      <Text weight={700} variant={18}>May 2024</Text>
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
        <SchemeItem text="DEX223 platform prototype release (DEX223 exchange, margin trading disabled, auto-listing contracts supported)."/>
        <SchemeItem text="Auto-listing contracts deployment." />
        <SchemeItem text="DEX223 deployment on testnet. Public testing stage & bug bounties launch." />
        <SchemeItem lastWithArrow text="Margin trading module release & testnet deployment." />
        <div />
        <SchemeItem reversedArrow text="DEX223 deployment on EOS EVM & BSC."/>
        <SchemeItem reversedArrow text="DEX223 initial deployment on Ethereum mainnet." />
        <SchemeItem lastNoArrow text="Public testing stage of the margin trading features, security audits & bug bounties." />
      </div>
    </div>
  </>
}
