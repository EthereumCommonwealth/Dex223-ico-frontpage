import React, { PropsWithChildren } from "react";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function Layout({
  blurHeader = false,
  children,
}: PropsWithChildren<{ blurHeader?: boolean }>) {
  return (
    <>
      <Header blur={blurHeader} />
      {children}
      <Footer className="mt-[120px] md:mt-[240px]" />
    </>
  );
}
