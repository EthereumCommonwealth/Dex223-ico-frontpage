import clsx from "clsx";
import Image from "next/image";
import { ReactNode } from "react";

import Svg from "@/components/atoms/Svg";

enum SliderColor {
  GREEN,
  RED,
}

function SliderPlaceholderImage({ color = SliderColor.GREEN }: { color?: SliderColor }) {
  return (
    <div className="absolute w-full h-full bg-[#1D2123] pt-3">
      <div className="flex items-center gap-2  pl-3.5">
        <div className="w-9 h-9 rounded-full bg-[#2B2F32]" />
        <div
          className={clsx(
            " h-4 rounded-1 bg-[#2B2F32]",
            color === SliderColor.GREEN ? "w-[86px]" : "w-[149px]",
          )}
        />
      </div>
      <div className="px-5">
        <div className="bg-[#2B2F32]  w-full h-px mt-3 mb-4" />
      </div>
      <div className="flex flex-col gap-2 pb-4">
        <div className="flex items-center gap-3  pl-5">
          <div className="p-0.5">
            <div className="w-5 h-5 rounded-full bg-[#2B2F32]" />
          </div>
          <div
            className={clsx(
              "h-4 rounded-1 bg-[#2B2F32]",
              color === SliderColor.GREEN ? "w-[54px]" : "w-[308px]",
            )}
          />
        </div>
        <div className="flex items-center gap-3  pl-5">
          <div className="p-0.5">
            <div className="w-5 h-5 rounded-full bg-[#2B2F32]" />
          </div>
          <div
            className={clsx(
              "h-4 rounded-1 bg-[#2B2F32]",
              color === SliderColor.GREEN ? "w-[270px]" : "w-[209px]",
            )}
          />
        </div>
        <div className="flex items-center gap-3  pl-5">
          <div className="p-0.5">
            <div className="w-5 h-5 rounded-full bg-[#2B2F32]" />
          </div>
          <div
            className={clsx(
              "h-4 rounded-1 bg-[#2B2F32]",
              color === SliderColor.GREEN ? "w-[289px]" : "w-[412px]",
            )}
          />
        </div>
      </div>
    </div>
  );
}

const icons: Record<SliderColor, { mainIcon: string; bgIcon: string }> = {
  [SliderColor.GREEN]: {
    mainIcon: "/images/slider-shield.png",
    bgIcon: "/images/bg-image-shield.svg",
  },
  [SliderColor.RED]: {
    mainIcon: "/images/slider-shield-cracked.png",
    bgIcon: "/images/bg-image-warn.svg",
  },
};

const texts: Record<
  SliderColor,
  { title: string; option1: ReactNode; option2: string; option3: string }
> = {
  [SliderColor.GREEN]: {
    title: "Safe to use",
    option1: "Secure",
    option2: 'Eliminates the need for "approvals"',
    option3: "Prevents sending to wrong addresses",
  },
  [SliderColor.RED]: {
    title: "Users’ funds at risk",
    option1: (
      <span>
        Security problems detected,{" "}
        <a
          className="inline-flex items-center text-red-light hocus:text-red-light-hover duration-200"
          target="_blank"
          href="https://dexaran.github.io/erc20-losses/"
        >
          <span className="underline">$108M lost</span>
          <Svg iconName="forward-small" />
        </a>
      </span>
    ),
    option2: 'Require "approving" tokens',
    option3: "Simple user mistakes cause permanent loss of tokens",
  },
};

function SliderOption({
  color = SliderColor.GREEN,
  text,
}: {
  color?: SliderColor;
  text: string | ReactNode;
}) {
  return (
    <div className="flex items-center gap-3  pl-5">
      <div className="p-0.5">
        <div
          className={clsx(
            "w-5 h-5 rounded-full bg-cover",
            color === SliderColor.RED
              ? "bg-[url('/images/slider-check-red.png')]"
              : "bg-[url('/images/slider-check-green.png')]",
          )}
        ></div>
      </div>
      <div className="text-16 text-secondary-text">{text}</div>
    </div>
  );
}

function SliderImage({ color = SliderColor.GREEN }: { color?: SliderColor }) {
  return (
    <div
      className={clsx(
        "absolute w-full h-full bg-gradient-to-r  pt-3 animate-reveal",
        color === SliderColor.RED ? "from-[#211C1C] to-[#352C2C]" : "from-[#171C19] to-[#282D2B]",
      )}
    >
      <div className="absolute right-[27px] bottom-0">
        <Image width={131} height={109} src={icons[color].bgIcon} alt="" />
      </div>
      <div className="flex items-center gap-2  pl-3.5">
        <div
          className={clsx(
            "w-9 h-9 rounded-full  flex items-center justify-center",
            color === SliderColor.RED ? "bg-red-bg" : "bg-green-bg",
          )}
        >
          <Image width={24} height={24} alt={""} src={icons[color].mainIcon} />
        </div>
        <div
          className={clsx("text-16", color === SliderColor.RED ? "text-red-light" : "text-green")}
        >
          {texts[color].title}
        </div>
      </div>
      <div className="px-5">
        <div className="bg-white opacity-10 w-full h-px mt-3 mb-4" />
      </div>
      <div className="flex flex-col gap-2 pb-4">
        <SliderOption text={texts[color].option1} color={color} />
        <SliderOption text={texts[color].option2} color={color} />
        <SliderOption text={texts[color].option3} color={color} />
      </div>
    </div>
  );
}

export default function CompareAnimationSlider() {
  return (
    <div>
      <div className="mb-[64px]">
        <div className="flex justify-between mb-1.5">
          <div className="flex items-center">
            <Image src={"/images/network_slider_main.png"} width={40} height={40} alt={"Dex223"} />
          </div>

          <div className="flex justify-between items-center gap-5">
            <span className="text-24 font-medium text-secondary-text">First to support</span>
            <span className="text-40 block min-w-[166px]">ERC-223</span>
          </div>
        </div>
        <div className="relative h-[180px] rounded-3 overflow-hidden">
          <div className="bg-blue w-1 absolute left-0 h-full z-10 animate-line"></div>
          <div className="absolute h-full z-10 -translate-x-full animate-green-shift-gradient"></div>
          <SliderPlaceholderImage />
          <SliderImage />
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1.5">
          <div className="flex items-center">
            <div className="bg-[url('/images/uniswap-logo.png')] w-10 h-10 rounded-full relative bg-cover before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:bg-white before:opacity-80 before:mix-blend-color" />
            <div className="bg-[url('/images/x-logo.png')] w-10 h-10 rounded-full -ml-3 relative bg-cover before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:bg-white before:opacity-80 before:mix-blend-color" />
            <div className="bg-[url('/images/curve-logo-slider.png')] w-10 h-10 rounded-full -ml-3 relative bg-cover before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:bg-white before:opacity-80 before:mix-blend-color" />
            <div className="bg-[url('/images/pancake-swap-logo.png')] w-10 h-10 rounded-full -ml-3 relative bg-cover before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:bg-white before:opacity-80 before:mix-blend-color" />
            <div className="bg-[url('/images/sushi-swap-logo.png')] w-10 h-10 rounded-full -ml-3 relative bg-cover before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:bg-white before:opacity-80 before:mix-blend-color" />
          </div>

          <div className="flex justify-between items-center gap-5">
            <span className="text-24">Only supports</span>
            <span className="text-40 block min-w-[166px]">ERC-20</span>
          </div>
        </div>
        <div className="relative h-[180px] rounded-3 overflow-hidden">
          <div className="bg-blue w-1 absolute left-0 h-full z-10 animate-line-red"></div>
          <div className="absolute h-full z-10 -translate-x-full animate-red-shift-gradient"></div>
          <SliderPlaceholderImage color={SliderColor.RED} />
          <SliderImage color={SliderColor.RED} />
        </div>
      </div>
    </div>
  );
}
