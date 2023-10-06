import React, {useMemo, useRef} from "react";
import styles from "./NeonBlock.module.scss";
import OverlineText from "../../atoms/OverlineText";
import clsx from "clsx";
import {IconName} from "../../atoms/Svg/svgIconsMap";
import Svg from "../../atoms/Svg";
import {useIntersectionObserver} from "../../../hooks/useIntersectionObserver";

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
  const ref = useRef();
  const entryTopLine = useIntersectionObserver(ref, {threshold: 0});
  const entryBottomLine = useIntersectionObserver(ref, {threshold: 0.5});

  const isBottomVisible = useMemo(() => {
    if(!entryBottomLine) {
      return false;
    }
    const isBottomVisible = entryBottomLine.boundingClientRect.bottom < window.innerHeight && entryBottomLine.boundingClientRect.bottom > 0;

    return isBottomVisible;
  }, [entryBottomLine]);

  return <div className="container">
    <div className={clsx(styles.neonBlockContainer, styles[color], differentColumns && styles.different)}>
      <div className={clsx(styles.neonLineWrapper, styles.neonTopLineCell)}>
        <div className={clsx(styles.neonTopLine, entryTopLine?.isIntersecting && styles.animate)} />
      </div>
      <div className={clsx(styles.neonLineWrapper, styles.neonIconCell, entryBottomLine?.isIntersecting && styles.animate)}>
        {anchor && <span className={styles.anchor} id={anchor} />}
        <div className={styles.neonIcon}>
          <Svg iconName={icon} layout="cover" />
        </div>
      </div>
      <div className={clsx(styles.overlineTextContainer, styles.headingCell)}>
        <OverlineText text={overlineText} color={color} />
      </div>
      <div ref={ref} className={clsx(styles.neonLineWrapper, styles.neonBottomLineCell)}>
        <div className={clsx(styles.neonBottomLine, (entryBottomLine?.isIntersecting || isBottomVisible) && styles.animate)} />
      </div>
      <div className={styles.textContent}>
        {leftContent}
      </div>
      <div className={styles.rightContent}>
        {rightContent}
      </div>
    </div>
  </div>;
}
