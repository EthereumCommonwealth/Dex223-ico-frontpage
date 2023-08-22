import React from "react";
import styles from "./TeamMemberCard.module.scss";
import Image from "next/image";
import Text from "../Text";
import Spacer from "../Spacer";

interface Props {
  image: string,
  position: string,
  name: string,
  socials: {
    facebook?: string,
    telegram?: string,
    linkedin?: string,
    reddit?: string,
    github?: string
  }
}

const socialIcons = {
  facebook: "/images/socials/facebook.svg",
  linkedin: "/images/socials/linkedin.svg",
  reddit: "/images/socials/reddit.svg",
  telegram: "/images/socials/telegram.svg",
  github: "/images/socials/github.svg"
}


export default function TeamMemberCard({image, position, socials, name}: Props) {
  return <div className={styles.teamMemberCard}>
    <div style={{backgroundImage: `url(${image})`}} className={styles.imageCover} />
    {/*<Image width={421} height={440} src={image} alt={`${name} avatar`} />*/}

    <div className={styles.info}>
      <Text variant={18} color="secondary">{position}</Text>
      <Spacer height={4} />
      <Text variant={24} weight={600}>{name}</Text>
      <Spacer height={16} />
      <div className={styles.socialLinks}>
        {Object.keys(socials).map((key) => {
          return <a className={styles.socialLink} key={key} href={socials[key]}><Image alt="" src={socialIcons[key]} height={24} width={24} /></a>
        })}
      </div>
    </div>
  </div>;
}
