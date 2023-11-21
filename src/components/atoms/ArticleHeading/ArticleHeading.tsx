import React, { ReactNode } from "react";
import styles from "./ArticleHeading.module.scss";

interface Props {
  text: string | ReactNode,
  align?: "center" | "right" | "left"
}

export default function ArticleHeading({ text, align = "left" }: Props) {
  return <h3 className={styles.articleHeading} style={{ textAlign: align }}>{text}</h3>;
}
