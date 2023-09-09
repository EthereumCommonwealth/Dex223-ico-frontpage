import React from "react";
import styles from "./EcosystemProblems.module.scss";
import clsx from "clsx";
import OverlineText from "../OverlineText";

export default function EcosystemProblems() {
  return <div className="container">
    <div className={styles.ecosystemProblems}>
      <div className={styles.sliderContainer}>
        <div className={styles.slides}>
          <div className={styles.slide}>
            <div className={styles.illustration}>

            </div>
            <div className={styles.slideTextContent}>
              <div className={styles.slideText}>
                <OverlineText text="Problem Of Ecosystem" color="purple" />
                <h2 className={styles.sliderHeading}>Security Problems of ERC-20 standard</h2>

                <div className={styles.slideParagraphs}>
                  <p className={styles.primaryParagraph}>
                    ERC-20 standard violates common secure software design principles
                    which resulted in a loss of $201M worth of tokens for the users.
                  </p>
                  <p className={styles.secondaryParagraph}>
                    ERC-20 was designed in 2015. At that time there was a bug in EthereumVM.
                    In order to make tokens not affected by this bug ERC-20 was designed in a clunky
                    way which does not allow for error handling. As the result of impossibility
                    of handling user mistakes $201M worth of ERC-20 tokens were lost.
                  </p>
                  <p className={styles.secondaryParagraph}>
                    ERC-223 is designed with security in mind. ERC-223 would allow to prevent
                    user mistakes and we believe than in the long term a standard
                    that prevents user mistakes and losses of funds will thrive.
                  </p>
                </div>
              </div>
              <div className={styles.navigation}>
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M7.36621 11.6543C7.36621 11.874 7.4541 12.0674 7.62109 12.2344L14.582 19.0459C14.7402 19.2041 14.9336 19.2832 15.1621 19.2832C15.6104 19.2832 15.9619 18.9404 15.9619 18.4834C15.9619 18.2549 15.874 18.0615 15.7334 17.9121L9.33496 11.6543L15.7334 5.39648C15.874 5.24707 15.9619 5.04492 15.9619 4.8252C15.9619 4.36816 15.6104 4.02539 15.1621 4.02539C14.9336 4.02539 14.7402 4.10449 14.582 4.25391L7.62109 11.0742C7.4541 11.2324 7.36621 11.4346 7.36621 11.6543Z" fill="#F5FFF9"/>
                  </svg>
                </button>
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15.9619 11.6543C15.9619 11.874 15.874 12.0674 15.707 12.2344L8.74609 19.0459C8.58789 19.2041 8.39453 19.2832 8.16602 19.2832C7.71777 19.2832 7.36621 18.9404 7.36621 18.4834C7.36621 18.2549 7.4541 18.0615 7.59473 17.9121L13.9932 11.6543L7.59473 5.39648C7.4541 5.24707 7.36621 5.04492 7.36621 4.8252C7.36621 4.36816 7.71777 4.02539 8.16602 4.02539C8.39453 4.02539 8.58789 4.10449 8.74609 4.25391L15.707 11.0742C15.874 11.2324 15.9619 11.4346 15.9619 11.6543Z" fill="#F5FFF9"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.slide}>

          </div>
        </div>
        <div className={styles.indicatorsContainer}>
          {[...Array(7)].map((item, index) => {
            return <div key={index} className={clsx(styles.indicator, index === 2 && styles.activeIndicator)}/>
          })}
        </div>
      </div>
    </div>
  </div>;
}
