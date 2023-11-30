import React from "react";
import styles from "./TeamMemberCard.module.scss";

interface Props {
  image: string,
  position: string,
  name: string,
  socials: {
    facebook?: string,
    telegram?: string,
    linkedin?: string,
    reddit?: string,
    github?: string,
    behance?: string
  }
}

const socialIcons = {
  facebook: "/images/socials/facebook.svg",
  linkedin: "/images/socials/linkedin.svg",
  reddit: "/images/socials/reddit.svg",
  telegram: "/images/socials/telegram.svg",
  github: "/images/socials/github.svg",
  twitter: "/images/socials/twitter.svg",
  email: "/images/socials/email.svg",
  behance: "/images/socials/behance.svg"
}


export default function TeamMemberCard({ image, position, socials, name }: Props) {
  return <div className={styles.teamMemberCard}>
    <div style={{ backgroundImage: `url(${image})` }} className={styles.imageCover}/>

    <div className={styles.info}>
      <span className={styles.position}>{position}</span>
      <div className={styles.nameAndSocials}>
        <span className={styles.name}>{name}</span>
        <div className={styles.socialLinks}>
          {Object.keys(socials).map((key) => {
            return <a target="_blank" className={styles.socialLink} key={key} href={socials[key]}><img alt=""
                                                                                                       src={socialIcons[key]}/></a>
          })}
        </div>
      </div>

    </div>
  </div>;
}
