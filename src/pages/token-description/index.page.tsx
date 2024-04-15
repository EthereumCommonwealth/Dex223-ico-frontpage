import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import React, { ReactNode } from "react";
import ScrollToTopButton from "@/components/organisms/others/ScrollToTopButton";
import Svg from "@/components/atoms/Svg";
import OrderedList from "@/components/static-pages-components/OrderedList";
import StaticNeonBlock from "@/components/static-pages-components/StaticNeonBlock";
import Paragraphs from "@/components/static-pages-components/Paragraphs";
import UnorderedList from "@/components/static-pages-components/UnorderedList";
import HeadingWithSubheading from "@/components/static-pages-components/HeadingWithSubheading";
import DownloadScanButton from "@/components/static-pages-components/DownloadScanButton";
export default function DeFiAgreementPage() {
  return (
    <>
      <Header/>
      <div className="py-[60px] text-primary-text max-w-[822px] mx-auto">
        <HeadingWithSubheading heading="Token Description" subheading="Empowering Decentralized Finance: Unveiling the D223 Utility and Governance Token" />
        <DownloadScanButton fileName="DEX223 DAO LLC Token Description.pdf" href={encodeURIComponent("/docs/DEX223 DAO LLC Token Description.pdf")} />

        <div className="flex flex-col gap-6">
          <StaticNeonBlock title="DEX223 DAO LLC Token Description" iconName="token" text={
            <Paragraphs paragraphs={[
              "Introducing the D223 Utility and Governance Token, a pioneering asset that revolutionizes decentralized finance (DeFi) and governance on the DEX223 platform. Designed to empower token holders, the D223 token combines utility and governance functionalities, offering unprecedented opportunities for participation and revenue generation.",
              "By locking D223 tokens into the smart contract, holders gain exclusive access to the governance mechanisms of the DEX223 platform. This decentralized governance model enables token holders to contribute to decision-making processes, such as protocol upgrades and resource allocation, shaping the future of the platform.",
              "Moreover, D223 token holders enjoy multiple revenue streams, including proceeds from exchange listing fees, trading fees, and liquidity provider (LP) fees. This innovative approach ensures that participants are not only engaged in governance but also incentivized to actively contribute to the ecosystem's growth and sustainability.",
              "The D223 token represents a paradigm shift in DeFi and governance, offering a seamless blend of utility, governance, and financial incentives. With its groundbreaking features and commitment to decentralization, the D223 token paves the way for a more inclusive and equitable financial ecosystem. Join us in harnessing the power of decentralized finance and governance with the D223 token."
            ]} />
          } />
        </div>
      </div>

      <ScrollToTopButton />
      <Footer/>
    </>
  )
}
