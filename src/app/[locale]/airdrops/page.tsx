"use client";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { useMemo } from "react";

import ExternalTextLink from "@/components/atoms/ExternalTextLink";
import TextLink from "@/components/atoms/TextLink";
import Container from "@/components/Container";
import ScrollToTopButton from "@/components/organisms/ScrollToTopButton";
import { useCountdown } from "@/hooks/useCountdown";
import { useNow } from "@/hooks/useNow";

type UpcomingAirdrop = {
  name: string;
  icon: string;
};

type SnapshotAirdrop = {
  name: string;
  icon: string;
  date: Date;
  shapshotBlock: {
    number: number;
    link: string;
  };
  githubAnnouncementLink: string;
};

const upcomingAirdrops: UpcomingAirdrop[] = [
  {
    name: "Airdrop#1",
    icon: "/images/tokens/ETH.svg",
  },
];

const shapshotAirdrops: SnapshotAirdrop[] = [
  {
    name: "Airdrop#1",
    icon: "/images/tokens/ETH.svg",
    date: new Date(Date.now() + 20000),
    shapshotBlock: {
      number: 23471565,
      link: "https://etherscan.io/block/23647593",
    },
    githubAnnouncementLink: "https://github.com/",
  },
  {
    name: "Airdrop#1",
    icon: "/images/tokens/ETH.svg",
    date: new Date(Date.now() - 20000),
    shapshotBlock: {
      number: 23471565,
      link: "https://etherscan.io/block/23647593",
    },
    githubAnnouncementLink: "https://github.com/",
  },
];

function UpcomingAirdropRow({ airdrop }: { airdrop: UpcomingAirdrop }) {
  const t = useTranslations("Airdrops");
  return (
    <div className="bg-primary-bg rounded-3 py-[18px] px-5 grid grid-cols-[5fr_5fr_3fr_5fr]">
      <div className="flex items-center gap-2">
        <Image src={airdrop.icon} alt="" width={32} height={32} />
        {airdrop.name}
      </div>
      <div className="flex items-center">
        <div className="border border-secondary-border rounded-20 text-14 px-3 py-1.5">
          {t("upcoming")}
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}

function UpcomingSnapshotAirdropRow({ airdrop }: { airdrop: SnapshotAirdrop }) {
  const t = useTranslations("Airdrops");
  const format = useFormatter();
  return (
    <div className="bg-primary-bg rounded-3 py-[18px] px-5 grid grid-cols-[5fr_5fr_3fr_5fr] ">
      <div className="flex items-center gap-2">
        <Image src={airdrop.icon} alt="" width={32} height={32} />
        {airdrop.name}
      </div>
      <div className="flex items-center font-bold">
        {format.dateTime(airdrop.date, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>
      <div className="flex items-center">
        <ExternalTextLink
          text={airdrop.shapshotBlock.number}
          href={airdrop.shapshotBlock.link}
          withArrow={false}
        />
      </div>
      <div className="flex items-center">
        <ExternalTextLink text={t("githubAnnouncement")} href={airdrop.githubAnnouncementLink} />
      </div>
    </div>
  );
}

function FinishedSnapshotAirdropRow({ airdrop }: { airdrop: SnapshotAirdrop }) {
  const t = useTranslations("Airdrops");
  const format = useFormatter();
  return (
    <div className="bg-primary-bg rounded-3 py-[18px] px-5 grid grid-cols-[5fr_5fr_3fr_5fr]">
      <div className="flex items-center gap-2 text-secondary-text">
        <Image src={airdrop.icon} alt="" width={32} height={32} />
        {airdrop.name}
      </div>
      <div className="text-tertiary-text flex items-center">
        {format.dateTime(airdrop.date, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>
      <div className="flex items-center">
        <ExternalTextLink
          text={airdrop.shapshotBlock.number}
          href={airdrop.shapshotBlock.link}
          withArrow={false}
        />
      </div>
      <div className="flex items-center">
        <ExternalTextLink text={t("githubAnnouncement")} href={airdrop.githubAnnouncementLink} />
      </div>
    </div>
  );
}

function UpcomingAirdropCard({ airdrop }: { airdrop: UpcomingAirdrop }) {
  const t = useTranslations("Airdrops");
  return (
    <div className="bg-primary-bg rounded-3 p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image src={airdrop.icon} alt="" width={32} height={32} />
        {airdrop.name}
      </div>

      <div className="border border-secondary-border rounded-20 text-14 px-3 py-1.5">
        {t("upcoming")}
      </div>
    </div>
  );
}

function UpcomingSnapshotAirdropCard({ airdrop }: { airdrop: SnapshotAirdrop }) {
  const t = useTranslations("Airdrops");
  const format = useFormatter();
  const countdown = useCountdown(airdrop.date);

  return (
    <div className="bg-primary-bg rounded-3 p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Image src={airdrop.icon} alt="" width={32} height={32} />
        {airdrop.name}
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-tertiary-bg px-4 py-2">
          <p className="text-14 text-tertiary-text">{t("snapshotDate")}</p>
          <p className="font-bold">
            {format.dateTime(airdrop.date, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}{" "}
            <span>({countdown})</span>
          </p>
        </div>
        <div className="bg-tertiary-bg px-4 py-2">
          <p className="text-14 text-tertiary-text">{t("snapshotBlock")}</p>
          <p>
            <ExternalTextLink
              text={airdrop.shapshotBlock.number}
              href={airdrop.shapshotBlock.link}
              withArrow={false}
            />
          </p>
        </div>
        <div className="bg-tertiary-bg px-4 py-2">
          <p className="text-14 text-tertiary-text">{t("snapshotDate")}</p>
          <p>
            <ExternalTextLink
              text={t("githubAnnouncement")}
              href={airdrop.githubAnnouncementLink}
            />
          </p>
        </div>
      </div>
    </div>
  );
}

function FinishedSnapshotCard({ airdrop }: { airdrop: SnapshotAirdrop }) {
  const t = useTranslations("Airdrops");
  const format = useFormatter();
  return (
    <div className="bg-primary-bg rounded-3 p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Image src={airdrop.icon} alt="" width={32} height={32} />
        {airdrop.name}
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-tertiary-bg px-4 py-2">
          <p className="text-14 text-tertiary-text">{t("snapshotDate")}</p>
          <p className="text-tertiary-text">
            {format.dateTime(airdrop.date, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="bg-tertiary-bg px-4 py-2">
          <p className="text-14 text-tertiary-text">{t("snapshotBlock")}</p>
          <p>
            <ExternalTextLink
              text={airdrop.shapshotBlock.number}
              href={airdrop.shapshotBlock.link}
              withArrow={false}
            />
          </p>
        </div>
        <div className="bg-tertiary-bg px-4 py-2">
          <p className="text-14 text-tertiary-text">{t("snapshotDate")}</p>
          <p>
            <ExternalTextLink
              text={t("githubAnnouncement")}
              href={airdrop.githubAnnouncementLink}
            />
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AirdropsPage() {
  const t = useTranslations("Airdrops");
  const now = useNow();

  const upcomingSnapshotAirdrops = useMemo(() => {
    return shapshotAirdrops.filter((airdrop) => airdrop.date.getTime() > now);
  }, [now]);

  const finishedSnapshotAirdrops = useMemo(() => {
    return shapshotAirdrops.filter((airdrop) => airdrop.date.getTime() < now);
  }, [now]);

  return (
    <>
      <div>
        <Container className="3xl:max-w-[1064px] 2xl:max-w-[1064px] lg:max-w-[1064px]">
          <h1 className="text-center md:text-56 mb-2 text-30 md:mt-[60px]">{t("title")}</h1>
          <p className="text-center text-16 md:text-18 text-secondary-text mb-10">
            {t("description")} <TextLink text={t("howItWorksLink")} href="" />
          </p>

          <div className="max-md:hidden mb-10">
            <div className="bg-quaternary-bg rounded-3 py-[18px] px-5 grid grid-cols-[5fr_5fr_3fr_5fr] text-tertiary-text mb-5">
              <div>{t("table.name")}</div>
              <div>{t("snapshotDate")}</div>
              <div>{t("snapshotBlock")}</div>
              <div>{t("table.linkToGithub")}</div>
            </div>
            {!!upcomingAirdrops.length && (
              <>
                {upcomingAirdrops.map((airdrop, index) => (
                  <UpcomingAirdropRow airdrop={airdrop} key={airdrop.name + index} />
                ))}{" "}
                <div className="h-px bg-secondary-border my-5" />
              </>
            )}

            {!!upcomingSnapshotAirdrops.length && (
              <>
                {upcomingSnapshotAirdrops.map((airdrop, index) => (
                  <UpcomingSnapshotAirdropRow airdrop={airdrop} key={airdrop.name + index} />
                ))}
                <div className="h-px bg-secondary-border my-5" />
              </>
            )}

            {!!finishedSnapshotAirdrops.length && (
              <>
                {finishedSnapshotAirdrops.map((airdrop, index) => (
                  <FinishedSnapshotAirdropRow airdrop={airdrop} key={airdrop.name + index} />
                ))}
              </>
            )}
          </div>

          <div className="md:hidden mb-10">
            {!!upcomingAirdrops.length && (
              <>
                <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
                  {upcomingAirdrops.map((airdrop, index) => (
                    <UpcomingAirdropCard airdrop={airdrop} key={airdrop.name + index} />
                  ))}
                </div>
                <div className="h-px bg-secondary-border my-4" />
              </>
            )}

            {!!upcomingSnapshotAirdrops.length && (
              <>
                <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
                  {upcomingSnapshotAirdrops.map((airdrop, index) => (
                    <UpcomingSnapshotAirdropCard airdrop={airdrop} key={airdrop.name + index} />
                  ))}
                </div>
                <div className="h-px bg-secondary-border my-4" />
              </>
            )}

            {!!finishedSnapshotAirdrops.length && (
              <>
                <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
                  {finishedSnapshotAirdrops.map((airdrop, index) => (
                    <FinishedSnapshotCard airdrop={airdrop} key={airdrop.name + index} />
                  ))}
                </div>
              </>
            )}
          </div>
        </Container>
      </div>
      <ScrollToTopButton />
    </>
  );
}
