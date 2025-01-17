import React from "react";

import ArticleHeading from "@/components/ArticleHeading";
import Container from "@/components/Container";
import NeonBlock from "@/components/organisms/NeonBlock";
import TeamMemberCard from "@/components/organisms/TeamMemberCard";
import { dexEmailLink } from "@/constants/email";

const team = [
  {
    image: "/images/team/Dexaran.jpg",
    position: "Founder, Smart-contract Developer",
    name: "Dexaran",
    socials: {
      github: "https://github.com/Dexaran",
      twitter: "http://twitter.com/Dexaran",
      email: dexEmailLink,
    },
  },
  {
    image: "/images/team/TioToi.jpg",
    position: "Product manager",
    name: "Tio Toi",
    socials: {
      github: "https://github.com/tiotoi",
      linkedin: "https://www.linkedin.com/in/tio-toi-192279165/",
    },
  },
  // {
  //   image: "/images/team/YuriyKharytoshyn.jpg",
  //   position: "Advisor, Security Auditor",
  //   name: "Yuriy Kharytoshyn",
  //   socials: {
  //     github: "https://github.com/yuriy77k",
  //     linkedin: "https://www.linkedin.com/in/yuriy-kharytoshyn-b6b89517b/",
  //     email: "mailto:yuri@callisto.network"
  //   }
  // },
  {
    image: "/images/team/RandallRoland.jpg",
    position: "Co-Founder/ Strategic Advisor",
    name: "Randall Roland",
    socials: {
      twitter: "https://twitter.com/docranroland",
      linkedin: "https://www.linkedin.com/in/randall-k-roland-5b53b7142",
      email: "mailto:ranroland@eossupport.io",
    },
  },
  {
    image: "/images/team/AleksandrGorbunov.jpg",
    position: "Smart-contract Developer",
    name: "Aleksandr Gorbonov",
    socials: {
      github: "https://github.com",
      twitter: "https://x.com",
      email: "mailto:example@gmail.com",
    },
  },
  {
    image: "/images/team/AleksandrTerekhov.jpg",
    position: "Backend Developer",
    name: "Aleksandr Terekhov",
    socials: {
      github: "http://github.com/Exzender",
      linkedin: "https://www.linkedin.com/in/aleksandr-s-terekhov",
      email: "mailto:suriken@gmail.com",
    },
  },
  {
    image: "/images/team/KostyaOstapenko.jpg",
    position: "Backend Developer",
    name: "Kostya Ostapenko",
    socials: {
      github: "https://github.com/kostya12362",
      linkedin: "https://www.linkedin.com/in/kostya-ostapenko-a677aa160/",
    },
  },
  {
    image: "/images/team/ViktorPeredera.jpg",
    position: "Web Developer",
    name: "Viktor Peredera",
    socials: {
      github: "https://github.com/Dalcor",
      linkedin: "https://www.linkedin.com/in/viktor-peredera/",
    },
  },
  {
    image: "/images/team/NadiiaUdovychenko.jpg",
    position: "UI / UX Developer",
    name: "Nadiia Udovychenko",
    socials: {
      linkedin: "https://www.linkedin.com/in/naud",
      behance: "https://www.behance.net/Na_Ud",
    },
  },
];

export default function Team() {
  return (
    <>
      <NeonBlock
        icon="team"
        color="blue"
        overlineText="Team"
        anchor="team"
        leftContent={
          <div className="mb-9">
            <ArticleHeading text="Meet the Team" />
          </div>
        }
      />
      <Container>
        <div className="grid grid-cols-4 gap-7">
          {team.map(({ image, position, name, socials }) => {
            return (
              <TeamMemberCard
                key={name}
                image={image}
                position={position}
                name={name}
                socials={socials}
              />
            );
          })}
        </div>
      </Container>
    </>
  );
}
