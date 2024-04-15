import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import React, { ReactNode } from "react";
import ScrollToTopButton from "@/components/organisms/others/ScrollToTopButton";
import Svg from "@/components/atoms/Svg";
import OrderedList from "@/components/static-pages-components/OrderedList";
import StaticNeonBlock from "@/components/static-pages-components/StaticNeonBlock";
import Paragraphs from "@/components/static-pages-components/Paragraphs";
import UnorderedList from "@/components/static-pages-components/UnorderedList";
import DownloadScanButton from "@/components/static-pages-components/DownloadScanButton";
import HeadingWithSubheading from "@/components/static-pages-components/HeadingWithSubheading";
export default function DeFiAgreementPage() {
  return (
    <>
      <Header/>
      <div className="py-[60px] text-primary-text max-w-[822px] mx-auto">

        <HeadingWithSubheading heading="Operating Agreement" subheading="Navigating the Decentralized Future: DEX223 DAO LLC Operating Guidelines." />
        <DownloadScanButton fileName="Operating Agreement.pdf" href={encodeURIComponent("/docs/Operating Agreement.pdf")} />

        <div className="flex flex-col gap-6">
          <StaticNeonBlock title="Introduction" iconName="introduction" text={
            <Paragraphs paragraphs={[
              "This Operating Agreement outlines the governance structure and operational guidelines of DEX223 DAO LLC, a Decentralized Autonomous Organization (DAO) registered under the laws of Wyoming, USA. Located at 1603 Capitol Ave Ste 415, Cheyenne, Wyoming 82001-4562, DEX223 DAO LLC is committed to revolutionizing the decentralized exchange landscape by emphasizing security, user autonomy, and adherence to the specific requirements set forth by Wyoming statutes for DAOs.",
              "Pursuant to W.S. 17-31-106(a), this document explicitly states that DEX223 DAO LLC is organized as a Decentralized Autonomous Organization (DAO). This entity operates under a decentralized governance model that utilizes smart contracts for management and operational processes, ensuring transparency, security, and adherence to the foundational principles of a DAO."
            ]} />
          } />

          <StaticNeonBlock title="Notice of Restrictions on Duties and Transfers" iconName="restrictions" text={
            <Paragraphs paragraphs={[
              "In accordance with W.S. 17-31-104(c), DEX223 DAO LLC hereby includes a Notice of Restrictions on Duties and Transfers within this Operating Agreement as follows:",
              "The rights of members in a decentralized autonomous organization may differ materially from the rights of members in other limited liability companies. The Wyoming Decentralized Autonomous Organization Supplement, underlying smart contracts, articles of organization and operating agreement, if applicable, of a decentralized autonomous organization may define, reduce or eliminate fiduciary duties and may restrict transfer of ownership interests, withdrawal or resignation from the decentralized autonomous organization, return of capital contributions and dissolution of the decentralized autonomous organization."
            ]} />
          } />

          <StaticNeonBlock title="Registered Agent" iconName="registered-agent" text="Name: United States Corporation Agents, Inc.
Address: 5830 E 2nd St Suite 8, Casper, WY 82609
Phone: (877) 773-0888" />

          <StaticNeonBlock title="Membership Criteria and Rights" iconName="membership" text="Membership in the DAO LLC is granted to users upon the acquisition of governance tokens D223. Members have voting rights, allowing them to influence decisions on the D223 protocol through a smart-contract-guided process. Every member can propose initiatives for a vote, which, upon approval, are executed as coded in the smart contract. Rights include voting on fees, listing new tokens, and participating in revenue-sharing through the protocol." />
          <StaticNeonBlock title="Governance Structure" iconName="structure" text="The governance and operational management of DEX223 DAO LLC are conducted by its members, with significant decisions facilitated through a transparent, smart contract-guided voting process. In line with W.S. 17-31-104(e), this agreement specifies that the extent of management conducted algorithmically is determined by the coded protocols within our smart contracts, which are designed to automate operations, decision-making processes, and the execution of agreed-upon initiatives, reflecting the decentralized ethos of DEX223 DAO LLC." />
          <StaticNeonBlock title="Roles and Responsibilities" iconName="team" text={<Paragraphs paragraphs={[
            <UnorderedList key={0} listItems={[
              <span key="1"><b className="text-primary-text">Founder:</b> Spearheads the development of the DAO LLC protocol, ensures security, distributes treasury funds, and provides monthly progress reports.</span>,
              <span key="2"><b className="text-primary-text">Co-founder:</b> Initiates the DAO LLC, assembles the Freedom Development Team, oversees marketing strategies, and provides strategic oversight.</span>,
              <span key="3"><b className="text-primary-text">Project Manager:</b> Manages project development, ensuring timely progress and goal adherence.</span>,
              <span key="4"><b className="text-primary-text">The Freedom Development Team:</b> Independent contracted developers building and maintaining the DEX223 protocol.</span>,
            ]} />,
            "The Freedom Development Team is entrusted with building, maintaining, and upgrading the protocol and managing DAO LLC’s intellectual property."
          ]} />} />

          <StaticNeonBlock title="Decision-Making Processes" iconName="decision" text="Decision-making within the DAO LLC is conducted through smart contract-facilitated voting, ensuring transparency and equity. Proposal submission, review, and voting procedures are meticulously outlined, with defined quorum requirements and voting thresholds." />
          <StaticNeonBlock title="Profit Distribution and Financial Management" iconName="distribution" text="The protocol generates revenue for token holders who lock their tokens in a smart contract. Token holders are responsible for paying their Taxes as per their Jurisdiction." />
          <StaticNeonBlock title="Dispute Resolution Mechanisms" iconName="partners" text="The American Arbitration Association will oversee dispute resolution, offering a structured and efficient method for resolving internal conflicts or external disagreements. It will prioritize mediation or arbitration as a cost-effective solution." />

          <StaticNeonBlock title="Amendment Procedures" iconName="amendment" text="Amendments to this Operating Agreement are subject to a structured review process, including announcement, surveying of members, and a mandatory waiting period before conducting a referendum, ensuring all stakeholders have a voice in any changes." />
          <StaticNeonBlock title="Compliance and Legal Requirements" iconName="legal-requirements" text="This Agreement complies with applicable laws and regulations, ensuring the DAO LLC operates within legal bounds and adheres to industry standards. Regular consultations with legal experts safeguard against regulatory risks." />
          <StaticNeonBlock title="Transparency and Accountability" iconName="accountability" text="The DAO LLC is committed to openness, with regular audits, monthly reports, and disclosures made available to all members, supporting a culture of trust and long-term viability." />
          <StaticNeonBlock title="Termination Policy" iconName="termination-policy" text="Once deployed, the DEX223 protocol is designed to be unstoppable. Membership in the DAO LLC ceases when a member disposes of their governance tokens." />
          <StaticNeonBlock title="Tokenomics and Financial Transparency" iconName="financial-transparency" text="The D223 tokenomics model emphasizes fair distribution and revenue sharing among token holders and is committed to financial transparency. Quarterly financial reports detail how funds collected through fundraising are allocated and used." />
          <StaticNeonBlock title="Legal Jurisdiction" iconName="legal-jurisdiction" text="This Operating Agreement and any affiliated activities of the DEX223 DAO LLC are subject to the laws of Wyoming, USA." />
          <StaticNeonBlock title="Smart Contract Information" iconName="smart-contract" text={<Paragraphs paragraphs={[
            "Details regarding ICO, public sales, and token contracts are explicitly documented, providing a clear framework for financial and operational activities within the DAO LLC.",
            <UnorderedList listItems={[
              <span key="1"><b className="text-primary-text">Private sale contract address:</b> <br /> 0x9eb&shy;11e62b&shy;A74366&shy;C5AAA&shy;A7eEc8&shy;50FC31E&shy;7a3aCf1</span>,
              <span key="2"><b className="text-primary-text">Public sale smart contract address:</b> <br /> 0x66&shy;bbbc069&shy;8fd3ac3&shy;c1f8bf6e&shy;2a550&shy;d3775&shy;a68879</span>,
              <span key="3"><b className="text-primary-text">Token contract address:</b> <br />0xcce&shy;968120e&shy;6ded5&shy;6f32fb&shy;fe5a2ec&shy;06cbf1&shy;e7c8ed</span>,
             ]} key="list-1" />,
            "These contracts are publicly available and directly used to manage, facilitate, or operate DEX223 DAO LLC, as required by W.S. 17-31-106(b)."
          ]} />} />

        </div>
      </div>

      <ScrollToTopButton />
      <Footer/>
    </>
  )
}
