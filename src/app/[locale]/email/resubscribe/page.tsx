"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import Pic from "@/assets/images/unsubscribe_image_2.png";
import Button, { ButtonColor } from "@/components/atoms/Button";
import { useRouter } from "@/i18n/routing";

export default function Home() {
  const t = useTranslations("Email");
  const searchParams = useSearchParams();
  const email_id = searchParams.get("email_id");

  const router = useRouter();

  return (
    <div>
      <div className="my-[80px] mx-auto bg-primary-bg flex justify-center items-center flex-col p-4 md:p-10 rounded-2 max-w-[800px]">
        <div className="relative">
          <Image src={Pic} alt="" />
        </div>

        <h1 className="texty-28 md:text-36 text-primary-text text-center mb-3">
          {t("resubscribe.title")}
        </h1>
        <p className="text-18 text-secondary-text text-center mb-4">
          {t("resubscribe.description")}
        </p>
        {email_id ? (
          <Button
            fullWidth
            colorScheme={ButtonColor.LIGHT_GREEN}
            className="{styles.resubscribeButton}"
            onClick={async () => {
              router.push(`/email/unsubscribe?email_id=${email_id}`);
            }}
          >
            {t("resubscribe.unsubscribeButton")}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
