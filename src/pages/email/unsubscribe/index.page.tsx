import React, { useEffect, useState } from "react";
import styles from "../components/Unsubscribe.module.scss";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/atoms/Button";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const resubscribeHandler = async (email: string) => {
  try {
    await fetch("https://mail.dex223.io/email-notification/notification/save-email", {
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
  const [hasMounted, setHasMounted] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
    document.getElementById("__next").className = "";
  }, []);

  useEffect(() => {
    if (email) {
      (async () => {
        try {
          await fetch(`https://mail.dex223.io/email-notification/notification/delete/${email}`, {
            method: "DELETE",
          });
        } catch (error) {
          console.warn("Delete email error:", error);
        }
      })();
    }
  }, [email]);

  if (!hasMounted) {
    return;
  }

  return (
    <>
      <Header blur />
      <div className={styles.container}>
        <div className={styles.pattern1}>
          <Image alt="" src="/images/patterns/purple.svg" width={600} height={600}/>
        </div>
        <div className={styles.pattern2}>
          <Image alt="" src="/images/patterns/green.svg" width={600} height={600}/>
        </div>
        <Image width={364} height={258} src="/images/email/email_unsubscribe.png" alt="" />
        <h1 className={styles.pageHeading}>You have been successfully unsubscribed</h1>
        <p
          className={styles.pageSubheading}
        >{`You have been removed from our mailing list. If this is a mistake or if you want to receive updates again you can resubscribe.`}</p>
        {email ? (
          <Button
            className={styles.resubscribeButton}
            onClick={async () => {
              await resubscribeHandler(email);
              router.push(`/email/resubscribe?email=${email}`);
            }}
          >
            Resubscribe
          </Button>
        ) : null}
      </div>
      <Footer />
    </>
  );
}
