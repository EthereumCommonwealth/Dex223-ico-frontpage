import clsx from "clsx";
import { ReactNode } from "react";

import Svg from "@/components/atoms/Svg";
import { IconName } from "@/components/atoms/Svg/svgIconsMap";

const tones = {
  green: "text-green-hover bg-green/10 ring-green/20",
  purple: "text-purple-hover bg-purple/10 ring-purple/20",
  blue: "text-blue-hover bg-blue/10 ring-blue/20",
  red: "text-red-light bg-red/10 ring-red/20",
};

/** One scannable point: a glyph, a two-to-four word title and a single short line. */
export default function GlyphPoint({
  icon,
  title,
  text,
  tone = "green",
  className,
}: {
  icon: IconName;
  title: ReactNode;
  text?: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <div className={clsx("flex gap-4", className)}>
      <span
        aria-hidden
        className={clsx(
          "flex-shrink-0 w-11 h-11 rounded-3 flex items-center justify-center ring-1 ring-inset",
          tones[tone],
        )}
      >
        <Svg iconName={icon} size={24} />
      </span>
      <div className="min-w-0">
        <p className="text-16 lg:text-18 font-semibold text-primary-text">{title}</p>
        {text && <p className="text-14 lg:text-16 text-secondary-text mt-0.5">{text}</p>}
      </div>
    </div>
  );
}
