"use client";

import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { throttle } from "throttle-debounce";

import Svg from "../../../atoms/Svg";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function logPositions() {
      if (scrollY > window.innerHeight) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }

    const throttledPositions = throttle(250, logPositions);

    window.addEventListener("scroll", throttledPositions);

    return () => {
      window.removeEventListener("scroll", throttledPositions);
    };
  }, []);

  return (
    <button
      onClick={() => {
        window.scrollTo(0, 0);
      }}
      ref={ref}
      className={clsx(
        "w-12 h-12 fixed right-[50px] bottom-[50px] duration-[500ms] bg-primary-bg p-0 border border-primary-text rounded-1 flex items-center justify-center cursor-pointer z-[999] ",
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      )}
    >
      <Svg iconName="to-top" />
    </button>
  );
}
