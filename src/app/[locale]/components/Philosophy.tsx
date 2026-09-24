"use client";

import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";

import ArticleHeading from "@/components/ArticleHeading";
import TextLink from "@/components/atoms/TextLink";
import NeonBlock from "@/components/organisms/NeonBlock";
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
            <ArticleHeading text={t("heading")} />
            <div className="flex flex-col gap-5">
              <p className="text-16 lg:text-18 text-secondary-text">
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
            </div>
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
