import Link from "next/link";
import React, { ReactNode } from "react";

import Svg from "@/components/atoms/Svg";
import { isThirdPartyHref, linkTargetProps } from "@/functions/links";

const className = "text-green underline hover:text-green-hover duration-200";

/**
 * Inline text link. Links to our own sites stay in the same tab; third-party links open a
 * new tab and carry a small arrow so readers know they are leaving dex223.io.
 */
export default function TextLink({ text, href }: { text: ReactNode; href: string }) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link className={className} href={href}>
        {text}
      </Link>
    );
  }

  return (
    <a className={className} href={href} {...linkTargetProps(href)}>
      {text}
      {isThirdPartyHref(href) && (
        <Svg
          iconName="forward-small"
          size={16}
          aria-hidden
          className="inline-block ml-0.5 align-[-0.2em]"
        />
      )}
    </a>
  );
}
