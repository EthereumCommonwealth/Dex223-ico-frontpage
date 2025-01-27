import Link from "next/link";
import React from "react";

import styles from "./ExternalTextLink.module.scss";

export default function TextLink({ text, href, isExternal = true }) {
  if (isExternal) {
    return (
      <a
        target="_blank"
        className="text-green underline hover:text-green-hover duration-200"
        href={href}
      >
        {text}
      </a>
    );
  }
  return (
    <Link className="text-green underline hover:text-green-hover duration-200" href={href}>
      {text}
    </Link>
  );
}
