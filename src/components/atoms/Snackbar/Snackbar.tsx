import clsx from "clsx";
import React from "react";

import { golos_text } from "../../../assets/fonts";
import IconButton from "../../atoms/IconButton";
import Svg from "../../atoms/Svg/Svg";
import styles from "./Snackbar.module.scss";
import { snackbarIcons } from "./snackbarIcons";

type SnackbarSeverity = "error" | "success" | "info" | "warning";

interface Props {
  severity: SnackbarSeverity;
  message: string;
  handleClose: any;
}

export default function Snackbar({ severity, message, handleClose }: Props) {
  return (
    <div className={clsx(styles.customSnackbar, styles[severity], golos_text.className)}>
      <div className={styles.snackbarContainer}>
        <div className={styles.iconWrapper}>{snackbarIcons[severity]}</div>
        <p>
          <span className={styles.text}>{message}</span>
        </p>
        <div className={styles.buttonWrapper}>
          <button className={styles.closeButton} onClick={handleClose}>
            <Svg iconName="close" />
          </button>
        </div>
      </div>
    </div>
  );
}
