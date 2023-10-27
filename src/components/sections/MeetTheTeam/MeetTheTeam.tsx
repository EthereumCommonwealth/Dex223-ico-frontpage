import React from "react";
import styles from "./MeetTheTeam.module.scss";
import ArticleHeading from "../../atoms/ArticleHeading";
import TeamMemberCard from "../../organisms/TeamMemberCard";
import NeonBlock from "../../organisms/NeonBlock";

const team = [
  {
    image: "/images/team/Dexaran.jpg",
    position: "Founder, Smart-contract Developer",
    name: "Dexaran",
    socials: {
      github: "https://github.com/Dexaran",
      twitter: "http://twitter.com/Dexaran",
      email: "mailto:dexaran@ethereumclassic.org"
    }
  },
  {
    image: "/images/team/YuriyKharytoshyn.jpg",
    position: "Adviser, Security Auditor",
    name: "Yuriy Kharytoshyn",
    socials: {
      github: "https://github.com/yuriy77k",
      linkedin: "https://www.linkedin.com/in/yuriy-kharytoshyn-b6b89517b/",
      email: "mailto:yuri@callisto.network"
    }
  },
  {
    image: "/images/team/TioToi.jpg",
    position: "Product manager",
    name: "Tio Toi",
    socials: {
      github: "https://github.com/tiotoi",
      linkedin: "https://www.linkedin.com/in/tio-toi-192279165/"
    }
  },
  {
    image: "/images/team/AleksandrTerekhov.jpg",
    position: "Backend Developer",
    name: "Aleksandr Terekhov",
    socials: {
      github: "http://github.com/Exzender",
      linkedin: "https://www.linkedin.com/in/aleksandr-s-terekhov",
      email: "mailto:suriken@gmail.com"
    }
  },
  {
    image: "/images/team/KostyaOstapenko.jpg",
    position: "Backend Developer",
    name: "Kostya Ostapenko",
    socials: {
      github: "https://github.com/kostya12362",
      linkedin: "https://www.linkedin.com/in/kostya-ostapenko-a677aa160/"
    }
  },
  {
    image: "/images/team/OlegGorbatiuk.jpg",
    position: "Web Developer",
    name: "Oleg Gorbatiuk",
    socials: {
      github: "https://github.com/gorbatiukcom",
      linkedin: "https://www.linkedin.com/in/gorbatiuk/"
    }
  },
  {
    image: "/images/team/ViktorPeredera.jpg",
    position: "Web Developer",
    name: "Viktor Peredera",
    socials: {
      github: "https://github.com/Dalcor",
      linkedin: "https://www.linkedin.com/in/viktor-peredera/"
    }
  },
  {
    image: "/images/team/NadiiaUdovychenko.jpg",
    position: "UI / UX Developer",
    name: "Nadiia Udovychenko",
    socials: {
      linkedin: "https://www.linkedin.com/in/naud"
    }
  }
]

export default function MeetTheTeam() {
  return <>
    <NeonBlock
      icon="team"
      color="blue"
      overlineText="Team"
      leftContent={
        <>
          <ArticleHeading text="Meet the Team" />
        </>
      }
    />
    <div className={"container"}>
      <div className={styles.memberCards}>
        {team.map(({image, position, name, socials}) => {
          return <TeamMemberCard
            key={name}
            image={image}
            position={position}
            name={name}
            socials={socials}
          />
        })}
      </div>
    </div>
  </>
}
