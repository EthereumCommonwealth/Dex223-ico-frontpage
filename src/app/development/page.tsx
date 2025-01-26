"use client";

import React, { useEffect, useRef, useState } from "react";
import { throttle } from "throttle-debounce";

import Ecosystem from "@/app/development/components/Ecosystem";
import ScrollToTopButton from "@/components/organisms/others/ScrollToTopButton";
import { clsxMerge } from "@/functions/clsxMerge";

import DevelopmentReports from "./components/DevelopmentReports";
import References from "./components/References";
import Structure from "./components/Structure";

export default function DevelopmentPage() {
  const [activeTab, setActiveTab] = useState(-1);

  const firstRef = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();

  useEffect(() => {
    function logPositions() {
      if (firstRef.current && secondRef.current && thirdRef.current) {
        // @ts-ignore
        const firstTop = firstRef.current.getBoundingClientRect().top - 108;
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
      <h1 className="text-center text-30 lg:text-58 font-bold mb-3 mt-10 xl:mt-[60px] text-primary-text">
        Development progress
      </h1>

      <p className="text-18 text-secondary-text text-center max-w-[822px] mx-auto mb-5 px-4">
        Here you can track the development progress of DEX223 decentralized exchange and related
        services.
      </p>

      <div className="sticky py-5 top-0 z-[100] mb-5 px-4">
        <div className="grid grid-cols-3 mx-auto max-w-[822px] p-1 gap-1 rounded-3 bg-primary-bg">
          <a href="#structure">
            <button
              className={clsxMerge(
                "rounded-2 bg-secondary-bg border border-transparent inline-block w-full h-12 text-secondary-text cursor-pointer relative text-18 hover:bg-tertiary-bg duration-200 hover:border-primary-border hover:text-primary-text",
                activeTab === 0 &&
                  "bg-quaternary-bg border-primary-border pointer-events-none text-primary-text before:border-primary-text before:z-[4]",
              )}
            >
              Structure
            </button>
          </a>
          <a href="#references">
            <button
              className={clsxMerge(
                "rounded-2 bg-secondary-bg border border-transparent inline-block w-full h-12 text-secondary-text cursor-pointer relative text-18 hover:bg-tertiary-bg duration-200 hover:border-primary-border hover:text-primary-text",
                activeTab === 1 &&
                  "bg-quaternary-bg border-primary-border pointer-events-none text-primary-text before:border-primary-text before:z-[4]",
              )}
            >
              References
            </button>
          </a>
          <a href="#reports">
            <button
              className={clsxMerge(
                "rounded-2 bg-secondary-bg border border-transparent inline-block w-full h-12 text-secondary-text cursor-pointer relative text-18 hover:bg-tertiary-bg duration-200 hover:border-primary-border hover:text-primary-text",
                activeTab === 2 &&
                  "bg-quaternary-bg border-primary-border pointer-events-none text-primary-text before:border-primary-text before:z-[4]",
              )}
            >
              <span className="">
                <span className="max-lg:hidden">Development reports</span>
                <span className="lg:hidden">Reports</span>
              </span>
            </button>
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <Structure refEl={firstRef} />
        <Ecosystem />
        <References refEl={secondRef} />
        <DevelopmentReports refEl={thirdRef} />
      </div>

      <ScrollToTopButton />
    </div>
  );
}
