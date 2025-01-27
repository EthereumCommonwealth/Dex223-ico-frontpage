import clsx from "clsx";
import { HTMLAttributes } from "react";

export enum PatternColor {
  BLUE,
  GREEN,
  PURPLE,
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  patternColor: PatternColor;
}

const colorMap: Record<PatternColor, string> = {
  [PatternColor.BLUE]: "bg-pattern-blue",
  [PatternColor.GREEN]: "bg-pattern-green",
  [PatternColor.PURPLE]: "bg-pattern-purple",
};
export default function Pattern({ patternColor, className, ...props }: Props) {
  return (
    <div
      className={clsx("absolute bg-cover opacity-10 -z-10", colorMap[patternColor], className)}
      {...props}
    />
  );
}
