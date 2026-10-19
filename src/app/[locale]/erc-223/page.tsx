import { getTranslations, setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";

import OverlineText from "@/components/atoms/OverlineText";
import Svg from "@/components/atoms/Svg";
import { IconName } from "@/components/atoms/Svg/svgIconsMap";
import Container from "@/components/Container";
import { ORGANIZATION_ID, pageUrl } from "@/config/seo";
import { clsxMerge } from "@/functions/clsxMerge";
import { linkTargetProps } from "@/functions/links";
import { Link } from "@/i18n/routing";

// First published and last reviewed. Update DATE_MODIFIED when the facts on this page change.
const DATE_PUBLISHED = "2026-10-18";
const DATE_MODIFIED = "2026-10-18";

const LOSSES_CALCULATOR_URL = "https://dexaran.github.io/erc20-losses/";
const EIP_223_URL = "https://eips.ethereum.org/EIPS/eip-223";
const EIP_7417_URL = "https://eips.ethereum.org/EIPS/eip-7417";

const FAQ_KEYS = ["1", "2", "3", "4", "5", "6"] as const;
const COMPARE_ROWS = ["contract", "deposit", "approvals", "gas", "ether", "status"] as const;

const cardClassName =
  "rounded-5 border border-secondary-border bg-primary-bg p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]";

function Section({
  children,
  alt = false,
  id,
  className,
}: {
  children: ReactNode;
  alt?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={clsxMerge("py-12 lg:py-[88px]", alt && "bg-primary-bg/60", className)}
    >
      <Container className="flex flex-col gap-8 lg:gap-10">{children}</Container>
    </section>
  );
}

function SectionHeading({
  overline,
  title,
  lede,
}: {
  overline: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="flex flex-col gap-4 max-w-[900px]">
      <OverlineText text={overline} color="purple" />
      <h2 className="text-28 lg:text-40 font-semibold tracking-[-0.02em] leading-[1.15] text-primary-text">
        {title}
      </h2>
      {lede && (
        <p className="text-[17px] lg:text-18 leading-[1.65] text-secondary-text max-w-[820px]">
          {lede}
        </p>
      )}
    </div>
  );
}

function IconBox({ icon, tone = "green" }: { icon: IconName; tone?: "green" | "purple" }) {
  return (
    <span
      aria-hidden
      className={clsxMerge(
        "flex size-12 shrink-0 items-center justify-center rounded-3",
        tone === "green" ? "bg-green-bg text-green" : "bg-purple-bg text-erc-223-text",
      )}
    >
      <Svg iconName={icon} />
    </span>
  );
}

function FeatureCard({ icon, title, body }: { icon: IconName; title: string; body: string }) {
  return (
    <div className={clsxMerge(cardClassName, "flex flex-col gap-4")}>
      <IconBox icon={icon} />
      <h3 className="text-20 font-bold text-primary-text">{title}</h3>
      <p className="text-16 leading-[1.6] text-secondary-text">{body}</p>
    </div>
  );
}

const primaryButtonClassName =
  "sheen group inline-flex items-center justify-center gap-1.5 h-12 px-6 rounded-2 text-16 font-medium text-black bg-green shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_30px_-12px_rgba(125,164,145,0.75)] duration-200 hocus:bg-green-hover max-sm:w-full";
const secondaryButtonClassName =
  "group inline-flex items-center justify-center gap-1.5 h-12 px-6 rounded-2 text-16 font-medium text-secondary-text bg-green-bg border border-white/[0.06] duration-200 hocus:border-green hocus:bg-green-bg-hover hocus:text-primary-text max-sm:w-full";

function AppButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: ReactNode;
  primary?: boolean;
}) {
  return (
    <a href={href} className={primary ? primaryButtonClassName : secondaryButtonClassName}>
      {children}
      <Svg
        iconName="forward"
        size={20}
        className="duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}

export default async function Erc223Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Erc223");
  const tSeo = await getTranslations("Erc223.seo");

  const appUrl = (path: string) => `https://app.dex223.io/${locale}/${path}`;
  const url = pageUrl(locale, "erc-223");

  // TechArticle, FAQPage (from the six visible questions) and BreadcrumbList.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        headline: t("hero.title"),
        description: tSeo("description"),
        inLanguage: locale,
        url,
        mainEntityOfPage: url,
        datePublished: DATE_PUBLISHED,
        dateModified: DATE_MODIFIED,
        image: "https://www.dex223.io/social-link.png",
        about: [
          { "@type": "Thing", name: "ERC-223", sameAs: EIP_223_URL },
          { "@type": "Thing", name: "ERC-20", sameAs: "https://eips.ethereum.org/EIPS/eip-20" },
        ],
        author: { "@id": ORGANIZATION_ID },
        publisher: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: FAQ_KEYS.map((key) => ({
          "@type": "Question",
          name: t(`faq.q${key}`),
          acceptedAnswer: { "@type": "Answer", text: t(`faq.a${key}`) },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t("breadcrumb.home"),
            item: pageUrl(locale, ""),
          },
          { "@type": "ListItem", position: 2, name: t("breadcrumb.current"), item: url },
        ],
      },
    ],
  };

  const facts = ["standard", "status", "proposed", "author", "erc20", "approvals"] as const;

  return (
    <>
      <script
        type="application/ld+json"
        // Built from our own messages; "<" is escaped so no text can close the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero: the first paragraph answers the question on its own, for snippets and AI answers. */}
      <section className="pt-10 pb-12 lg:pt-[96px] lg:pb-[96px]">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_470px] lg:gap-16 items-start">
          <div className="flex flex-col gap-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-14 text-tertiary-text">
                <li>
                  <Link prefetch={false} href="/" className="duration-200 hocus:text-primary-text">
                    {t("breadcrumb.home")}
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-secondary-text">
                  {t("breadcrumb.current")}
                </li>
              </ol>
            </nav>
            <OverlineText text={t("hero.overline")} color="purple" />
            <h1 className="text-[38px] leading-[1.15] lg:text-58 lg:leading-[1.12] font-semibold tracking-[-0.025em] text-primary-text">
              {t("hero.title")}
            </h1>
            <p className="text-[17px] lg:text-18 leading-[1.65] text-secondary-text max-w-[640px]">
              {t("hero.answer")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <AppButton href={appUrl("converter")} primary>
                {t("hero.convert")}
              </AppButton>
              <AppButton href={appUrl("swap")}>{t("hero.trade")}</AppButton>
            </div>
          </div>

          <aside className={cardClassName} aria-labelledby="erc223-facts">
            <h2 id="erc223-facts" className="text-20 font-bold text-primary-text">
              {t("facts.title")}
            </h2>
            <dl>
              {facts.map((key) => (
                <div
                  key={key}
                  className="flex gap-4 py-3.5 border-b border-secondary-border last:border-b-0"
                >
                  <dt className="w-[150px] shrink-0 text-14 text-tertiary-text">
                    {t(`facts.${key}Label`)}
                  </dt>
                  <dd
                    className={clsxMerge(
                      "text-14 font-medium",
                      key === "status" ? "text-green" : "text-primary-text",
                    )}
                  >
                    {key === "standard" ? (
                      <a
                        {...linkTargetProps(EIP_223_URL)}
                        href={EIP_223_URL}
                        className="underline decoration-secondary-border underline-offset-4 duration-200 hocus:text-green-hover"
                      >
                        {t(`facts.${key}Value`)}
                      </a>
                    ) : (
                      t(`facts.${key}Value`)
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </Container>
      </section>

      <Section id="how-it-works">
        <SectionHeading overline={t("how.overline")} title={t("how.title")} lede={t("how.lede")} />
        <ol className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          {(["1", "2", "3"] as const).map((n) => (
            <li key={n} className={clsxMerge(cardClassName, "flex flex-col gap-3")}>
              <span
                aria-hidden
                className="flex size-10 items-center justify-center rounded-full bg-purple-bg text-18 font-bold text-erc-223-text"
              >
                {n}
              </span>
              <h3 className="text-20 font-bold text-primary-text">{t(`how.step${n}Title`)}</h3>
              <p className="text-16 leading-[1.6] text-secondary-text">{t(`how.step${n}Body`)}</p>
            </li>
          ))}
        </ol>
        <pre className="rounded-4 border border-secondary-border bg-primary-bg p-6 text-[13px] lg:text-[15px] leading-[1.7] whitespace-pre-wrap break-words overflow-x-auto">
          <code>
            <span className="text-tertiary-text">{`// ${t("how.codeComment")}`}</span>
            {"\n"}
            <span className="text-erc-223-text">
              function tokenReceived(address _from, uint _value, bytes calldata _data) external
              returns (bytes4)
            </span>
            {"\n"}
            <span className="text-tertiary-text">{`// ${t("how.codeNote")}`}</span>
          </code>
        </pre>
      </Section>

      <Section alt id="erc20-problem">
        <SectionHeading overline={t("problem.overline")} title={t("problem.title")} />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_470px] lg:gap-12 items-start">
          <div className="flex flex-col gap-5 text-[17px] leading-[1.65] text-secondary-text">
            <p>{t("problem.p1")}</p>
            <p>{t("problem.p2")}</p>
            <p>{t("problem.p3")}</p>
          </div>
          <div className="flex flex-col gap-3 rounded-5 border border-red-light/70 bg-red-bg p-6">
            <span aria-hidden className="text-primary-text">
              <Svg iconName="warning" size={32} />
            </span>
            <p className="text-[34px] lg:text-[44px] leading-[1.15] font-bold text-red-light">
              $201,690,000
            </p>
            <p className="text-16 leading-[1.6] text-primary-text">{t("problem.statText")}</p>
            <a
              {...linkTargetProps(LOSSES_CALCULATOR_URL)}
              href={LOSSES_CALCULATOR_URL}
              className="text-[15px] font-medium text-red-light duration-200 hocus:text-red-light-hover"
            >
              {t("problem.statLink")} →
            </a>
          </div>
        </div>
      </Section>

      <Section id="comparison">
        <SectionHeading overline={t("compare.overline")} title={t("compare.title")} />
        <div className="rounded-4 border border-secondary-border overflow-hidden">
          <table className="w-full border-collapse text-left max-md:block">
            <thead className="bg-primary-bg max-md:hidden">
              <tr>
                <th
                  scope="col"
                  className="w-[30%] px-6 py-4 text-14 font-medium text-tertiary-text"
                >
                  <span className="sr-only">{t("compare.feature")}</span>
                </th>
                <th scope="col" className="px-6 py-4">
                  <span className="rounded-1 bg-erc-20-bg px-2 py-0.5 text-12 text-erc-20-text">
                    ERC-20
                  </span>
                </th>
                <th scope="col" className="px-6 py-4">
                  <span className="rounded-1 bg-erc-223-bg px-2 py-0.5 text-12 text-erc-223-text">
                    ERC-223
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="max-md:block">
              {COMPARE_ROWS.map((row) => (
                <tr
                  key={row}
                  className="border-t border-secondary-border first:border-t-0 md:first:border-t max-md:block"
                >
                  <th
                    scope="row"
                    className="px-6 pt-4 pb-2 md:py-4 text-16 font-semibold text-primary-text max-md:block"
                  >
                    {t(`compare.${row}Label`)}
                  </th>
                  <td
                    data-label="ERC-20: "
                    className="px-6 py-2 md:py-4 text-16 text-secondary-text max-md:block max-md:before:content-[attr(data-label)]"
                  >
                    {t(`compare.${row}Erc20`)}
                  </td>
                  <td
                    data-label="ERC-223: "
                    className="px-6 pt-2 pb-4 md:py-4 text-16 text-primary-text bg-erc-223-bg max-md:block max-md:before:content-[attr(data-label)]"
                  >
                    {t(`compare.${row}Erc223`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-14 text-tertiary-text">{t("compare.note")}</p>
      </Section>

      <Section alt id="converter">
        <SectionHeading
          overline={t("converter.overline")}
          title={t("converter.title")}
          lede={t("converter.lede")}
        />
        <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          {(["1", "2", "3"] as const).map((n) => (
            <FeatureCard
              key={n}
              icon="swap-horizontal"
              title={t(`converter.card${n}Title`)}
              body={t(`converter.card${n}Body`)}
            />
          ))}
        </div>
      </Section>

      <Section id="dex223">
        <SectionHeading overline={t("dex.overline")} title={t("dex.title")} lede={t("dex.lede")} />
        <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          <FeatureCard
            icon="swap-horizontal"
            title={t("dex.card1Title")}
            body={t("dex.card1Body")}
          />
          <FeatureCard icon="token" title={t("dex.card2Title")} body={t("dex.card2Body")} />
          <FeatureCard icon="auto-listing" title={t("dex.card3Title")} body={t("dex.card3Body")} />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <AppButton href={appUrl("swap")} primary>
            {t("dex.launch")}
          </AppButton>
          <AppButton href={appUrl("converter")}>{t("dex.openConverter")}</AppButton>
        </div>
      </Section>

      <Section alt id="faq" className="[&_.faq-list]:max-w-[840px]">
        <SectionHeading overline={t("faq.overline")} title={t("faq.title")} />
        {/* Native accordion: keyboard accessible, works without JavaScript, and every answer stays
            in the HTML for crawlers. Sharing a name keeps one item open at a time. */}
        <div className="faq-list flex flex-col gap-3">
          {FAQ_KEYS.map((key, i) => (
            <details
              key={key}
              // React 18 types lack the native "name" attribute on <details>.
              {...({ name: "erc223-faq" } as Record<string, string>)}
              open={i === 0}
              className="group rounded-4 border border-secondary-border bg-global-bg open:bg-primary-bg"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="flex-1 text-18 font-semibold text-primary-text">
                  {t(`faq.q${key}`)}
                </h3>
                <Svg
                  iconName="arrow-right-small"
                  className="shrink-0 rotate-90 text-secondary-text duration-200 group-open:-rotate-90"
                />
              </summary>
              <p className="px-6 pb-5 -mt-1 text-16 leading-[1.6] text-secondary-text">
                {t(`faq.a${key}`)}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="sources">
        <SectionHeading overline={t("sources.overline")} title={t("sources.title")} />
        <ul className="flex flex-col gap-3">
          {[
            [EIP_223_URL, t("sources.eip223")],
            [EIP_7417_URL, t("sources.eip7417")],
            [LOSSES_CALCULATOR_URL, t("sources.losses")],
            [`https://blog.dex223.io/${locale}`, t("sources.blog")],
          ].map(([href, label]) => (
            <li key={href}>
              <a
                {...linkTargetProps(href)}
                href={href}
                className="inline-flex items-center gap-2 text-16 font-medium text-green duration-200 hocus:text-green-hover"
              >
                <span aria-hidden>→</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
