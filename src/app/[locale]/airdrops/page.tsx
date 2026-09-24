import { useFormatter, useTranslations } from "next-intl";

import Svg from "@/components/atoms/Svg";
import { IconName } from "@/components/atoms/Svg/svgIconsMap";
import Container from "@/components/Container";
import ScrollToTopButton from "@/components/organisms/ScrollToTopButton";
import { clsxMerge } from "@/functions/clsxMerge";

const ANNOUNCEMENTS_URL = "https://t.me/Dex_223";

// Airdrop #1 is planned for November 2026. Only the month is public, so nothing more precise is
// shown. Mid-month in UTC keeps the month stable in every time zone.
const SNAPSHOT_MONTH = new Date(Date.UTC(2026, 10, 15));

const steps: { key: "snapshot" | "announcement" | "distribution"; icon: IconName }[] = [
  { key: "snapshot", icon: "calendar" },
  { key: "announcement", icon: "flag" },
  { key: "distribution", icon: "distribution" },
];

function Glyph({ icon, className }: { icon: IconName; className?: string }) {
  return (
    <span
      aria-hidden
      className={clsxMerge(
        "flex shrink-0 items-center justify-center rounded-3 bg-tertiary-bg text-green shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
        className,
      )}
    >
      <Svg iconName={icon} />
    </span>
  );
}

function Detail({
  icon,
  label,
  value,
  muted,
}: {
  icon: IconName;
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 rounded-4 bg-secondary-bg/60 p-4 md:flex-col md:items-start md:gap-5 md:p-5">
      <Glyph icon={icon} className="size-11" />
      <div className="min-w-0">
        <dt className="text-14 text-tertiary-text">{label}</dt>
        <dd
          className={clsxMerge(
            "mt-0.5 text-18 font-medium text-primary-text",
            muted && "text-secondary-text",
          )}
        >
          {value}
        </dd>
      </div>
    </div>
  );
}

export default function AirdropsPage() {
  const t = useTranslations("Airdrops");
  const format = useFormatter();
  const toBeAnnounced = t("details.toBeAnnounced");

  return (
    <>
      <Container className="3xl:max-w-[1064px] 2xl:max-w-[1064px] lg:max-w-[1064px] pb-[80px] md:pb-[120px]">
        <header className="hero-stagger mx-auto max-w-[40rem] pt-10 pb-10 text-center md:pt-[72px] md:pb-[56px]">
          <h1 className="text-36 font-medium tracking-[-0.02em] text-primary-text md:text-56">
            {t("title")}
          </h1>
          <p className="mt-3 text-16 text-secondary-text md:text-20">{t("subtitle")}</p>
        </header>

        <section
          data-reveal
          aria-labelledby="upcoming-airdrop"
          className="surface rounded-5 p-5 md:p-8"
        >
          <div className="flex items-center gap-4">
            <Glyph icon="token" className="size-12 md:size-[56px]" />
            <h2 id="upcoming-airdrop" className="text-20 font-medium text-primary-text md:text-28">
              {t("name", { number: 1 })}
            </h2>
            <span className="ml-auto inline-flex items-center gap-2 rounded-20 border border-green/30 bg-green-bg px-3 py-1 text-14 text-primary-text">
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-green-hover shadow-[0_0_8px_#A5E7C5]"
              />
              {t("upcoming")}
            </span>
          </div>

          <dl className="mt-6 grid gap-3 md:mt-8 md:grid-cols-3 md:gap-4">
            <Detail
              icon="calendar"
              label={t("details.snapshotDate")}
              value={format.dateTime(SNAPSHOT_MONTH, {
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              })}
            />
            <Detail icon="star" label={t("details.reward")} value={toBeAnnounced} muted />
            <Detail icon="code" label={t("details.snapshotBlock")} value={toBeAnnounced} muted />
          </dl>

          <a
            href={ANNOUNCEMENTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-3 bg-green px-6 text-16 font-medium text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_30px_-12px_rgba(125,164,145,0.75)] transition-colors duration-200 hocus:bg-green-hover md:mt-8 md:inline-flex md:w-auto"
          >
            <Svg iconName="telegram" size={20} aria-hidden />
            {t("followAnnouncements")}
          </a>
        </section>

        <section data-reveal aria-labelledby="how-it-works" className="mt-15 md:mt-[96px]">
          <h2
            id="how-it-works"
            className="mb-6 text-24 font-medium text-primary-text md:mb-8 md:text-32"
          >
            {t("howItWorks.title")}
          </h2>
          <ol data-reveal-stagger className="grid gap-3 md:grid-cols-3 md:gap-4">
            {steps.map(({ key, icon }, index) => (
              <li
                key={key}
                data-reveal
                className="surface surface-hover flex gap-4 rounded-5 p-5 md:flex-col md:gap-6 md:p-6"
              >
                <Glyph icon={icon} className="size-11" />
                <div className="max-w-[65ch]">
                  <h3 className="flex items-baseline gap-2 text-18 font-medium text-primary-text">
                    <span className="text-14 tabular-nums text-tertiary-text">{index + 1}</span>
                    {t(`howItWorks.${key}.title`)}
                  </h3>
                  <p className="mt-1 text-16 text-secondary-text">{t(`howItWorks.${key}.text`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <p
          data-reveal
          className="mt-4 flex items-start gap-3 rounded-4 border border-secondary-border px-5 py-4 text-14 text-secondary-text md:items-center md:text-16"
        >
          <Svg iconName="security" className="shrink-0 text-green" aria-hidden />
          <span className="max-w-[65ch]">{t("safety")}</span>
        </p>

        <section data-reveal aria-labelledby="past-airdrops" className="mt-15 md:mt-[96px]">
          <h2
            id="past-airdrops"
            className="mb-6 text-24 font-medium text-primary-text md:mb-8 md:text-32"
          >
            {t("past.title")}
          </h2>
          <div className="flex flex-col items-center gap-4 rounded-5 border border-dashed border-secondary-border px-6 py-12 text-center md:py-[64px]">
            <span
              aria-hidden
              className="flex size-12 items-center justify-center rounded-full bg-primary-bg text-tertiary-text"
            >
              <Svg iconName="recent-transactions" />
            </span>
            <p className="text-16 text-tertiary-text md:text-18">{t("past.empty")}</p>
          </div>
        </section>
      </Container>
      <ScrollToTopButton />
    </>
  );
}
