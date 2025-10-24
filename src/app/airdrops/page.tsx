import Image from "next/image";

import ExternalTextLink from "@/components/atoms/ExternalTextLink";
import TextLink from "@/components/atoms/TextLink";
import Container from "@/components/Container";
import ScrollToTopButton from "@/components/organisms/ScrollToTopButton";

const upcomingAirdrops = [
  {
    name: "Airdrop#1",
    icon: "/images/tokens/ETH.svg",
  },
];

const shapshotAirdrops = [
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

export default function AirdropsPage() {
  const upcomingSnapshotAirdrops = shapshotAirdrops.filter(
    (airdrop) => airdrop.date > new Date(Date.now()),
  );

  const finishedSnapshotAirdrops = shapshotAirdrops.filter(
    (airdrop) => airdrop.date < new Date(Date.now()),
  );

  return (
    <>
      <div>
        <Container className="3xl:max-w-[1064px] 2xl:max-w-[1064px] lg:max-w-[1064px]">
          <h1 className="text-center text-56 mb-2 mt-[60px]">Airdrops</h1>
          <p className="text-center text-18 text-secondary-text mb-10">
            An airdrop refers to the one-time distribution of tokens to users, often as a reward for
            interacting with a project early on.{" "}
            <TextLink text="Here is a link to how it works." href="" />
          </p>

          <div>
            <div className="bg-quaternary-bg rounded-3 py-[18px] px-5 grid grid-cols-[5fr_5fr_3fr_5fr] text-tertiary-text mb-5">
              <div>Name</div>
              <div>Snapshot date</div>
              <div>Snapshot block</div>
              <div>Link to GitHub</div>
            </div>

            {upcomingAirdrops.map((airdrop, index) => (
              <div
                key={airdrop.name + index}
                className="bg-primary-bg rounded-3 py-[18px] px-5 grid grid-cols-[5fr_5fr_3fr_5fr]"
              >
                <div className="flex items-center gap-2">
                  <Image src={airdrop.icon} alt="" width={32} height={32} />
                  {airdrop.name}
                </div>
                <div className="flex items-center">
                  <div className="border border-secondary-border rounded-20 text-14 px-3 py-1.5">
                    Upcoming
                  </div>
                </div>
                <div></div>
                <div></div>
              </div>
            ))}
            <div className="h-px bg-secondary-border my-5" />
            {upcomingSnapshotAirdrops.map((airdrop, index) => (
              <div
                key={airdrop.name + index}
                className="bg-primary-bg rounded-3 py-[18px] px-5 grid grid-cols-[5fr_5fr_3fr_5fr] "
              >
                <div className="flex items-center gap-2">
                  <Image src={airdrop.icon} alt="" width={32} height={32} />
                  {airdrop.name}
                </div>
                <div className="flex items-center font-bold">
                  {airdrop.date.toLocaleString("en-US", {
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
                  <ExternalTextLink
                    text={"Github announcement"}
                    href={airdrop.githubAnnouncementLink}
                  />
                </div>
              </div>
            ))}
            <div className="h-px bg-secondary-border my-5" />
            {finishedSnapshotAirdrops.map((airdrop, index) => (
              <div
                key={airdrop.name + index}
                className="bg-primary-bg rounded-3 py-[18px] px-5 grid grid-cols-[5fr_5fr_3fr_5fr]"
              >
                <div className="flex items-center gap-2 text-secondary-text">
                  <Image src={airdrop.icon} alt="" width={32} height={32} />
                  {airdrop.name}
                </div>
                <div className="text-tertiary-text flex items-center">
                  {airdrop.date.toLocaleString("en-US", {
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
                  <ExternalTextLink
                    text={"Github announcement"}
                    href={airdrop.githubAnnouncementLink}
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
      <ScrollToTopButton />
    </>
  );
}
