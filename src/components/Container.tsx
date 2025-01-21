import clsx from "clsx";
import { PropsWithChildren } from "react";

export default function Container({ children, className }: PropsWithChildren<{className?: string}>) {
  return <div className={clsx("mx-auto max-w-[1668px] px-6", className)}>{children}</div>;
}
