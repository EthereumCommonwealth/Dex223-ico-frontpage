import Header from "../../components/sections/Header";
import Footer from "../../components/sections/Footer";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import NeonBlock from "../../components/organisms/NeonBlock";
import CubeImage from "../../assets/images/cube.svg";
import ArticleHeading from "../../components/atoms/ArticleHeading";
import styles from "../../styles/Development.module.scss";
import clsx from "clsx";
import DevelopmentReports from "../../components/sections/DevelopmentReports";
import References from "../../components/sections/References";
import Spacer from "../../components/atoms/Spacer";
import Structure from "../../components/sections/Structure";
import { throttle } from 'throttle-debounce';

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const [activeTab, setActiveTab] = useState(-1);

  const firstRef = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();


  useEffect(() => {
    function logPositions() {
      console.log("Fired");
      if(firstRef.current && secondRef.current && thirdRef.current) {

        // @ts-ignore
        const firstTop = firstRef.current.getBoundingClientRect().top;
        // @ts-ignore
        const secondTop = secondRef.current.getBoundingClientRect().top;
        // @ts-ignore
        const thirdTop = thirdRef.current.getBoundingClientRect().top;

        if(firstTop > 0) {
          setActiveTab(-1);
        }

        if(firstTop < 0 && secondTop > 0) {
          setActiveTab(0);
        }

        if(secondTop < 0 && thirdTop > 0) {
          setActiveTab(1);
        }

        if(thirdTop < 0) {
          setActiveTab(2);
        }
      }
    }

    const throttledPositions = throttle(250, logPositions);

    window.addEventListener("scroll", throttledPositions);

    return () => {
      window.removeEventListener("scroll", throttledPositions);
    }
  }, [setActiveTab]);

  useEffect(() => {
    setHasMounted(true);
    document.getElementById("__next").className = "";
  }, []);

  if (!hasMounted) {
    return;
  }

  return (
    <>
      <Header/>
      <h1 className={styles.pageHeading}>Development progress</h1>
      <p className={styles.pageSubheading}>Here you can track the development progress of Dex223 decentralized exchange and related services.</p>

      <div className={styles.tabButtonsContainer}>
        <div className={styles.tabButtons}>
          <a href="#structure"><button className={clsx(styles.tabButton, activeTab === 0 && styles.active)}>Structure</button></a>
          <a href="#references"><button className={clsx(styles.tabButton, activeTab === 1 && styles.active)}>References</button></a>
          <a href="#reports"><button className={clsx(styles.tabButton, activeTab === 2 && styles.active)}>
            <span className={styles.desktop}>Development reports</span>
            <span className={styles.mobile}>Reports</span>
          </button></a>
        </div>
      </div>


      <Spacer height={20} />
      <Structure refEl={firstRef} />
      <References refEl={secondRef}  />
      <DevelopmentReports refEl={thirdRef} />
      <Footer/>
    </>
  )
}
