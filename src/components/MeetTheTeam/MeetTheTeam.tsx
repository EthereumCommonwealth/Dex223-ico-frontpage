import React from "react";
import styles from "./MeetTheTeam.module.scss";
import ArticleTitle from "../ArticleTitle";
import ArticleHeading from "../ArticleHeading";
import Spacer from "../Spacer";
import Text from "../Text";
import TeamMemberCard from "../TeamMemberCard";

const team = [
  {
    image: "/images/team/team-1.jpg",
    position: "Chief Executive Officer (CEO)",
    name: "Martin Graves",
    socials: {
      facebook: "https://www.facebook.com/victor.peredera"
    }
  },
  {
    image: "/images/team/team-1.jpg",
    position: "Chief Executive Officer (CEO)",
    name: "Martin Rraves",
    socials: {
      facebook: "https://www.facebook.com/victor.peredera"
    }
  },
  {
    image: "/images/team/team-1.jpg",
    position: "Chief Executive Officer (CEO)",
    name: "Martin Vraves",
    socials: {
      facebook: "https://www.facebook.com/victor.peredera",
      linkedin: "https://www.linkedin.com/in/viktor-peredera/"
    }
  },
  {
    image: "/images/team/team-1.jpg",
    position: "Chief Executive Officer (CEO)",
    name: "Martin Lraves",
    socials: {
      facebook: "https://www.facebook.com/victor.peredera"
    }
  },
  {
    image: "/images/team/team-1.jpg",
    position: "Chief Executive Officer (CEO)",
    name: "Martin Araves",
    socials: {
      facebook: "https://www.facebook.com/victor.peredera"
    }
  },
  {
    image: "/images/team/team-1.jpg",
    position: "Chief Executive Officer (CEO)",
    name: "Martin Kraves",
    socials: {
      facebook: "https://www.facebook.com/victor.peredera",
      github: "https://github.com/Dalcor",
      telegram: "@lusory_see",
    }
  }
]

export default function MeetTheTeam() {
  return <div className={"container"}>
    <div className={styles.articleInfo}>
      <ArticleTitle text="Team" align="center" />
      <ArticleHeading text="Meat The Team" align="center" />
      <Text tag="p" color="secondary" align={"center"}>With a shared passion for blockchain technology and decentralized finance, our
        team brings diverse skills and expertise to the table, ensuring the success and innovation of our project.</Text>
    </div>
    <Spacer height={60} />
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
  </div>;
}
