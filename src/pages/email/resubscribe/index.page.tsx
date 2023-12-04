import React, { useEffect, useState } from "react";
import styles from "../components/Unsubscribe.module.scss";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/atoms/Button";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
    document.getElementById("__next").className = "";
  }, []);

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
        <Image width={364} height={258} src="/images/email/email_resubscribe.png" alt="" />
        <h1 className={styles.pageHeading}>You have successfully resubscribed</h1>
        <p
          className={styles.pageSubheading}
        >{`Thank you for choosing to stay connected with us. You'll now continue to receive the latest updates, exclusive offers, and exciting news directly in your inbox.`}</p>
        {email ? (
          <Button
            className={styles.resubscribeButton}
            variant="outlined"
            onClick={async () => {
              router.push(`/email/unsubscribe?email=${email}`);
            }}
          >
            Unsubscribe
          </Button>
        ) : null}
      </div>
      <Footer />
    </>
  );
}
