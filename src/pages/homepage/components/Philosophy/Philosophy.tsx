import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

import PhilosophyImage from "../../../../assets/images/ph.svg";
import ShieldImage from "../../../../assets/images/Shield.svg";
import ArticleHeading from "../../../../components/atoms/ArticleHeading";
import NeonBlock from "../../../../components/organisms/others/NeonBlock";
import styles from "./Philosophy.module.scss";

export default function Philosophy() {
  const ref = useRef();
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true, threshold: 0.85 });

  const [addAnimation, setAddAnimation] = useState(false);

  useEffect(() => {
    if (entry?.isIntersecting) {
      setAddAnimation(true);
      setTimeout(() => {
        setAddAnimation(false);
      }, 1000);
    }
  }, [entry?.isIntersecting]);

  return (
    <>
      <div className="container_internal" style={{ position: "relative" }}>
        <div className={styles.soyBg}>
          <ShieldImage />
        </div>
      </div>
      <NeonBlock
        icon="target"
        color="green"
        overlineText="Our Goals"
        anchor="philosophy"
        leftContent={
          <>
            <ArticleHeading text="Philosophy" />
            <div className={styles.paragraphs}>
              <p className={styles.text}>
                <span className="bold primary-color">
                  Our goal is to build a fully decentralized exchange with an emphasis on security.
                </span>
                We value the safety of users funds above anything else and we will do anything to
                prevent any losses that may occur either due to a user mistake, hackers attack or
                any other means.
              </p>
              <p className={styles.text}>
                The exchange must be built in a way that will allow all its components and processes
                to operate smoothly independently from the development team which includes (1)
                smart-contracts, (2) listings of new tokens, (3) interface.
              </p>
              <p className={styles.text}>
                We are constructing a{" "}
                <span className="bold primary-color">
                  truly decentralized, unstoppable application
                </span>{" "}
                that will operate forever once launched.
              </p>
            </div>
          </>
        }
        rightContent={
          <div
            ref={ref}
            className={clsx(
              styles.rightBlock,
              entry?.isIntersecting && "animated",
              addAnimation && "removeAfterAnimated",
            )}
          >
            <PhilosophyImage />
          </div>
        }
      />
    </>
  );
}
