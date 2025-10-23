"use client";

import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

import ArticleHeading from "@/components/ArticleHeading";
import TextLink from "@/components/atoms/TextLink";
import NeonBlock from "@/components/organisms/NeonBlock";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import PhilosophyImage from "@/inlined-svgs/Philosophy";

export default function Philosophy() {
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
        overlineText="Our Goals"
        anchor="philosophy"
        differentColumns
        leftContent={
          <>
            <ArticleHeading text="Project philosophy" />
            <div className="flex flex-col gap-5">
              <p className="text-16 lg:text-18 text-secondary-text">
                DEX223 is founded on the belief that a truly decentralized exchange must be
                unstoppable, secure, and governed by the people who use it. Our core principles
                revolve around user empowerment, transparent governance, and robust technical
                safeguards. By combining strict security measures with open, permissionless
                functionality, we aim to set a new standard in decentralized finance.{" "}
                <TextLink
                  href="https://test-app.dex223.io/en"
                  isExternal
                  text="Test DEX223
                here"
                />
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
