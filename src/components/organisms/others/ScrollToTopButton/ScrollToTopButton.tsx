import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { throttle } from "throttle-debounce";

import Svg from "../../../atoms/Svg";
import styles from "./ScrollToTopButton.module.scss";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

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
      className={clsx(styles.button, visible && styles.visible)}
    >
      <Svg iconName="to-top" />
    </button>
  );
}
