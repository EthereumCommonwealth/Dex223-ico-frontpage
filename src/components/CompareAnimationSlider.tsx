import clsx from "clsx";
import Image from "next/image";
import { ReactNode } from "react";

import Svg from "@/components/atoms/Svg";

enum SliderColor {
  GREEN,
  RED,
}

function PlaceholderOption({ className }: { className: string }): ReactNode {
  return (
    <div className="flex items-center gap-1 lg:gap-3  pl-2 lg:pl-5">
      <div className="relative">
        <div className="w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-[#2B2F32]" />
      </div>
      <div className={clsx("max-lg:mt-1 h-2 lg:h-4 rounded-1 bg-[#2B2F32]", className)} />
    </div>
  );
}

function SliderPlaceholderImage({ color = SliderColor.GREEN }: { color?: SliderColor }) {
  return (
    <div className="absolute w-full h-full bg-[#1D2123] pt-3">
      <div className="flex items-center gap-1 lg:gap-2 pl-2 lg:pl-3.5">
        <div className="w-5 h-5 lg:w-9 lg:h-9 rounded-full bg-[#2B2F32]" />
        <div
          className={clsx(
            "h-2 lg:h-4 rounded-1 bg-[#2B2F32]",
            color === SliderColor.GREEN ? "w-[76px] lg:w-[86px]" : "w-[131px] md:w-[149px]",
          )}
        />
      </div>
      <div className="px-3 lg:px-5">
        <div className="bg-white opacity-10 w-full h-px lg:mt-3 lg:mb-4 my-2" />
      </div>
      <div className="flex flex-col max-lg:gap-3 gap-2 pb-4">
        <PlaceholderOption
          className={color === SliderColor.GREEN ? "w-[47px] lg:w-[54px]" : "w-[76px] lg:w-[284px]"}
        />
        <PlaceholderOption
          className={
            color === SliderColor.GREEN ? "w-[236px] lg:w-[270px]" : "w-[183px] lg:w-[209px]"
          }
        />
        <PlaceholderOption
          className={
            color === SliderColor.GREEN
              ? "w-[253px] lg:w-[264px] max-w-full mr-3"
              : "w-[260px] lg:w-[295px] max-w-full mr-3"
          }
        />
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
          <Svg size={20} iconName="forward-small" />
        </a>
      </span>
    ),
    option2: 'Require "approving" tokens',
    option3: "Simple mistake, permanent token loss",
  },
};

function SliderOption({
  color = SliderColor.GREEN,
  text,
  className = "",
}: {
  color?: SliderColor;
  text: string | ReactNode;
  className?: string;
}) {
  return (
    <div className="flex gap-1 lg:gap-3  pl-2 lg:pl-5">
      <div className="max-lg:top-0.5 relative">
        <div
          className={clsx(
            "w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-cover",
            color === SliderColor.RED
              ? "bg-[url('/images/slider-check-red.png')]"
              : "bg-[url('/images/slider-check-green.png')]",
          )}
        ></div>
      </div>
      <div className={clsx("text-14 lg:text-16 text-secondary-text", className)}>{text}</div>
    </div>
  );
}

function OtherLogo({ bgClassName }: { bgClassName: string }) {
  return (
    <div
      className={clsx(
        "w-6 h-6 lg:w-8 lg:h-8 2xl:w-10 2xl:h-10 rounded-full relative bg-cover before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:bg-white before:opacity-80 before:mix-blend-color",
        bgClassName,
      )}
    />
  );
}

function SliderImage({ color = SliderColor.GREEN }: { color?: SliderColor }) {
  return (
    <div
      className={clsx(
        "w-full h-full bg-gradient-to-r  pt-3 animate-reveal",
        color === SliderColor.RED ? "from-[#211C1C] to-[#352C2C]" : "from-[#171C19] to-[#282D2B]",
      )}
    >
      <div className="absolute right-[27px] bottom-0">
        <Image width={131} height={109} src={icons[color].bgIcon} alt="" />
      </div>
      <div className="flex items-center gap-1 lg:gap-2 pl-2 lg:pl-3.5">
        <div
          className={clsx(
            "w-5 h-5 lg:w-9 lg:h-9 rounded-full  flex items-center justify-center",
            color === SliderColor.RED ? "bg-red-bg" : "bg-green-bg",
          )}
        >
          <div className="w-4 h-4 lg:w-6 lg:h-6 relative">
            <Image fill style={{ objectFit: "cover" }} alt={""} src={icons[color].mainIcon} />
          </div>
        </div>
        <div
          className={clsx(
            "text-14 lg:text-16",
            color === SliderColor.RED ? "text-red-light" : "text-green",
          )}
        >
          {texts[color].title}
        </div>
      </div>
      <div className="px-3 lg:px-5">
        <div className="bg-white opacity-10 w-full h-px lg:mt-3 lg:mb-4 my-2" />
      </div>
      <div className="flex flex-col gap-2 pb-4 relative pr-3">
        <SliderOption className="whitespace-nowrap" text={texts[color].option1} color={color} />
        <SliderOption text={texts[color].option2} color={color} />
        <SliderOption text={texts[color].option3} color={color} />
      </div>
    </div>
  );
}

export default function CompareAnimationSlider() {
  return (
    <div className="max-w-[588px] max-lg:mt-6">
      <div className="mb-6 lg:mb-[64px]">
        <div className="flex justify-between mb-1.5">
          <div className="flex items-center">
            <div className="relative w-6 h-6 lg:w-8 lg:h-8 2xl:w-10 2xl:h-10">
              <Image
                src={"/images/network_slider_main.png"}
                alt={"Dex223"}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center gap-2 lg:gap-3 2xl:gap-5">
            <span className="text-14 lg:text-18 2xl:text-24 font-medium text-secondary-text  block min-w-[105px] lg:min-w-[130px] 2xl:min-w-[180px] ">
              First to support
            </span>
            <p className="font-medium text-24 lg:text-30 2xl:text-40 block min-w-[100px] lg:min-w-[123px] 2xl:min-w-[166px] text-right bg-gradient-to-r text-transparent from-[#CDF5E2] bg-clip-text to-green">
              ERC-223
            </p>
          </div>
        </div>
        <div className="relative rounded-3 overflow-hidden">
          <div className="bg-blue w-1 absolute left-0 h-full z-10 animate-line"></div>
          <div className="absolute h-full z-10 -translate-x-full animate-green-shift-gradient"></div>
          <SliderPlaceholderImage />
          <SliderImage />
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1.5">
          <div className="flex items-center origin-left">
            <OtherLogo bgClassName="bg-[url('/images/uniswap-logo.png')] " />
            <OtherLogo bgClassName="bg-[url('/images/x-logo.png')] -ml-2 lg:-ml-3" />
            <OtherLogo bgClassName="bg-[url('/images/curve-logo-slider.png')] -ml-2 lg:-ml-3 " />
            <OtherLogo bgClassName="bg-[url('/images/pancake-swap-logo.png')] -ml-2 lg:-ml-3" />
            <OtherLogo bgClassName="bg-[url('/images/sushi-swap-logo.png')] -ml-2 lg:-ml-3" />
          </div>

          <div className="flex justify-between items-center gap-2 lg:gap-3 2xl:gap-5">
            <span className="text-14 lg:text-18 2xl:text-24 font-medium block min-w-[105px] lg:min-w-[134px] 2xl:min-w-[180px] text-secondary-text">
              Only supports
            </span>
            <span className="font-medium text-24 lg:text-30 2xl:text-40 block min-w-[100px] lg:min-w-[123px] 2xl:min-w-[166px] text-right bg-gradient-to-r text-transparent from-[#F0B1B1] bg-clip-text to-[#B15A5A]">
              ERC-20
            </span>
          </div>
        </div>
        <div className="relative rounded-3 overflow-hidden">
          <div className="bg-blue w-1 absolute left-0 h-full z-10 animate-line-red"></div>
          <div className="absolute h-full z-10 -translate-x-full animate-red-shift-gradient"></div>
          <SliderPlaceholderImage color={SliderColor.RED} />
          <SliderImage color={SliderColor.RED} />
        </div>
      </div>
    </div>
  );
}
