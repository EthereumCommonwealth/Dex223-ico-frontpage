import React, { PropsWithChildren } from "react";

export default function BulletListItem({ children }: PropsWithChildren<{}>) {
  return (
    <li className="pl-[30px] lg:pl-12 relative before:absolute lg:before:w-2 lg:before:h-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-secondary-text lg:before:left-6 before:left-4 lg:before:top-3 before:top-[9px]">
      {children}
    </li>
  );
}
