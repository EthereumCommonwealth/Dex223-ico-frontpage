import React from "react";
import styles from "./ArticleTitle.module.scss";

interface Props {
  text: string,
  align?: "center" | "right" | "left"
}

export default function ArticleTitle({ text, align = "left" }: Props) {
  return <h2 className={styles.articleTitle} style={{ textAlign: align }}>{text}</h2>;
}
