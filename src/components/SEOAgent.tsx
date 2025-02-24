"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

export default function SEOAgent() {
  const pathname = usePathname();

  return (
    <Script
      src={`https://api.tryjournalist.com/olayer/8e397cc6-695b-4e8a-9778-9163c6ebc625?path=${pathname}`}
      strategy="afterInteractive"
      defer
    />
  );
}
