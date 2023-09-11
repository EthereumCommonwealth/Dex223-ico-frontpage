import React from "react";
import styles from "./NeonBlock.module.scss";
import OverlineText from "../../OverlineText";
import clsx from "clsx";

interface Props {
  icon: any,
  color: "green" | "blue" | "purple",
  overlineText: string,
  leftContent: any,
  rightContent?: any,
  differentColumns?: boolean
}

export default function NeonBlock({icon, color, overlineText, leftContent, rightContent, differentColumns = false}: Props) {
  return <div className="container">
    <div className={clsx(styles.neonBlockContainer, styles[color], differentColumns && styles.different)}>
      <div className={styles.leftContent}>
        <div style={{marginBottom: 24}} className={styles.neonLineWrapper}>
          <div className={styles.neonTopLine} />
        </div>
        <div />
        <div className={styles.neonLineWrapper}>
          <div className={styles.neonIcon}>
            {icon}
          </div>
        </div>
        <div className={styles.overlineTextContainer}>
          <OverlineText text={overlineText} color={color} />
        </div>
        <div style={{marginTop: 24}} className={styles.neonLineWrapper}>
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
