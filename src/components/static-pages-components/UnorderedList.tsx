import React, { ReactNode } from "react";

export default function UnorderedList({listItems}: {listItems: ReactNode[] }) {
  return <ul className="flex flex-col gap-2 pl-4 md:pl-6">
    {listItems.map((listItem, index) => {
      return <li className="grid grid-cols-[6px_1fr] md:grid-cols-[8px_1fr] gap-2 md:gap-4" key={index}>
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-secondary-text mt-2.5" />
        {listItem}
      </li>
    })}
  </ul>
}
