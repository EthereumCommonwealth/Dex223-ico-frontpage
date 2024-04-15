import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import React, { ReactNode } from "react";
import ScrollToTopButton from "@/components/organisms/others/ScrollToTopButton";
import Svg from "@/components/atoms/Svg";
import OrderedList from "@/components/static-pages-components/OrderedList";
import StaticNeonBlock from "@/components/static-pages-components/StaticNeonBlock";
import HeadingWithSubheading from "@/components/static-pages-components/HeadingWithSubheading";
import DownloadScanButton from "@/components/static-pages-components/DownloadScanButton";
export default function DeFiAgreementPage() {

  return (
    <>
      <Header/>
      <div className="py-[60px] text-primary-text max-w-[822px] mx-auto">
        <HeadingWithSubheading heading="DeFi Agreement" subheading="DEX223 DeFI Protocol Terms of Service" />
        <DownloadScanButton fileName="DeFi Agreement.pdf" href={encodeURIComponent("/docs/DeFi Agreement.pdf")} />

        <div className="flex flex-col gap-6">
          <StaticNeonBlock title="DeFi Protocol User Agreement" iconName="introduction" text="Welcome to the DeFi Protocol User Agreement (“User Agreement”). This document forms a legally binding contract between you (“User” or “you”) and DEX223 DAO LLC (“we,” “us,” or “our”) regarding your use of the Dex233 DeFi Protocol (“Protocol”). By accessing or utilizing the Protocol, you consent to comply with the terms and conditions outlined herein." />
          <StaticNeonBlock title="1. Definitions" iconName="definitions" text="Protocol: Refers to the decentralized finance platform operated by DEX223 DAO LLC, encompassing all related smart contracts, interfaces, and services.
User: Denotes any individual or entity engaging with or utilizing the Protocol." />
          <StaticNeonBlock title="2. Protocol Usage" iconName="protocol-usage" text={<OrderedList firstIndex={2.1} step={0.1} listItems={[
            "Access Grant: We grant you a non-exclusive, non-transferable, and revocable license to access and use the Protocol strictly for legitimate purposes, subject to the terms of this User Agreement",
            "Legal Compliance: You commit to adhering to all relevant legal standards, regulations, and guidelines while interacting with the Protocol, including adherence to anti money laundering (AML) and know-your-customer (KYC) protocols."
          ]} />} />
          <StaticNeonBlock title="3. Risks and Limitations" iconName="risks" text={<OrderedList firstIndex={3.1} step={0.1} listItems={[
            "As-Is Provision: The Protocol is made available “as is” and “as available,” without any form of warranty, whether explicit, implied, or statutory. We expressly disclaim any warranties of merchantability, fitness for a specific purpose, or non-infringement.",
            "Risk Acknowledgement: You acknowledge the intrinsic risks associated with using the Protocol, including potential smart contract vulnerabilities, the threat of hacking, and the ambiguous nature of regulatory frameworks. You bear full responsibility for these risks."
          ]} />} />
          <StaticNeonBlock title="4. Liability Restrictions" iconName="liability-restrictions" text={<OrderedList firstIndex={4.1} step={0.1} listItems={[
            "Damages Waiver: We will not be liable for any form of indirect, incidental, consequential, special, or punitive damages, including but not limited to loss of profits, data, or goodwill, that arise from your use of the Protocol.",
            "Liability Cap: Our total liability for any claims arising from or related to this User Agreement will not exceed the amount you have paid to access or use the Protocol, if any."
          ]} />} />
          <StaticNeonBlock title="5. Indemnification" iconName="indemnification" text={<OrderedList firstIndex={5.1} step={0.1} listItems={[
            "Your Commitment: You agree to indemnify, defend, and hold harmless DEX223 DAO LLC, its affiliates, directors, officers, employees, agents, and licensors from any claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney’s fees) arising from your use of the Protocol."
          ]} />} />
          <StaticNeonBlock title="6. Legal Governance and Resolution" iconName="legal-governance" text={<OrderedList firstIndex={6.1} step={0.1} listItems={[
            "Applicable Law: This User Agreement shall be governed by the laws of Wyoming, without giving effect to any choice or conflict of law provision or rule.",
            "Arbitration: Any disputes arising under or in connection with this User Agreement shall be resolved through binding arbitration in accordance with the arbitration rules of the American Arbitration Association."
          ]} />}/>
          <StaticNeonBlock title="7. General Provisions" iconName="guide" text={<OrderedList firstIndex={7.1} step={0.1} listItems={[
            "Entire Agreement: This User Agreement represents the complete agreement between you and DEX223 DAO LLC regarding the Protocol and supersedes all prior agreements and understandings, both written and oral.",
            "Severability: Should any part of this User Agreement be held invalid, illegal, or unenforceable, the remaining provisions shall continue in effect. Thank you for joining the DEX223 DeFi Protocol community. Your compliance with this User Agreement ensures a secure and efficient experience for all users."
          ]} />} />
        </div>
      </div>

      <ScrollToTopButton />
      <Footer/>
    </>
  )
}
