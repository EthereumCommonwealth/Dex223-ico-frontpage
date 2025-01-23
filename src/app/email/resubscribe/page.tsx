"use client";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Pic from "@/pages/email/assets/unsubscribe_image_2.png";

import Button, { ButtonColor } from "@/components/atoms/Button";
export default function Home() {
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
            You have been successfully resubscribed
          </h1>
          <p className="text-18 text-secondary-text text-center mb-4">
            Welcome back! You&apos;ve successfully resubscribed to stay updated with the latest
            news! We&apos;re glad to have you with us again!
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
              Unsubscribe
            </Button>
          ) : null}
        </div>
      </div>
  );
}
