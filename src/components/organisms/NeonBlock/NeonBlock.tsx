import React, {useEffect, useRef, useState} from "react";
import styles from "./NeonBlock.module.scss";
import OverlineText from "../../atoms/OverlineText";
import clsx from "clsx";
import {IconName} from "../../atoms/Svg/svgIconsMap";
import Svg from "../../atoms/Svg";

interface Props {
  icon: IconName,
  color: "green" | "blue" | "purple",
  overlineText: string,
  leftContent: any,
  rightContent?: any,
  differentColumns?: boolean,
  anchor?: string
}

export default function NeonBlock({icon, color, overlineText, leftContent, rightContent, differentColumns = false, anchor}: Props) {
  const [isIntersected, setIsIntersected] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | undefined>(undefined);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersected(entry.isIntersecting);
    }, {root: null, threshold: 1});

    if (ref.current && rootRef.current) {
      observer.observe(ref.current!);
    }

    return () => observer.disconnect();
  }, [isIntersected]);

  return <div className="container">
    <div className={clsx(styles.neonBlockContainer, styles[color], differentColumns && styles.different)}>
      <div className={styles.leftContent}>
        <div className={styles.neonLineWrapper}>
          <div className={clsx(styles.neonTopLine, isIntersected && styles.animate)} />
        </div>
        <div>
          <div className={styles.mobileTopContent}>
            {rightContent}
          </div>
        </div>
        <div ref={rootRef} className={styles.neonLineWrapper}>
          {anchor && <span className={styles.anchor} id={anchor} />}
          <div ref={ref} className={styles.neonIcon}>
            <Svg iconName={icon} layout="cover" />
          </div>
        </div>
        <div className={styles.overlineTextContainer}>
          <OverlineText text={overlineText} color={color} />
        </div>
        <div className={styles.neonLineWrapper}>
          <div className={clsx(styles.neonBottomLine, isIntersected && styles.animate)} />
        </div>
        <div className={styles.textContent}>
          {leftContent}
        </div>
      </div>
      <div className={styles.rightContent}>
        {rightContent}
      </div>
    </div>
  </div>;
}
