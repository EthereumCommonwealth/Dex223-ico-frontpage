import clsx from "clsx";
import React from "react";

import Svg from "@/components/atoms/Svg";

import styles from "./AlertMessage.module.scss";

interface Props {
  text: string | JSX.Element;
  severity: "success" | "error" | "warning";
  onClose?: () => void;
  noIcon?: boolean;
}

const iconsMap = {
  success: <Svg iconName="done" />,
  error: <Svg iconName="error" />,
  warning: <Svg iconName="warning" />,
};
export default function AlertMessage({ text, onClose, severity, noIcon = false }: Props) {
  return (
    <div className={clsx(styles.message, styles[severity], noIcon && styles.noIcon)}>
      {!noIcon && <span className={styles.icon}>{iconsMap[severity]}</span>}
      {text}
    </div>
  );
}
