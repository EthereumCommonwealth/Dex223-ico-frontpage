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
import TextLink from "@/components/atoms/ExternalTextLink";
import { dexEmail, privacyEmail, privacyEmailLink } from "@/constants/email";
export default function DeFiAgreementPage() {
  return (
    <>
      <Header/>
      <div className="py-[60px] text-primary-text max-w-[822px] mx-auto">
        <HeadingWithSubheading heading="Privacy Policy" subheading="Effective Date: March 17, 2024" />
        <DownloadScanButton fileName="Privacy Policy.pdf" href={encodeURIComponent("/docs/Privacy Policy.pdf")} />

        <div className="flex flex-col gap-6">
          <StaticNeonBlock title="Introduction" iconName="introduction" text={
            <span>DEX223 DAO LLC, a United States-based incorporated entity, herein details its practices regarding the collection, use, and sharing of information through its web app (<TextLink isExternal={false} text="dex223.io" href="/" />), official website (<TextLink isExternal={false} text="www.dex223.io" href="/" />), and other associated products and services, collectively referred to as the “Services.” The utilization of the Services implies acceptance of both this Privacy Policy and our Terms of Service.</span>} />
          <StaticNeonBlock title="Executive Overview" iconName="overview" text={<Paragraphs paragraphs={[
            "DEX223 DAO LLC operates under full compliance with United States laws and regulations. Our offerings include the DEX223 Protocol, a suite of censorship-resistant smart contracts available across multiple blockchain layers, which DEX223 DAO LLC does not directly control.",
            "In our operations, we prioritize the non-collection of personal data (e.g., names, addresses, birthdates, email, and IP addresses) related to your interaction with our Services. Instead, we focus on aggregating non-personal data, such as on-chain activities and generic device information, to enhance our offerings without compromising user privacy.",
            "Voluntary submissions for email communications are treated with confidentiality, and assurances are provided against cross-referencing provided emails with other personal identifiers.",
            "Ongoing efforts are made to elevate privacy protections, including the adoption of opt-out mechanisms, privacy-focused tools, and anonymization techniques, empowering users to leverage privacy-enhancing technologies independently.",
            "Privacy Policy Updates will be communicated through revisions to this document."
          ]} />} />
          <StaticNeonBlock title="Information Collection Practices" iconName="collection-practices" text={<Paragraphs paragraphs={[
            "DEX223 DAO LLC is committed to transparency and minimal data collection practices, aligning with our core value of user privacy. Our data collection is limited to:",
            <UnorderedList key="list-1" listItems={[
              "Public blockchain data, utilized for service enhancement and risk mitigation purposes, with reliance on blockchain analytics for wallet screenings. Such data, by nature, does not directly reveal personal identities.",
              "Data from localstorage and tracking technologies, used to tailor user experiences across sessions, is analyzed in aggregate to continuously improve our Services.",
              "Third-party provided data, essential for legal compliance and the safeguarding against misuse of our Services.",
              "Direct submissions through surveys, user studies, and various forms of communication, including job applications, are collected purely for the stated purposes at the time of submission."
            ]} />
          ]} />} />

          <StaticNeonBlock title="Usage of Collected Data" iconName="collected-data" text="Data collected underpins the provision, personalization, and improvement of our Services, as well as customer support enhancements, security measures, and compliance with legal obligations. Aggregate data analysis aids in understanding user interactions for future enhancements." />

          <StaticNeonBlock title="Data Sharing Practices" iconName="share" text={<Paragraphs paragraphs={[
            "Data sharing is restricted to:",
            <UnorderedList key="list-1" listItems={[
              "Necessary operational sharing with service providers and partners for infrastructure and security services.",
              "Legal obligations necessitating data sharing in the context of legal proceedings, compliance, and enforcement of terms and policies.",
              "With explicit consent for purposes beyond the operational scope outlined herein.",
              "Third-Party Data Practices and Security Measures",
              "Utilization of third-party services (e.g., Google) involves data collection through cookies and similar technologies, with opt-out options provided to respect user preferences.",
              "Linkages to external services not governed by this Privacy Policy are made clear, and users are advised to review the privacy practices of such services independently.",
              "DEX223 DAO LLC employs robust security protocols to protect data integrity and confidentiality, acknowledging the inherent risks of internet data transmission."
            ]} />
          ]} />} />

          <StaticNeonBlock title="User Rights and Responsibilities" iconName="user" text="Users of age, as per our Services not targeting children, enjoy rights under various jurisdictions, including data access, correction, and deletion requests, with specific guidelines for California residents under the CCPA and EU citizens under the GDPR." />

          <StaticNeonBlock title="Revisions to This Policy" iconName="revisions" text="Material changes to this Privacy Policy will be communicated through the Services, with continued use after such updates constituting acceptance of the new terms." />

          <StaticNeonBlock title="Contact Information" iconName="email" text={
            <span>For inquiries or concerns regarding this Privacy Policy, please reach out to us at <TextLink text={privacyEmail} href={privacyEmailLink} />.</span>} />
        </div>
      </div>

      <ScrollToTopButton />
      <Footer/>
    </>
  )
}
