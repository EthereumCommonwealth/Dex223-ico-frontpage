"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import Pic from "@/assets/images/unsubscribe_image_1.png";
import Button, { ButtonColor } from "@/components/atoms/Button";
const resubscribeHandler = async (email: string) => {
  try {
    await fetch("https://api.dex223.io/v1/core/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
  } catch (error) {
    console.warn("Resubscribe error:", error);
  }
};

export default function Home() {
  const searchParams = useSearchParams();
  const email_id = searchParams.get("email_id");
  const [email, setEmail] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (email_id) {
      (async () => {
        try {
          const res = await fetch(
            `https://api.dex223.io/v1/core/api/email/unsubscribe/${email_id}`,
            {
              method: "PUT",
            },
          );

          const data = await res.json();

          if (data.email) {
            setEmail(data.email);
          }
        } catch (error) {
          console.warn("Delete email error:", error);
        }
      })();
    }
  }, [email_id]);

  return (
    <div>
      <div className="my-[80px] mx-4 md:mx-auto bg-primary-bg flex justify-center items-center flex-col p-10 rounded-2 max-w-[800px]">
        <div className="relative">
          <Image src={Pic} alt="" />
        </div>

        <h1 className="texty-28 md:text-36 text-primary-text text-center mb-3">
          You have been successfully unsubscribed
        </h1>
        <p className="text-18 text-secondary-text text-center mb-4">
          If this was a mistake, don&apos;t worry — you can easily resubscribe by clicking the
          button below. We&apos;d be happy to have you back!
        </p>
        {email ? (
          <Button
            fullWidth
            colorScheme={ButtonColor.LIGHT_GREEN}
            onClick={async () => {
              await resubscribeHandler(email);
              router.push(`/email/resubscribe?email_id=${email_id}`);
            }}
          >
            Resubscribe
          </Button>
        ) : null}
      </div>
    </div>
  );
}
