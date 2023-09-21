import React from "react";
import styles from "./ContactUs.module.scss";
import ArticleHeading from "../../atoms/ArticleHeading";
import NeonBlock from "../../organisms/NeonBlock";
import ExternalTextLink from "../../atoms/ExternalTextLink";
import Svg from "../../atoms/Svg";

export default function ContactUs() {
  return <NeonBlock
    icon="contact"
    color="green"
    overlineText="Contact Us"
    anchor="contact"
    leftContent={
      <>
        <ArticleHeading text="Get in touch"/>
        <p className={styles.text}>
          To contact us please fill out the form below which sends letters to
          email <ExternalTextLink text="dexaran@ethereumclassic.org" href="mailto:dexaran@ethereumclassic.org"/> or
          Telegram <ExternalTextLink text="@Dexaran" href="https://t.me/Dexaran"/>.
        </p>
        <div className={styles.buttonsWrapper}>
          <a href="mailto:dexaran@ethereumclassic.org">
            <button>
              <span>Write to email</span>
              <Svg iconName="email" />
            </button>
          </a>
          <a href="https://t.me/Dexaran">
            <button>
            <span>
              Write to Telegram
            </span>
              <Svg iconName="telegram" />
            </button>
          </a>
        </div>
        <div className={styles.openSrcInfo}>
            <span className={styles.srcIcon}>
              <Svg iconName="code" />
            </span>
          <span>This page is open-source. You can reuse it in your projects without any restrictions.</span>
        </div>
      </>
    }
    rightContent={
      <div className={styles.rightContent}>
        <img src="/images/tg-contact-us.svg" alt=""/>
      </div>
    }
  />
}
