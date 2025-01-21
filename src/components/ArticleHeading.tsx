import React, { ReactNode } from "react";

interface Props {
  text: string | ReactNode;
  align?: "center" | "right" | "left";
}

export default function ArticleHeading({ text, align = "left" }: Props) {
  return (
    <h3 className="mb-6 -mt-4 text-40 font-medium" style={{ textAlign: align }}>
      {text}
    </h3>
  );
}
