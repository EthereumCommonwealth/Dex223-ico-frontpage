import React from "react";
import styles from "./Snackbar.module.scss";
import clsx from "clsx";
import { snackbarIcons } from "./snackbarIcons";
import Svg from "../../atoms/Svg/Svg";
import IconButton from "../../atoms/IconButton";
import { golos_text } from "../../../assets/fonts";

type SnackbarSeverity = "error" | "success" | "info" | "warning";

interface Props {
  severity: SnackbarSeverity,
  message: string,
  handleClose: any
}

export default function Snackbar({ severity, message, handleClose }: Props) {
  return <div className={clsx(
    styles.customSnackbar,
    styles[severity],
    golos_text.className
  )}>
    <div className={styles.snackbarContainer}>
      <div className={styles.iconWrapper}>
        {snackbarIcons[severity]}
      </div>
      <p>
          <span className={styles.text}>
            {message}
          </span>
      </p>
      <div className={styles.buttonWrapper}>
        <button
          className={styles.closeButton}
          onClick={handleClose}
        >
          <Svg iconName="close"/>
        </button>
      </div>
    </div>
  </div>;
}
