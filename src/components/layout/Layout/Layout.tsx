import React, { PropsWithChildren } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Layout({ children }: PropsWithChildren) {
  return <>
    <Header/>
    {children}
    <Footer/>
  </>;
}
