import React, { ReactNode } from "react";
import Svg from "@/components/atoms/Svg";
import { IconName } from "@/components/atoms/Svg/svgIconsMap";

export default function StaticNeonBlock({title, text, iconName}: {title: ReactNode, text: ReactNode, iconName: IconName}) {
  return <div className="grid grid-cols-[24px_1fr] md:grid-cols-[48px_1fr] gap-x-2 md:gap-x-5 px-4 md:px-8">
    <div className="flex flex-col gap-6">
      <div className="w-6 h-6 md:w-12 md:h-12 relative">
        <Svg iconName={iconName} className="z-10 relative" layout="cover" />
        <div className="absolute w-full h-full bg-purple rounded-full blur-[10px] md:blur-[20px] top-0 left-0" />
      </div>

      <div className="bg-purple-neon-line-gradient w-1 flex-grow mx-auto" />
    </div>
    <div>
      <h2 className="text-18 md:text-24 mb-4 font-semibold">{title}</h2>
      <div className="pb-[52px] text-secondary-text text-16 md:text-18">{text}</div>
    </div>
  </div>
}
