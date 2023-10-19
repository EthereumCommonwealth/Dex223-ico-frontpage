import React, {InputHTMLAttributes} from "react";
import styles from "./Input.module.scss";
export default function Input({...props}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={styles.input} {...props} />;
}
