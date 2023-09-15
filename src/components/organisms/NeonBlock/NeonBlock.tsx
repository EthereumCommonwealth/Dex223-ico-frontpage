import React from "react";
import styles from "./NeonBlock.module.scss";
import OverlineText from "../../atoms/OverlineText";
import clsx from "clsx";

interface Props {
  icon: any,
  color: "green" | "blue" | "purple",
  overlineText: string,
  leftContent: any,
  rightContent?: any,
  differentColumns?: boolean,
  anchor?: string
}

export default function NeonBlock({icon, color, overlineText, leftContent, rightContent, differentColumns = false, anchor}: Props) {
  return <div className="container">
    <div className={clsx(styles.neonBlockContainer, styles[color], differentColumns && styles.different)}>
      <div className={styles.leftContent}>
        <div className={styles.neonLineWrapper}>
          <div className={styles.neonTopLine} />
        </div>
        <div>
          <div className={styles.mobileTopContent}>
            {rightContent}
          </div>
        </div>
        <div className={styles.neonLineWrapper}>
          {anchor && <span className={styles.anchor} id={anchor} />}
          <div className={styles.neonIcon}>
            {icon}
          </div>
        </div>
        <div className={styles.overlineTextContainer}>
          <OverlineText text={overlineText} color={color} />
        </div>
        <div className={styles.neonLineWrapper}>
          <div className={styles.neonBottomLine} />
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
