import React from "react";
import styles from "./Philosophy.module.scss";
import NeonBlock from "../../organisms/NeonBlock";
import ArticleHeading from "../../atoms/ArticleHeading";

export default function Philosophy() {
  return <>
    <NeonBlock
      icon={<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path
          d="M24 44C21.2333 44 18.6333 43.475 16.2 42.425C13.7667 41.375 11.65 39.95 9.85 38.15C8.05 36.35 6.625 34.2333 5.575 31.8C4.525 29.3667 4 26.7667 4 24C4 21.2333 4.525 18.6333 5.575 16.2C6.625 13.7667 8.05 11.65 9.85 9.85C11.65 8.05 13.7667 6.625 16.2 5.575C18.6333 4.525 21.2333 4 24 4C26.7667 4 29.3667 4.525 31.8 5.575C34.2333 6.625 36.35 8.05 38.15 9.85C39.95 11.65 41.375 13.7667 42.425 16.2C43.475 18.6333 44 21.2333 44 24C44 26.7667 43.475 29.3667 42.425 31.8C41.375 34.2333 39.95 36.35 38.15 38.15C36.35 39.95 34.2333 41.375 31.8 42.425C29.3667 43.475 26.7667 44 24 44ZM24 40C28.4667 40 32.25 38.45 35.35 35.35C38.45 32.25 40 28.4667 40 24C40 19.5333 38.45 15.75 35.35 12.65C32.25 9.55 28.4667 8 24 8C19.5333 8 15.75 9.55 12.65 12.65C9.55 15.75 8 19.5333 8 24C8 28.4667 9.55 32.25 12.65 35.35C15.75 38.45 19.5333 40 24 40ZM24 36C20.6667 36 17.8333 34.8333 15.5 32.5C13.1667 30.1667 12 27.3333 12 24C12 20.6667 13.1667 17.8333 15.5 15.5C17.8333 13.1667 20.6667 12 24 12C27.3333 12 30.1667 13.1667 32.5 15.5C34.8333 17.8333 36 20.6667 36 24C36 27.3333 34.8333 30.1667 32.5 32.5C30.1667 34.8333 27.3333 36 24 36ZM24 32C26.2 32 28.0833 31.2167 29.65 29.65C31.2167 28.0833 32 26.2 32 24C32 21.8 31.2167 19.9167 29.65 18.35C28.0833 16.7833 26.2 16 24 16C21.8 16 19.9167 16.7833 18.35 18.35C16.7833 19.9167 16 21.8 16 24C16 26.2 16.7833 28.0833 18.35 29.65C19.9167 31.2167 21.8 32 24 32ZM24 28C22.9 28 21.9583 27.6083 21.175 26.825C20.3917 26.0417 20 25.1 20 24C20 22.9 20.3917 21.9583 21.175 21.175C21.9583 20.3917 22.9 20 24 20C25.1 20 26.0417 20.3917 26.825 21.175C27.6083 21.9583 28 22.9 28 24C28 25.1 27.6083 26.0417 26.825 26.825C26.0417 27.6083 25.1 28 24 28Z"
          fill="#F5FFF9"/>
      </svg>}
      color="green"
      overlineText="Our Goals"
      anchor="philosophy"
      leftContent={
        <>
          <ArticleHeading text="Philosophy"/>
          <div className={styles.paragraphs}>
            <p className={styles.text}>Our goal is to build a fully decentralized exchange with an emphasis on security.
              We value the safety of users funds above anything else and we will do anything to prevent any losses that
              may occur either due to a user mistake, hackers attack or any other means.</p>
            <p className={styles.text}>The exchange must be built in a way that will allow all its components and
              processes to operate smoothly independently from the development team which includes (1) smart-contracts,
              (2) listings of new tokens, (3) interface.</p>
            <p className={styles.text}>We are constructing a truly decentralized, unstoppable application that will
              operate forever once launched.</p>
          </div>
        </>
      }
      rightContent={
        <div className={styles.rightBlock}>
          <img src="/images/philosophy.svg" alt=""/>
        </div>
      }
    />
  </>;
}
