import React from "react";
import styles from "./ContactUs.module.scss";
import ArticleHeading from "../../ArticleHeading";
import NeonBlock from "../../organisms/NeonBlock";
import ExternalTextLink from "../../ExternalTextLink";

export default function ContactUs() {
  return <NeonBlock
    icon={<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M4 42C2.9 42 1.95833 41.6083 1.175 40.825C0.391667 40.0417 0 39.1 0 38V10C0 8.9 0.391667 7.95833 1.175 7.175C1.95833 6.39167 2.9 6 4 6H44C45.1 6 46.0417 6.39167 46.825 7.175C47.6083 7.95833 48 8.9 48 10V38C48 39.1 47.6083 40.0417 46.825 40.825C46.0417 41.6083 45.1 42 44 42H4ZM18 28C19.6667 28 21.0833 27.4167 22.25 26.25C23.4167 25.0833 24 23.6667 24 22C24 20.3333 23.4167 18.9167 22.25 17.75C21.0833 16.5833 19.6667 16 18 16C16.3333 16 14.9167 16.5833 13.75 17.75C12.5833 18.9167 12 20.3333 12 22C12 23.6667 12.5833 25.0833 13.75 26.25C14.9167 27.4167 16.3333 28 18 28ZM4.2 38H31.8C30.4 35.5 28.4667 33.5417 26 32.125C23.5333 30.7083 20.8667 30 18 30C15.1333 30 12.4667 30.7083 10 32.125C7.53333 33.5417 5.6 35.5 4.2 38ZM30 22H40C40.5667 22 41.0417 21.8083 41.425 21.425C41.8083 21.0417 42 20.5667 42 20V14C42 13.4333 41.8083 12.9583 41.425 12.575C41.0417 12.1917 40.5667 12 40 12H30C29.4333 12 28.9583 12.1917 28.575 12.575C28.1917 12.9583 28 13.4333 28 14V20C28 20.5667 28.1917 21.0417 28.575 21.425C28.9583 21.8083 29.4333 22 30 22ZM35 17.5L38.7 14.9C38.9667 14.7 39.25 14.675 39.55 14.825C39.85 14.975 40 15.2167 40 15.55C40 15.5833 39.8833 15.8167 39.65 16.25L36.15 18.7C35.7833 18.9667 35.4 19.1 35 19.1C34.6 19.1 34.2167 18.9667 33.85 18.7L30.35 16.25C30.3167 16.2167 30.2 15.9833 30 15.55C30 15.2167 30.15 14.975 30.45 14.825C30.75 14.675 31.0333 14.7 31.3 14.9L35 17.5Z" fill="#F5FFF9"/>
    </svg>}
    color="green"
    overlineText="Contact Us"
    leftContent={
      <>
        <ArticleHeading text="Get in touch" />
        <p className={styles.text}>
          To contact us please fill out the form below which sends letters to
          email <ExternalTextLink text="dexaran@ethereumclassic.org" href="mailto:dexaran@ethereumclassic.org" /> or Telegram <ExternalTextLink text="@Dexaran" href="https://t.me/Dexaran" />.
        </p>
      </>
    }
    rightContent={
      <div style={{paddingTop: 200}}>
        <img src="/images/tg-contact-us.svg" alt=""/>
      </div>
    }
  />
}
