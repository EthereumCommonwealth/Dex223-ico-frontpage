import clsx from "clsx";
import { PropsWithChildren } from "react";

export default function Container({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={clsx(
        "mx-auto 3xl:max-w-[1682px] 2xl:max-w-[1494px] lg:max-w-[1194px] px-4 sm:px-8 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
