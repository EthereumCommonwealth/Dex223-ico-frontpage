import clsx from "clsx";
import React, { InputHTMLAttributes } from "react";

import styles from "./Input.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  warning?: boolean;
}

export default function Input({ error = false, warning = false, ...props }: Props) {
  return (
    <input
      className={clsx(styles.input, error && styles.error, warning && styles.warning)}
      {...props}
    />
  );
}
