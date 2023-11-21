import React from "react";
import styles from "./ExternalTextLink.module.scss";

export default function ExternalTextLink({ text, href }) {
  return <a target="_blank" className={styles.externalTextLink} href={href}>{text}</a>;
}
