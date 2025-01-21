import React, { PropsWithChildren } from "react";

export default function BulletListItem({ children }: PropsWithChildren<{}>) {
  return (
    <li className="pl-12 relative before:absolute before:w-2 before:h-2 before:rounded-full before:bg-secondary-text before:left-6 before:top-3">
      {children}
    </li>
  );
}
