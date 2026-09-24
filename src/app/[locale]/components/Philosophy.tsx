"use client";

import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";

import ExternalTextLink from "@/components/atoms/ExternalTextLink";
import TextLink from "@/components/atoms/TextLink";
import GlyphPoint from "@/components/GlyphPoint";
import NeonBlock from "@/components/organisms/NeonBlock";
import SectionIntro from "@/components/SectionIntro";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import PhilosophyImage from "@/inlined-svgs/Philosophy";

export default function Philosophy() {
  const t = useTranslations("Philosophy");
  const locale = useLocale();
  const ref = useRef<HTMLDivElement | null>(null);
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
    <div>
      <NeonBlock
        icon="target"
        color="purple"
        overlineText={t("overline")}
        anchor="philosophy"
        differentColumns
        leftContent={
          <>
            <SectionIntro
              heading={t("heading")}
              lede={t("lede")}
              details={
                <p>
                  {t.rich("description", {
                    link: (chunks) => (
                      <TextLink
                        href={`https://test-app.dex223.io/${locale}`}
                        isExternal
                        text={chunks}
                      />
                    ),
                  })}
                </p>
              }
            />
            <div className="mt-8 flex flex-col gap-5">
              <GlyphPoint
                icon="security"
                tone="purple"
                title={t("points.secure.title")}
                text={t("points.secure.text")}
              />
              <GlyphPoint
                icon="permissionless"
                tone="purple"
                title={t("points.open.title")}
                text={t("points.open.text")}
              />
              <GlyphPoint
                icon="team"
                tone="purple"
                title={t("points.community.title")}
                text={t("points.community.text")}
              />
            </div>
            <ExternalTextLink
              className="mt-8 text-18 font-medium min-h-11 self-start"
              color="green"
              href={`https://test-app.dex223.io/${locale}`}
              text={t("tryIt")}
            />
          </>
        }
        rightContent={
          <div
            ref={ref}
            className={clsx(
              "w-full relative group",
              entry?.isIntersecting && "animated",
              addAnimation && "removeAfterAnimated",
            )}
          >
            <PhilosophyImage />
          </div>
        }
      />
    </div>
  );
}
