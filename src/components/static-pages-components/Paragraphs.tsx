import { ReactNode } from "react";

export default function Paragraphs({paragraphs}: {paragraphs: ReactNode[]}) {
  return <div className="flex flex-col gap-3">
    {paragraphs.map((p, index) => {
      return <div key={index}>{p}</div>
    })}
  </div>
}
