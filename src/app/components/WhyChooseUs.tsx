import clsx from "clsx";
import Image from "next/image";
import React from "react";

import ArticleHeading from "@/components/ArticleHeading";
import Svg from "@/components/atoms/Svg";
import NeonBlock from "@/components/organisms/NeonBlock";

function RedLeftBlock() {
  return (
    <div className="max-md:hidden text-18 font-normal absolute -translate-x-full w-[289px] h-[278px] top-1/2 ">
      <div className="absolute w-full h-full top-0 left-0 reveal-diagonal-l">
        <Image src="/images/dashed-red-line-1.svg" alt={""} width={290} height={279} />
      </div>
      <div className="absolute -left-1/2 translate-y-full flex flex-col gap-3 text-red-text animate-approval-red">
        <div className="red-shadow border border-red-light flex items-center gap-2  min-w-[312px] pl-5 rounded-3 py-3 bg-gradient-to-r from-red-bg to-secondary-bg">
          <Svg size={32} className="text-red-light" iconName="edit" /> ERC-20 approval needed
        </div>
        <div className="red-shadow border border-red-light flex items-center gap-2 min-w-[312px] pl-5 rounded-3 py-3 bg-gradient-to-r from-red-bg to-secondary-bg">
          <Svg size={32} className="text-red-light" iconName="gas" /> Higher gas price
        </div>
      </div>
    </div>
  );
}

function GreenTopBlock() {
  return (
    <div className="max-md:hidden w-[283px] h-[48px] absolute right-0 translate-x-full bottom-[calc(50%_-_5px)]">
      <div className="absolute w-full h-full top-0 left-0 reveal-diagonal">
        <Image src="/images/dashed-green-line-2.svg" alt={""} width={283} height={37} />
      </div>

      <div className="absolute bg-gradient-to-r from-green-bg to-secondary-bg  right-0 translate-x-1/2 top-0 -translate-y-full px-5 pt-3 pb-5 min-w-[312px] border border-[#7DA491] rounded-3 animate-approval-green-top">
        <div className="text-primary-text flex items-center gap-2 mb-3">
          <Svg size={32} className="text-green" iconName="gas" /> Lower gas price
        </div>
        <div className="text-secondary-text bg-[#0C1812B2] p-5 flex flex-col gap-1 items-center rounded-2 relative">
          <div className="w-[88px] bottom-0 h-full bg-[url('/images/bg-gas-price-red.svg')] absolute left-2.5" />
          <div className="w-[88px] bottom-0 h-full bg-[url('/images/bg-gas-price-green.svg')] absolute left-2.5 animate-reveal-top" />
          Gas price
          <span className="text-green-hover block relative text-28 leading-[28px] font-medium">
            <div className="relative overflow-hidden">
              <span className="relative text-red-light animate-drop-down">~$42.12</span>
              <span className="absolute left-0 -top-10 animate-drop-zero">~$15.32</span>
            </div>

            <Svg
              iconName="low"
              size={32}
              className="absolute -right-[19px] -top-[25px] text-red-light translate-x-full animate-svg-drop-down"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

function GreenBottomBlock() {
  return (
    <div className="max-md:hidden w-[217px] h-[206px] absolute rounded-tr-3 right-0 translate-x-full top-[calc(50%_+_5px)] border-[#404945]">
      <div className="absolute w-full h-full top-0 left-0 reveal-diagonal-br">
        <Image src="/images/dashed-green-line-1.svg" alt={""} width={217} height={206} />
      </div>
      <div className="absolute bg-gradient-to-r from-green-bg to-secondary-bg right-0 bottom-0 translate-x-1/2 translate-y-full px-5 pt-3 pb-5 min-w-[312px] border border-[#7DA491] rounded-3 animate-approval-green-bottom">
        <div className="text-primary-text flex items-center gap-2 mb-3">
          <Svg size={32} className="text-green" iconName="edit-off" /> No need for approval
        </div>
        <div className="text-secondary-text bg-[#0C1812B2] p-5 flex flex-col gap-1 rounded-2 relative">
          <div className="w-[120px] bottom-0 h-full bg-[url('/images/bg-approval-green.svg')] absolute right-0" />
          <div className="flex items-center gap-2  relative">
            <Image
              className="animate-opacity-to-20"
              src="/images/tokens/USDT.svg"
              alt={""}
              width={32}
              height={32}
            />
            Approve
            <div className="absolute bg-primary-border opacity-60 h-1 w-0 top-1/2 -translate-y-1/2 -left-2 animate-strike text-tertiary-text" />
          </div>
          <div className="ml-3.5 bg-primary-bg rounded-full h-4 w-1" />
          <div className="flex items-center gap-2 text-primary-text">
            <div className="rounded-full bg-green-bg flex items-center justify-center w-8 h-8">
              <Svg className="text-green-hover rotate-90" size={24} iconName="swap-horizontal" />
            </div>
            Swap
          </div>
        </div>
      </div>
    </div>
  );
}

function RedLeftBlockMobile() {
  return (
    <div className="text-16 md:text-18 font-normal absolute -translate-x-1/2 w-[16px] h-[464px] bottom-1/2  md:hidden">
      <div className="absolute w-full h-full bottom-0 left-0 reveal-diagonal-l-mobile">
        <Image src="/images/dashed-red-line-mobile-1.svg" alt={""} width={290} height={279} />
      </div>
      <div className="absolute left-full top-4 flex flex-col gap-3 text-red-text animate-approval-red-mobile">
        <div className="red-shadow border border-red-light flex items-center gap-2  min-w-[264px] pl-5 rounded-3 py-2 bg-gradient-to-r from-red-bg to-secondary-bg">
          <Svg size={24} className="text-red-light" iconName="edit" /> ERC-20 approval needed
        </div>
        <div className="red-shadow border border-red-light flex items-center gap-2 min-w-[264px] pl-5 rounded-3 py-2 bg-gradient-to-r from-red-bg to-secondary-bg">
          <Svg size={24} className="text-red-light" iconName="gas" /> Higher gas price
        </div>
      </div>
    </div>
  );
}

function GreenTopBlockMobile() {
  return (
    <div className="w-4 h-[290px] absolute right-0 bottom-1/2 translate-x-1/2 md:hidden">
      <div className="absolute w-full h-full top-0 left-0 reveal-diagonal">
        <Image src="/images/dashed-green-line-mobile-2.svg" alt={""} width={283} height={37} />
      </div>

      <div className="absolute bg-gradient-to-r from-green-bg to-secondary-bg  -top-5 right-full px-4 pt-3 pb-4 min-w-[264px] border border-[#7DA491] rounded-3 animate-approval-green-top-mobile">
        <div className="text-primary-text flex items-center gap-2 mb-2">
          <Svg className="text-green" iconName="gas" /> Lower gas price
        </div>
        <div className="text-secondary-text bg-[#0C1812B2] px-5 py-3 flex flex-col gap-1 items-center rounded-2 relative">
          <div className="w-[88px] bottom-0 h-full bg-[url('/images/bg-gas-price-red.svg')] absolute left-2.5" />
          <div className="w-[88px] bottom-0 h-full bg-[url('/images/bg-gas-price-green.svg')] absolute left-2.5 animate-reveal-top" />
          Gas price
          <span className="text-green-hover block relative text-24 leading-[24px] font-medium">
            <div className="relative overflow-hidden">
              <span className="relative text-red-light animate-drop-down">~$42.12</span>
              <span className="absolute left-0 -top-10 animate-drop-zero">~$15.32</span>
            </div>

            <Svg
              iconName="low"
              className="absolute -right-[19px] -top-[25px] text-red-light translate-x-full animate-svg-drop-down"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

function GreenBottomBlockMobile() {
  return (
    <div className="w-[16px] h-[456px] absolute rounded-tr-3 right-0 bottom-1/2 translate-x-1/2 border-[#404945] md:hidden">
      <div className="absolute w-full h-full top-0 left-0 reveal-diagonal-br-mobile">
        <Image src="/images/dashed-green-line-mobile-1.svg" alt={""} width={217} height={206} />
      </div>
      <div className="absolute bg-gradient-to-r from-green-bg to-secondary-bg right-full -top-5 px-4 md:px-5 pt-2 md:pt-3 pb-4 md:pb-5 min-w-[264px] border border-[#7DA491] rounded-3 animate-approval-green-bottom-mobile">
        <div className="text-primary-text flex items-center gap-1 mb-2">
          <Svg size={24} className="text-green" iconName="edit-off" /> No need for approval
        </div>
        <div className="text-secondary-text bg-[#0C1812B2] p-3 flex flex-col gap-1 rounded-2 relative">
          <div className="w-[96px] bg-cover bottom-0 h-full bg-[url('/images/bg-approval-green.svg')] absolute right-0" />
          <div className="flex items-center gap-2  relative">
            <Image
              className="animate-opacity-to-20"
              src="/images/tokens/USDT.svg"
              alt={""}
              width={24}
              height={24}
            />
            Approve
            <div className="absolute bg-primary-border opacity-60 h-1 w-0 top-1/2 -translate-y-1/2 -left-2 animate-strike text-tertiary-text" />
          </div>
          <div className="ml-3.5 bg-primary-bg rounded-full h-4 w-1" />
          <div className="flex items-center gap-2 text-primary-text">
            <div className="rounded-full bg-green-bg flex items-center justify-center w-6 h-6">
              <Svg className="text-green-hover rotate-90" size={20} iconName="swap-horizontal" />
            </div>
            Swap
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <NeonBlock
      icon="target"
      color="green"
      overlineText="Uniquness"
      differentColumns
      fullWidth
      leftContent={
        <div className="grid lg:grid-cols-[53fr_41fr] grid-cols-1">
          <div>
            <ArticleHeading text="Why choose us?" />
            <div className="flex flex-col gap-5">
              <p className="text-16 lg:text-18 text-secondary-text">
                DEX223 is the first DEX to support both ERC-20 and ERC-223 standards. ERC-20 was the
                dominant standard for EVM chains since 2015 and its adoption led to exponentially
                increasing financial losses to the users of the ecosystem. We are here to stop the
                financial damage caused by obsolete early-days standards, user mistakes and approval
                scams.
              </p>
            </div>
          </div>

          <div className="col-span-2 row-span-1 mt-6 md:mt-[60px]">
            <div className="flex justify-center  max-md:pt-[340px]">
              <div className="max-2xl:scale-75 max-[1090px]:scale-[0.65] max-[925px]:scale-[0.6] max-[865px]:scale-[0.55] max-[800px]:scale-[0.5] max-[1090px]:-mt-10 max-[925px]:-mt-12 max-[865px]:-mt-[90px] max-[800px]:-mt-[140px] max-md:scale-110 max-md:mt-12 max-sm:scale-100 max-sm:mt-0 origin-center w-[296px] md:w-[470px] rounded-5 px-4 md:px-10 pb-4 md:pb-10 bg-primary-bg relative">
                <div className="w-[280px] h-[254px] max-md:hidden md:w-[630px] md:h-[573px] large-warn absolute -z-10 md:-left-[57px] -top-4 md:bottom-0 max-md:-translate-y-full md:-translate-x-1/2" />
                <div className="w-[280px] h-[254px] md:hidden md:w-[630px] md:h-[573px] large-warn-mobile absolute -z-10 md:-left-[57px] -top-4 md:bottom-0 max-md:-translate-y-full md:-translate-x-1/2" />
                <div className="w-[296px] md:w-[531px] max-md:hidden h-[365px] md:h-[654px] large-shield absolute -z-10 top-4 right-0 max-md:-translate-y-full md:-right-[130px] md:-bottom-[41px]" />
                <div className="w-[296px] md:w-[531px] md:hidden h-[365px] md:h-[654px] large-shield-mobile absolute -z-10 top-4 right-0 max-md:-translate-y-full md:-right-[130px] md:-bottom-[41px]" />

                <div className="flex justify-between items-center py-2.5 md:py-[18px] text-18 text-tertiary-text bg-inherit z-10 relative">
                  <span className="text-primary-text font-bold">Swap</span>
                  <Svg iconName="settings" />
                </div>

                <div className="bg-secondary-bg rounded-3 px-4 md:px-5 pt-3 md:pt-4 pb-4 md:pb-5">
                  <p className="text-12 md:text-14 text-secondary-text">You pay</p>
                  <div className="flex justify-between items-center mt-1 mb-3 md:my-1.5">
                    <span className="text-tertiary-text text-28 leading-[40px]">0</span>
                    <div className="rounded-[100px] bg-primary-bg flex items-center gap-1 py-1.5 pr-3 pl-2.5 text-tertiary-text">
                      <Image
                        className="opacity-30"
                        width={20}
                        height={20}
                        src={"/images/tokens/USDT.svg"}
                        alt={""}
                      />
                      USDT
                    </div>
                  </div>

                  <div className="border border-secondary-border rounded-2 grid grid-cols-2 -mx-6 md:-mx-10 relative animate-erc-bg">
                    <div className="rounded-2 absolute w-1/2 animate-erc before:border-transparent before:block before:rounded-2 h-full left-0 top-0 z-10 ">
                      <div className="absolute w-full h-full animate-add-outline border-transparent border-2 rounded-2 border-green" />
                      <div className="z-10 absolute px-2 md:px-3 bg-green-hover text-14 md:text-18 top-0 opacity-0 -right-3.5 rounded-3 text-secondary-bg animate-appear-safe-choice">
                        SAFE CHOICE
                      </div>
                    </div>
                    <div className="flex justify-center py-[9px] md:py-[13px]  rounded-2 text-18  md:text-24 font-medium relative z-10">
                      ERC-20
                    </div>
                    <div className="flex justify-center py-[9px] md:py-[13px] rounded-2 text-18  md:text-24 font-medium relative z-10">
                      ERC-223
                    </div>

                    <RedLeftBlock />
                    <GreenTopBlock />
                    <GreenBottomBlock />

                    <RedLeftBlockMobile />
                    <GreenTopBlockMobile />
                    <GreenBottomBlockMobile />
                  </div>
                </div>
                <div className="relative h-4 md:h-5 z-10">
                  <div
                    className={clsx(
                      "group border-[3px] border-primary-bg !outline  !outline-primary-bg w-10 h-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary-bg rounded-full flex items-center justify-center duration-200    before:opacity-0 before:duration-200 before:absolute before:w-4 before:h-4 before:rounded-full before:bg-green-hover-icon before:blur-[20px] text-green",
                    )}
                  >
                    <Svg className={clsx("relative duration-200 ")} iconName="swap-horizontal" />
                  </div>
                </div>
                <div className="bg-secondary-bg rounded-3 px-4 md:px-5 pt-4 pb-4 md:pb-5 mb-4 md:mb-5">
                  <p className="text-12 md:text-14 text-secondary-text">You receive</p>
                  <div className="flex justify-between items-center my-1.5">
                    <span className="text-tertiary-text text-28 ">0</span>
                    <div className="rounded-[100px] bg-primary-bg flex items-center gap-1 py-1.5 pr-3 pl-2.5 text-tertiary-text">
                      <Image
                        className="opacity-30"
                        width={20}
                        height={20}
                        src={"/images/tokens/DAI.svg"}
                        alt={""}
                      />
                      DAI
                    </div>
                  </div>
                  <div className="border border-secondary-border rounded-2 grid grid-cols-2 text-24 font-medium overflow-hidden relative animate-erc-bg">
                    <div className="rounded-2 absolute w-1/2 animate-erc-bottom h-full left-0 top-0" />
                    <div className="flex justify-center py-[9px] md:py-[13px]  rounded-2 text-18  md:text-24 font-medium relative z-10">
                      ERC-20
                    </div>
                    <div className="flex justify-center py-[9px] md:py-[13px] rounded-2 text-18  md:text-24 font-medium relative z-10">
                      ERC-223
                    </div>
                  </div>
                </div>

                <div className="bg-green text-18 font-medium rounded-3 text-secondary-bg text-center h-12 md:h-[60px] flex items-center justify-center">
                  Swap
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
