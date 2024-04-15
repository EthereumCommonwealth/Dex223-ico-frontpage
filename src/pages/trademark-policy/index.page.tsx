import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import React from "react";
import ScrollToTopButton from "@/components/organisms/others/ScrollToTopButton";
import Svg from "@/components/atoms/Svg";
import StaticNeonBlock from "@/components/static-pages-components/StaticNeonBlock";
import Paragraphs from "@/components/static-pages-components/Paragraphs";
import UnorderedList from "@/components/static-pages-components/UnorderedList";
import HeadingWithSubheading from "@/components/static-pages-components/HeadingWithSubheading";
import DownloadScanButton from "@/components/static-pages-components/DownloadScanButton";
import TextLink from "@/components/atoms/ExternalTextLink";
import { legalEmail, legalEmailLink } from "@/constants/email";
export default function DeFiAgreementPage() {
  return (
    <>
      <Header/>
      <div className="py-[60px] text-primary-text max-w-[822px] mx-auto">
        <HeadingWithSubheading heading="Trademark Policy" subheading="Ensuring Proper Usage: DEX223 DAO LLC Trademark Guidelines." />
        <DownloadScanButton fileName="Trademark Policy.pdf" href={encodeURIComponent("/docs/Trademark Policy.pdf")} />

        <div className="flex flex-col gap-6">
          <StaticNeonBlock title="DEX223 DAO LLC Trademark Guidelines" iconName="TM" text="DEX223 DAO LLC proudly presents the DEX223 protocol as well as a suite of additional software solutions, under the framework of open-source and source-available licenses. It is important to clarify that these licenses do not extend to the use of our trademarks. The correct application of our trademarks is critical for denoting DEX223 DAO LLC’s endorsement or association with any given product or service. Therefore, adherence to the DEX223 DAO LLC Trademark Guidelines is mandatory for anyone wishing to use our trademarks, reflecting our commitment, akin to other open-source projects, to safeguarding our trademarks to protect our user base." />
          <StaticNeonBlock title="Scope of Policy" iconName="scope-of-policy" text="This guideline covers all trademarks and service marks owned by DEX223 DAO LLC, irrespective of their registration status. This includes:
Trademarks and service marks: DEX223®, DEX™, and DEX223 DAO LLC™ (“DEX223 wordmarks”)." />
          <StaticNeonBlock title="DEX223 logos" iconName="reports" text={
            <span>For reports of any misuse of DEX223 DAO LLC trademarks, please contact us at <TextLink text={legalEmail} href={legalEmailLink} />.</span>
          } />
          <StaticNeonBlock title="Authorized Uses" iconName="thumb-up" text={<Paragraphs paragraphs={[
            "DEX223 DAO LLC allows the use of its trademarks without explicit permission for specific purposes:",
            <UnorderedList key="list-1" listItems={[
              "Referencing or linking to DEX223's unmodified smart contracts, protocols, interfaces, programs, products, services, and technologies (“DEX223 software”) using DEX223 wordmarks in text.",
              "Describing modifications made to DEX223 software with statements like “This software is derived from DEX223 software.” or “This service utilizes software derived from DEX223 software.",
              "Incorporating DEX223 logos within software or platforms that integrate DEX223 software to correctly reference and, where possible, link to DEX223 software hosted on the Ethereum blockchain.",
              "Using DEX223 wordmarks to distinctly communicate no affiliation or endorsement by DEX223 DAO LLC.",
              "Adhering to the open-source license terms associated with DEX223 software."
            ]} />
          ]} />} />
          <StaticNeonBlock title="Guidelines for Trademark Usage" iconName="guide" text={<Paragraphs paragraphs={[
            "When leveraging a DEX223 DAO LLC trademark, please observe the following:",
            <UnorderedList key="list-1" listItems={[
              "Attribution of the trademark must be clearly included at the first or most prominent mention of the mark in any webpage, document, or documentation, as follows: “[DEX223 DAO LLC trademark] is a trademark of DEX223 DAO LLC.”",
              "DEX223 logos are not to be altered, with the exception of resizing for clear visibility and distinct presentation.",
              "DEX223 wordmarks must retain their precise form and accurate spelling without being abbreviated, hyphenated, or combined with other words.",
              "DEX223 wordmarks are to be employed solely as adjectives, not as nouns, verbs, or in plural or possessive forms, and should be followed by a generic descriptor for the product or service, e.g., “DEX223 protocol” or “DEX223 interface.”",
              "Usage of a DEX223 DAO LLC trademark in any other manner requires our prior written consent."
            ]} />,
            <span key="0">For more details, contact <TextLink text={legalEmail} href={legalEmailLink} />.</span>
          ]} />} />
          <StaticNeonBlock title="Restrictions" iconName="restrictions" text={<Paragraphs paragraphs={[
            "Users should refrain from:",
            <UnorderedList key="list-1" listItems={[
              "Using our trademarks in deceptive or fraudulent activities.",
              "Incorporating DEX223 DAO LLC trademarks in your smart contracts, interfaces, businesses, products, services, apps, domain names, publications, or any other offerings.",
              "Misrepresenting affiliation or endorsement with your products or services through DEX223 DAO LLC trademarks, such as suggesting compatibility with DEX223 software by naming your project Dex-[Something] or [Something]-dex.",
              "Placing undue emphasis on our trademarks over your product, service, or company name.",
              "Creating or using names overly similar to DEX223 DAO LLC trademarks, potentially leading to user confusion."
            ]} />,
            "For more details, contact legal@dex223.io."
          ]} />} />
          <StaticNeonBlock title="Concerning Third-Party Trademarks" iconName="third-party" text="DEX223 DAO LLC oversees one of many interfaces to access the DEX223 protocol, which is beyond our direct control. The introduction of tokens to the DEX223 protocol by third-party developers, potentially infringing on others’ trademarks, is outside our ability to prevent. However, upon notification of trademark misuse, DEX223 DAO LLC commits to engaging with trademark owners to review such allegations and may consequently remove offending content from the DEX223 DAO LLC interface." />

        </div>
      </div>

      <ScrollToTopButton />
      <Footer/>
    </>
  )
}
