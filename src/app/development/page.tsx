"use client";

import React, { useEffect, useRef, useState } from "react";
import { throttle } from "throttle-debounce";

import ScrollToTopButton from "@/components/organisms/others/ScrollToTopButton";
import { clsxMerge } from "@/functions/clsxMerge";

import DevelopmentReports from "./components/DevelopmentReports";
import References from "./components/References";
import Structure from "./components/Structure";

export default function Home() {
  const [activeTab, setActiveTab] = useState(-1);

  const firstRef = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();

  useEffect(() => {
    function logPositions() {
      if (firstRef.current && secondRef.current && thirdRef.current) {
        // @ts-ignore
        const firstTop = firstRef.current.getBoundingClientRect().top;
        // @ts-ignore
        const secondTop = secondRef.current.getBoundingClientRect().top;
        // @ts-ignore
        const thirdTop = thirdRef.current.getBoundingClientRect().top;

        if (firstTop > 0) {
          setActiveTab(-1);
        }

        if (firstTop < 0 && secondTop > 0) {
          setActiveTab(0);
        }

        if (secondTop < 0 && thirdTop > 0) {
          setActiveTab(1);
        }

        if (thirdTop < 0) {
          setActiveTab(2);
        }
      }
    }

    const throttledPositions = throttle(250, logPositions);

    window.addEventListener("scroll", throttledPositions);

    return () => {
      window.removeEventListener("scroll", throttledPositions);
    };
  }, [setActiveTab]);

  return (
    <div className="mb-[200px]">
      <h1 className="text-center text-58 font-bold mb-3 mt-[60px] text-primary-text">
        Development progress
      </h1>

      <p className="text-18 text-secondary-text text-center max-w-[822px] mx-auto mb-5">
        Here you can track the development progress of DEX223 decentralized exchange and related
        services.
      </p>

      <div className="sticky py-5 top-0 z-[5] mb-5">
        <div className="grid grid-cols-3 mx-auto max-w-[822px]">
          <a href="#structure">
            <button
              className={clsxMerge(
                "bg-primary-bg inline-block w-full h-12 border border-primary-border text-secondary-text border-r-0 cursor-pointer relative text-18 before:absolute before:w-full before:h-full before:border before:border-transparent hover:before:border-primary-text before:left-0 before:top-0 hover:before:z-[4] hover:text-primary-text",
                activeTab === 0 &&
                  "bg-secondary-bg pointer-events-none text-primary-text before:border-primary-text before:z-[4]",
              )}
            >
              Structure
            </button>
          </a>
          <a href="#references">
            <button
              className={clsxMerge(
                "bg-primary-bg inline-block w-full h-12 border border-primary-border text-secondary-text border-r-0 cursor-pointer relative text-18 before:absolute before:w-full before:h-full before:border before:border-transparent hover:before:border-primary-text before:left-0 before:top-0 hover:before:z-[4] hover:text-primary-text",
                activeTab === 1 &&
                  "bg-secondary-bg pointer-events-none text-primary-text before:border-primary-text before:z-[4]",
              )}
            >
              References
            </button>
          </a>
          <a href="#reports">
            <button
              className={clsxMerge(
                "bg-primary-bg inline-block w-full h-12 border border-primary-border text-secondary-text cursor-pointer relative text-18 before:absolute before:w-full before:h-full before:border before:border-transparent hover:before:border-primary-text before:left-0 before:top-0 hover:before:z-[4] hover:text-primary-text",
                activeTab === 2 &&
                  "bg-secondary-bg pointer-events-none text-primary-text before:border-primary-text before:z-[4]",
              )}
            >
              <span className="">Development reports</span>
            </button>
          </a>
        </div>
      </div>

      <Structure refEl={firstRef} />
      <References refEl={secondRef} />
      <DevelopmentReports refEl={thirdRef} />

      <ScrollToTopButton />
    </div>
  );
}
