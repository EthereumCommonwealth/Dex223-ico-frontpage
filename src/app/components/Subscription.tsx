"use client";

import { sendGAEvent } from "@next/third-parties/google";
import clsx from "clsx";
import React, { ChangeEvent, useCallback, useRef, useState } from "react";

import ArticleHeading from "@/components/ArticleHeading";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Pattern, { PatternColor } from "@/components/atoms/Pattern";
import Preloader from "@/components/atoms/Preloader";
import NeonBlock from "@/components/organisms/NeonBlock";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import SubscribeEmail from "@/inlined-svgs/SubscribeEmail";
import addToast from "@/other/toast";
import ToastProvider from "@/providers/ToastProvider";

export default function Subscription() {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { threshold: 0.8, freezeOnceVisible: true });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const handleEmailSubmit = useCallback(async () => {
    setIsSubmitting(true);

    try {
      const res = await fetch("https://api.dex223.io/v1/core/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput,
        }),
      });
      const data = await res.json();
      console.log(data);

      if (data.code === "EMAIL_ADD_SUCCESS") {
        sendGAEvent("event", "conversion", { send_to: "AW-16880113256/KZcOCNfWmZ8aEOisiPE-" });
        addToast("You have successfully subscribed to our newsletter");
      }

      if (res.status === 400) {
        if (data.errors[0].message) {
          addToast(data.errors[0].message, "error");
        }
      }

      if (res.status === 422) {
        addToast("Error: invalid email", "error");
      }

      setIsSubmitting(false);
    } catch (e) {
      addToast("Unknown error", "error");
      setIsSubmitting(false);
    }
  }, [emailInput]);

  return (
    <ToastProvider>
      <div className="relative">
        <NeonBlock
          icon="email"
          color="purple"
          overlineText="Subscription"
          anchor="contact"
          differentColumns
          patterns={
            <>
              <Pattern
                patternColor={PatternColor.GREEN}
                className="w-200 h-200 -right-[471px] top-0 -scale-100"
              />
              <Pattern
                patternColor={PatternColor.GREEN}
                className="w-250 h-250 -left-[911px] bottom-[92px] -scale-100"
              />
            </>
          }
          leftContent={
            <>
              <ArticleHeading text="Subscribe to our newsletter" />
              <p className="text-secondary-text text-16 lg:text-18 mb-3 lg:mb-10">
                Stay informed about upcoming releases, security enhancements, and gas-saving
                benefits, ensuring you’re always ahead in the world of decentralized trading.
              </p>
              <label className="text-20 font-bold block mb-2">Subscribe to our newsletter</label>
              <div className="flex gap-3 flex-col md:flex-row">
                <Input
                  value={emailInput}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmailInput(e.target.value);
                  }}
                  placeholder="Your email"
                  type="email"
                  className="flex-grow bg-primary-bg"
                />
                <Button
                  className="min-w-[130px] w-full md:w-[unset]"
                  disabled={isSubmitting || !emailInput}
                  onClick={handleEmailSubmit}
                >
                  {isSubmitting ? <Preloader size={20} /> : "Subscribe"}
                </Button>
              </div>
            </>
          }
          rightContent={
            <div
              ref={ref}
              className={clsx(
                "flex lg:flex-col lg:justify-end pb-0 md:pb-10 pt-[72px] 2xl:pb-0 items-center h-full group",
                entry?.isIntersecting && "animated",
              )}
            >
              <SubscribeEmail />
            </div>
          }
        />
      </div>
    </ToastProvider>
  );
}
