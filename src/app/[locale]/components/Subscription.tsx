"use client";

import { sendGAEvent } from "@next/third-parties/google";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { ChangeEvent, FormEvent, useCallback, useId, useRef, useState } from "react";

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
  const t = useTranslations("Subscription");
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { threshold: 0.8, freezeOnceVisible: true });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const inputId = useId();
  const errorId = useId();

  const handleEmailSubmit = useCallback(async () => {
    const email = emailInput.trim();
    // Same rule the browser uses for type="email", checked here so the message is ours.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setIsInvalid(true);
      return;
    }
    setIsInvalid(false);
    setIsSubmitting(true);

    try {
      const res = await fetch("https://api.dex223.io/v1/core/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const data = await res.json();

      if (data.code === "EMAIL_ADD_SUCCESS") {
        sendGAEvent("event", "conversion", { send_to: "AW-16880113256/KZcOCNfWmZ8aEOisiPE-" });
        addToast(t("toasts.success"));
        setEmailInput("");
      }

      if (res.status === 400) {
        addToast(data.errors?.[0]?.message || t("toasts.unknownError"), "error");
      }

      if (res.status === 422) {
        setIsInvalid(true);
      }

      setIsSubmitting(false);
    } catch (e) {
      addToast(t("toasts.unknownError"), "error");
      setIsSubmitting(false);
    }
  }, [emailInput, t]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSubmitting) {
      handleEmailSubmit();
    }
  };

  return (
    <ToastProvider>
      <div className="relative">
        <NeonBlock
          icon="email"
          color="purple"
          overlineText={t("overline")}
          anchor="subscribe"
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
              <ArticleHeading text={t("heading")} />
              <p className="text-primary-text/90 text-18 lg:text-20 leading-[1.5] max-w-[44ch] mb-6 lg:mb-10">
                {t("lede")}
              </p>
              <form noValidate onSubmit={onSubmit}>
                <label htmlFor={inputId} className="text-20 font-bold block mb-2">
                  {t("label")}
                </label>
                <div className="flex gap-3 flex-col md:flex-row md:items-start">
                  <div className="flex-grow">
                    <Input
                      id={inputId}
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      required
                      value={emailInput}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setEmailInput(e.target.value);
                        if (isInvalid) setIsInvalid(false);
                      }}
                      placeholder={t("emailPlaceholder")}
                      isError={isInvalid}
                      aria-invalid={isInvalid}
                      aria-describedby={isInvalid ? errorId : undefined}
                      className="bg-primary-bg"
                    />
                    <p
                      id={errorId}
                      role="alert"
                      className={clsx(
                        "text-14 text-red-light mt-1.5 min-h-5",
                        !isInvalid && "invisible max-md:hidden",
                      )}
                    >
                      {isInvalid ? t("toasts.invalidEmail") : ""}
                    </p>
                  </div>
                  <Button
                    type="submit"
                    className="min-w-[130px] w-full md:w-[unset]"
                    isLoading={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? <Preloader size={20} /> : t("subscribe")}
                  </Button>
                </div>
              </form>
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
