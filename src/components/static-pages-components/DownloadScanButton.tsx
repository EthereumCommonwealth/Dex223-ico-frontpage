import Svg from "@/components/atoms/Svg";
import React from "react";

export default function DownloadScanButton({ href, fileName }: { href: string, fileName: string }) {
  return <div className="mt-10 mb-6 md:mb-[80px] p-5 bg-tertiary-bg flex flex-col md:flex-row justify-between items-center gap-2">
    <span className="font-semibold text-16 sm:text-18 md:text-24 ">Download document</span>
    <a download={fileName} href={href} className="border border-green px-6 py-3 flex gap-2 items-center rounded-1 hover:text-green duration-200">
      Download PDF file
      <Svg iconName="download"/>
    </a>
  </div>
}
