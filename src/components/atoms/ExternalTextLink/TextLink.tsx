import React from "react";
import styles from "./ExternalTextLink.module.scss";
import Link from "next/link";

export default function TextLink({ text, href, isExternal = true }) {
  if(isExternal) {
    return <a target="_blank" className={styles.externalTextLink} href={href}>{text}</a>;
  }
  return <Link className={styles.externalTextLink} href={href}>{text}</Link>;
}
