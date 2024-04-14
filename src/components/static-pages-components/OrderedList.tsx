import React from "react";

export default function OrderedList({listItems, firstIndex = 1, step = 1}: {listItems: string[], firstIndex?: number, step?: number}) {
  return <ol className="flex flex-col gap-2">
    {listItems.map((listItem, index) => {
      return <li key={listItem} className="grid grid-cols-[32px_1fr] gap-2 md:gap-4">
        <span>{(firstIndex + index * step).toLocaleString("en-US", {maximumFractionDigits: 3})}</span>
        {listItem}
      </li>
    })}
  </ol>
}
