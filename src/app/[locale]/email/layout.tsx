import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function EmailLayout({ children }: PropsWithChildren) {
  return children;
}
