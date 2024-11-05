import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import Button from "@/components/atoms/Button";
import TextLink from "@/components/atoms/ExternalTextLink";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BuyForm from "@/components/organisms/purchase-components/BuyForm";
import { dexEmail, dexEmailLink } from "@/constants/email";

import styles from "./PreSale.module.scss";

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
    document.getElementById("__next").className = "overflow-hidden";
  }, []);

  if (!hasMounted) {
    return;
  }

  return (
    <>
      <Header />

      <div className={styles.formWrapper}>
        <div className={styles.pattern1}>
          <Image alt="" src="/images/patterns/purple.svg" width={600} height={600} />
        </div>
        <div className={styles.pattern2}>
          <Image alt="" src="/images/patterns/green.svg" width={600} height={600} />
        </div>
        <h1 className={styles.heading}>Private sale has ended</h1>
        <p className="text-20 text-secondary-text text-center">
          You can purchase tokens in the public sale
        </p>
        <div className="flex justify-center mt-6">
          <Link href="/">
            <Button fullWidth={false}>Go to public sale</Button>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
