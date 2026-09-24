"use client";

import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useRef } from "react";

import ContactUsImage from "@/assets/images/tg-contact-us.svg";
import ArticleHeading from "@/components/ArticleHeading";
import Svg from "@/components/atoms/Svg";
import NeonBlock from "@/components/organisms/NeonBlock";
import { dexEmailLink } from "@/constants/email";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ContactUsPlane from "@/inlined-svgs/ContactUsPlane";

const styles: any = {};

const contactButtonClassName =
  "bg-green-bg rounded-3 flex justify-center items-center gap-3 text-primary-text w-full h-[60px] font-medium border border-transparent hocus:border-green hocus:bg-green-bg-hover duration-200";

export default function ContactUs() {
  const t = useTranslations("ContactUs");
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { threshold: 0.8, freezeOnceVisible: true });

  return (
    <div className="relative">
      <NeonBlock
        icon="contact"
        color="green"
        overlineText={t("overline")}
        anchor="contact"
        differentColumns
        leftContent={
          <>
            <ArticleHeading text={t("heading")} />
            <div className="flex flex-col gap-2 md:gap-4 lg:gap-5 text-16 lg:text-18 text-secondary-text">
              <p className="text-primary-text/90 text-18 lg:text-20 leading-[1.5]">{t("intro")}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 mt-6 md:mt-10 mb-4 m:mb-5 gap-2">
              <a href={dexEmailLink} className={contactButtonClassName}>
                <span>{t("contactViaEmail")}</span>
                <Svg iconName="email" aria-hidden />
              </a>
              <a
                href="https://t.me/Dex223_defi"
                target="_blank"
                rel="noopener noreferrer"
                className={contactButtonClassName}
              >
                <span>{t("contactViaTelegram")}</span>
                <Svg iconName="telegram" aria-hidden />
              </a>
            </div>
            <div className="rounded-1 bg-primary-bg border-l-4 border-green flex gap-2.5 pl-4 py-2.5 text-secondary-text">
              <span className="relative">
                <Svg iconName="code" />
              </span>
              <span>{t("openSource")}</span>
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
