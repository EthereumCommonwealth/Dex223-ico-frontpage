import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BuyForm from "@/components/organisms/purchase-components/BuyForm";
import React, { useEffect, useState } from "react";
import styles from "./PreSale.module.scss";
import Image from "next/image";

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
    document.getElementById("__next").className = "overflow-hidden";
  }, []);

  if (!hasMounted) {
    return;
  }

  return <>
    <Header/>

    <div className={styles.formWrapper}>
      <div className={styles.pattern1}>
        <Image alt="" src="/images/patterns/purple.svg" width={600} height={600}/>
      </div>
      <div className={styles.pattern2}>
        <Image alt="" src="/images/patterns/green.svg" width={600} height={600}/>
      </div>
      <BuyForm presale/>
    </div>

    <Footer/>
  </>
}
