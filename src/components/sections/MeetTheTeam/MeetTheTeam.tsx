import React from "react";
import styles from "./MeetTheTeam.module.scss";
import ArticleTitle from "../../atoms/ArticleTitle";
import ArticleHeading from "../../atoms/ArticleHeading";
import Spacer from "../../atoms/Spacer";
import Text from "../../atoms/Text";
import TeamMemberCard from "../../organisms/TeamMemberCard";
import NeonBlock from "../../organisms/NeonBlock";

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
  },
  {
    image: "/images/team/team-1.jpg",
    position: "Chief Executive Officer (CEO)",
    name: "Martin Kravesd",
    socials: {
      facebook: "https://www.facebook.com/victor.peredera",
      github: "https://github.com/Dalcor",
      telegram: "@lusory_see",
    }
  },
  {
    image: "/images/team/team-1.jpg",
    position: "Chief Executive Officer (CEO)",
    name: "Martin Kravses",
    socials: {
      facebook: "https://www.facebook.com/victor.peredera",
      github: "https://github.com/Dalcor",
      telegram: "@lusory_see",
    }
  }
]

export default function MeetTheTeam() {
  return <>
    {/*<NeonBlock*/}
    {/*  icon={<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">*/}
    {/*    <path d="M2 36C1.43333 36 0.958333 35.8083 0.575 35.425C0.191667 35.0417 0 34.5667 0 34V32.85C0 31.3833 0.733333 30.2083 2.2 29.325C3.66667 28.4417 5.6 28 8 28C8.43333 28 8.84167 28.0167 9.225 28.05C9.60833 28.0833 9.98333 28.1333 10.35 28.2C9.88333 28.8667 9.54167 29.5833 9.325 30.35C9.10833 31.1167 9 31.9333 9 32.8V36H2ZM14 36C13.4333 36 12.9583 35.8083 12.575 35.425C12.1917 35.0417 12 34.5667 12 34V32.8C12 30.6333 13.1083 28.875 15.325 27.525C17.5417 26.175 20.4333 25.5 24 25.5C27.6 25.5 30.5 26.175 32.7 27.525C34.9 28.875 36 30.6333 36 32.8V34C36 34.5667 35.8083 35.0417 35.425 35.425C35.0417 35.8083 34.5667 36 34 36H14ZM39 36V32.8C39 31.9333 38.8833 31.1167 38.65 30.35C38.4167 29.5833 38.0833 28.8667 37.65 28.2C38.0167 28.1333 38.3917 28.0833 38.775 28.05C39.1583 28.0167 39.5667 28 40 28C42.4 28 44.3333 28.4417 45.8 29.325C47.2667 30.2083 48 31.3833 48 32.85V34C48 34.5667 47.8083 35.0417 47.425 35.425C47.0417 35.8083 46.5667 36 46 36H39ZM8 26C6.9 26 5.95833 25.6083 5.175 24.825C4.39167 24.0417 4 23.1 4 22C4 20.9 4.39167 19.9583 5.175 19.175C5.95833 18.3917 6.9 18 8 18C9.1 18 10.0417 18.3917 10.825 19.175C11.6083 19.9583 12 20.9 12 22C12 23.1 11.6083 24.0417 10.825 24.825C10.0417 25.6083 9.1 26 8 26ZM40 26C38.9 26 37.9583 25.6083 37.175 24.825C36.3917 24.0417 36 23.1 36 22C36 20.9 36.3917 19.9583 37.175 19.175C37.9583 18.3917 38.9 18 40 18C41.1 18 42.0417 18.3917 42.825 19.175C43.6083 19.9583 44 20.9 44 22C44 23.1 43.6083 24.0417 42.825 24.825C42.0417 25.6083 41.1 26 40 26ZM24 24C22.3333 24 20.9167 23.4167 19.75 22.25C18.5833 21.0833 18 19.6667 18 18C18 16.3333 18.5833 14.9167 19.75 13.75C20.9167 12.5833 22.3333 12 24 12C25.6667 12 27.0833 12.5833 28.25 13.75C29.4167 14.9167 30 16.3333 30 18C30 19.6667 29.4167 21.0833 28.25 22.25C27.0833 23.4167 25.6667 24 24 24Z" fill="#F5FFF9"/>*/}
    {/*  </svg>}*/}
    {/*  color="blue"*/}
    {/*  overlineText="Team"*/}
    {/*  leftContent={*/}
    {/*    <>*/}
    {/*      <ArticleHeading text="Meat the Team" />*/}
    {/*    </>*/}
    {/*  }*/}
    {/*/>*/}
    {/*<div className={"container"}>*/}
    {/*  <div className={styles.memberCards}>*/}
    {/*    {team.map(({image, position, name, socials}) => {*/}
    {/*      return <TeamMemberCard*/}
    {/*        key={name}*/}
    {/*        image={image}*/}
    {/*        position={position}*/}
    {/*        name={name}*/}
    {/*        socials={socials}*/}
    {/*      />*/}
    {/*    })}*/}
    {/*  </div>*/}
    {/*</div>*/}
  </>
}
