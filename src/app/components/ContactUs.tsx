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
import ContactUsPlane from "@/inlined-svgs/ContactUsPlane";

const styles: any = {};

export default function ContactUs() {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { threshold: 0.8, freezeOnceVisible: true });

  return (
    <div className="relative">
      <NeonBlock
        icon="contact"
        color="green"
        overlineText="Contact Us"
        anchor="contact"
        differentColumns
        leftContent={
          <>
            <ArticleHeading text="Get in touch" />
            <div className="flex flex-col gap-2 md:gap-4 lg:gap-5 text-16 lg:text-18 text-secondary-text">
              <p>We’re here to help you make the most of DEX223.</p>
              <p>
                For marketing and general inquiries, emails:{" "}
                <TextLink text={mediaEmail} href={mediaEmailLink} />.
              </p>
              <p>
                You can also join our{" "}
                <TextLink href="https://t.me/Dex223_defi" text="Telegram group" />, where our admins
                will direct you to the right contact.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 mt-6 md:mt-10 mb-4 m:mb-5 gap-2">
              <a href={dexEmailLink}>
                <button className="bg-green-bg rounded-3 flex justify-center items-center gap-3 text-primary-text w-full h-[60px] font-medium border border-transparent hover:border-green hover:bg-green-bg-hover duration-200">
                  <span>Write to email</span>
                  <Svg iconName="email" />
                </button>
              </a>
              <a href="https://t.me/Dex223_defi">
                <button className="bg-green-bg rounded-3 flex justify-center items-center gap-3 text-primary-text w-full h-[60px] font-medium border border-transparent hover:border-green hover:bg-green-bg-hover duration-200">
                  <span>Write to Telegram</span>
                  <Svg iconName="telegram" />
                </button>
              </a>
            </div>
            <div className="rounded-1 bg-primary-bg border-l-4 border-green flex gap-2.5 pl-4 py-2.5 text-secondary-text">
              <span className="relative">
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
          <div
            ref={ref}
            className={clsx(
              "flex lg:flex-col lg:justify-end items-center h-full group",
              entry?.isIntersecting && "animated",
            )}
          >
            <ContactUsPlane />
          </div>
        }
      />
    </div>
  );
}
