"use client";

import clsx from "clsx";
import Image from "next/image";
import React, { useRef } from "react";

import ContactUsImage from "@/assets/images/tg-contact-us.svg";
import ArticleHeading from "@/components/ArticleHeading";
import Svg from "@/components/atoms/Svg";
import TextLink from "@/components/atoms/TextLink";
import NeonBlock from "@/components/organisms/NeonBlock";
import { dexEmail, dexEmailLink, mediaEmail, mediaEmailLink } from "@/constants/email";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const styles: any = {};

export default function Subscription() {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { threshold: 0.8, freezeOnceVisible: true });

  return (
    <div className="relative">
      {/*<div className={styles.pattern}>*/}
      {/*  <Image alt="" src="/images/patterns/green.svg" width={1000} height={1000} />*/}
      {/*</div>*/}
      <NeonBlock
        icon="contact"
        color="green"
        overlineText="Contact Us"
        anchor="contact"
        leftContent={
          <>
            <ArticleHeading text="Get in touch" />
            <div className={styles.texts}>
              <p className={styles.text}>
                Questions regarding the private sales or large-scale purchase proposals:{" "}
                <TextLink text={dexEmail} href={dexEmailLink} />{" "}
              </p>
              <p className={styles.text}>
                Marketing and general inquiries:{" "}
                <TextLink text={mediaEmail} href={mediaEmailLink} />
              </p>
              <p className={styles.text}>
                You can ask your questions in our telegram group where admins will help you to
                connect with the right person:{" "}
                <TextLink href="https://t.me/Dex223_defi" text="https://t.me/Dex223_defi" />
              </p>
            </div>
            <div className={styles.buttonsWrapper}>
              <a href={dexEmailLink}>
                <button>
                  <span>Contact by email</span>
                  <Svg iconName="email" />
                </button>
              </a>
              <a href="https://t.me/Dex223_defi">
                <button>
                  <span>Telegram</span>
                  <Svg iconName="telegram" />
                </button>
              </a>
            </div>
            <div className={styles.openSrcInfo}>
              <span className={styles.srcIcon}>
                <Svg iconName="code" />
              </span>
              <span>
                This page is open-source. You can reuse it in your projects without any
                restrictions.
              </span>
            </div>
          </>
        }
        rightContent={
          <div ref={ref} className={clsx(styles.rightContent, entry?.isIntersecting && "animated")}>
            <Image src={ContactUsImage} alt={""} objectFit="cover" />
          </div>
        }
      />
    </div>
  );
}
