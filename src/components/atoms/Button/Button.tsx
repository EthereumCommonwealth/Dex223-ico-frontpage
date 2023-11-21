import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "text" | "outlined" | "contained" | "popup",
  error?: boolean
}

export default function Button({ variant = "contained", error = false, children, ...props }: Props) {
  return <button className={clsx(styles.button, styles[variant], error && styles.error)} {...props}>
    {children}
  </button>;
}
