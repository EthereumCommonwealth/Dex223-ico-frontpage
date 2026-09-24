"use client";
import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useRef } from "react";

import CubeImage from "@/assets/images/cube.svg";
import BulletListItem from "@/components/atoms/BulletListItem";
import NeonBlock from "@/components/organisms/NeonBlock";
export default function Structure({ refEl }) {
  const t = useTranslations("Development");
  const structureEntryRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <div ref={refEl} />
      <NeonBlock
        differentColumns
        anchor="structure"
        noAnimation
        onlyBottom
        icon="architecture"
        color="purple"
        overlineText={t("structure.overline")}
        leftContent={
          <div className="flex flex-col gap-5">
            <p className="text-18 lg:text-24 text-primary-text mb-4 font-semibold">
              {t("structure.heading")}
            </p>
            <ul className="text-secondary-text text-16 lg:text-18 flex flex-col gap-2">
              <BulletListItem>
                <b className="text-primary-text">{t("structure.items.smartContract.title")}</b>
                <br />
                {t("structure.items.smartContract.description")}
              </BulletListItem>
              <BulletListItem>
                <b className="text-primary-text">{t("structure.items.webInterface.title")}</b>
                <br />
                {t("structure.items.webInterface.description")}
              </BulletListItem>
              <BulletListItem>
                <b className="text-primary-text">{t("structure.items.autoListing.title")}</b>
                <br />
                {t("structure.items.autoListing.description")}
              </BulletListItem>
              <BulletListItem>
                <b className="text-primary-text">
                  {t("structure.items.arbitraryAutoListing.title")}
                </b>
                <br />
                {t("structure.items.arbitraryAutoListing.description")}
              </BulletListItem>
              <BulletListItem>
                <b className="text-primary-text">{t("structure.items.liquidationBots.title")}</b>
                <br />
                {t("structure.items.liquidationBots.description")}
              </BulletListItem>
            </ul>
          </div>
        }
        rightContent={
          <div ref={structureEntryRef} className={clsx("animated")}>
            <Image src={CubeImage} alt={""} className="w-full max-lg:max-w-[310px]" />
          </div>
        }
      />
    </div>
  );
}
