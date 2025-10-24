import { AnchorHTMLAttributes } from "react";

import Svg from "@/components/atoms/Svg";
import { clsxMerge } from "@/functions/clsxMerge";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string | number;
  href: string;
  arrowSize?: number;
  color?: "green" | "white";
  textClassname?: string;
  withArrow?: boolean;
}

export default function ExternalTextLink({
  text,
  href,
  color = "green",
  className,
  arrowSize = 24,
  textClassname,
  withArrow = true,
  ...props
}: Props) {
  return (
    <a
      {...props}
      target="_blank"
      href={href}
      className={clsxMerge(
        "flex items-center duration-200",
        color === "green" ? "text-green hocus:text-green-hover" : "text-white hocus:text-green",
        className,
      )}
    >
      <span className={textClassname}>{text}</span>
      {withArrow && <Svg iconName="forward-small" className="flex-shrink-0" size={arrowSize} />}
    </a>
  );
}
