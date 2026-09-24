import React, { ReactNode } from "react";

interface Props {
  text: string | ReactNode;
  align?: "center" | "right" | "left";
}

export default function ArticleHeading({ text, align = "left" }: Props) {
  return (
    <h3
      className="mb-4 lg:mb-5 -mt-3 lg:-mt-4 text-32 lg:text-40 xl:text-48 font-semibold tracking-[-0.025em] leading-[1.12] lg:leading-[1.08] text-white"
      style={{ textAlign: align }}
    >
      {text}
    </h3>
  );
}
