import clsx from "clsx";
import React from "react";

interface Props {
  text: string;
  color: "purple" | "green" | "blue";
}

export default function OverlineText({ text, color }: Props) {
  const colorStyles = {
    purple: "text-purple text-shadow-[0_0_24px_#A07EFF,0_0_24px_rgba(160,126,255,0.5)]",
    green: "text-green text-shadow-[0_0_24px_#35BC66,0_0_24px_rgba(53,188,102,0.5)]",
    blue: "text-blue text-shadow-[0_0_24px_#22AEFC,0_0_24px_rgba(34,174,252,0.25)]",
  };

  return (
    <h3 className={clsx("text-16 lg:text-20 font-bold uppercase", colorStyles[color])}>{text}</h3>
  );
}
