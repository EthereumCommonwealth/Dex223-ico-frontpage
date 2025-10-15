import React from "react";

import ArticleHeading from "@/components/ArticleHeading";
import Pattern, { PatternColor } from "@/components/atoms/Pattern";
import Container from "@/components/Container";
import NeonBlock from "@/components/organisms/NeonBlock";
import TeamMemberCard from "@/components/organisms/TeamMemberCard";
import { dexEmailLink } from "@/constants/email";

const team = [
  {
    image: "/images/team/Member=Dexaran.png",
    position: "Co-Founder / CTO",
    name: "Dexaran",
    socials: {
      github: "https://github.com/Dexaran",
      twitter: "http://twitter.com/Dexaran",
      email: dexEmailLink,
    },
  },
  {
    image: "/images/team/Member=Tio Toi.png",
    position: "Co-Founder / Project Manager",
    name: "Tio Toi",
    socials: {
      github: "https://github.com/tiotoi",
      linkedin: "https://www.linkedin.com/in/tio-toi-192279165/",
    },
  },
  {
    image: "/images/team/Member=Randall Roland.png",
    position: "Co-Founder/ Strategic Advisor",
    name: "Randall Roland",
    socials: {
      twitter: "https://twitter.com/docranroland",
      linkedin: "https://www.linkedin.com/in/randall-k-roland-5b53b7142",
      email: "mailto:ranroland@eossupport.io",
    },
  },
  {
    image: "/images/team/Member=Kostya Ostapenko.png",
    position: "Backend Developer",
    name: "Kostya Ostapenko",
    socials: {
      github: "https://github.com/kostya12362",
      linkedin: "https://www.linkedin.com/in/kostya-ostapenko-a677aa160/",
    },
  },
  {
    image: "/images/team/Member=Viktor Peredera.png",
    position: "Web Developer",
    name: "Viktor Peredera",
    socials: {
      github: "https://github.com/Dalcor",
      linkedin: "https://www.linkedin.com/in/viktor-peredera/",
    },
  },
  {
    image: "/images/team/Member=Nadiia Udovychenko.png",
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
    <div>
      <NeonBlock
        icon="team"
        color="blue"
        overlineText="Team"
        anchor="team"
        patterns={
          <>
            <Pattern
              patternColor={PatternColor.BLUE}
              className="w-200 h-200 -right-[711px] top-[300px] -scale-y-100"
            />
            <Pattern
              patternColor={PatternColor.BLUE}
              className="w-250 h-250 -left-[611px] top-[152px] -scale-100"
            />
          </>
        }
        leftContent={
          <div className="mb-9">
            <ArticleHeading text="Meet the Team" />
          </div>
        }
      />
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3 lg:gap-5 md:gap-4 gap-2">
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
    </div>
  );
}
