"use client";

import clsx from "clsx";
import React, { useMemo, useRef } from "react";

import OverlineText from "@/components/atoms/OverlineText";
import Svg from "@/components/atoms/Svg";
import { IconName } from "@/components/atoms/Svg/svgIconsMap";
import Container from "@/components/Container";
import { clsxMerge } from "@/functions/clsxMerge";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface Props {
  icon: IconName;
  color: "green" | "blue" | "purple";
  overlineText: string;
  leftContent: any;
  rightContent?: any;
  differentColumns?: boolean;
  anchor?: string;
  onlyBottom?: boolean;
  noAnimation?: boolean;
  fullWidth?: boolean;
}

export default function NeonBlock({
  icon,
  color,
  overlineText,
  leftContent,
  rightContent,
  differentColumns = false,
  anchor,
  onlyBottom = false,
  noAnimation = false,
  fullWidth = false,
}: Props) {
  const ref = useRef(null);
  const entryTopLine = useIntersectionObserver(ref, { threshold: 0 });
  const entryBottomLine = useIntersectionObserver(ref, { threshold: 0.5 });

  const isBottomVisible = useMemo(() => {
    if (!entryBottomLine) {
      return false;
    }
    return (
      entryBottomLine.boundingClientRect.bottom < window.innerHeight &&
      entryBottomLine.boundingClientRect.bottom > 0
    );
  }, [entryBottomLine]);

  const colorStylesBottom = {
    green: "bg-gradient-to-b from-green to-transparent",
    blue: "bg-gradient-to-b from-blue to-transparent",
    purple: "bg-gradient-to-b from-purple to-transparent",
  };

  const colorStylesTop = {
    green: "bg-gradient-to-t from-green to-transparent",
    blue: "bg-gradient-to-t from-blue to-transparent",
    purple: "bg-gradient-to-t from-purple to-transparent",
  };

  return (
    <Container>
      <div
        className={clsxMerge(
          "grid gap-x-2 gap-y-4 lg:gap-6 grid-areas-[top-line_right-content,icon_heading,bottom-line_left-content] lg:grid-areas-[top-line_._right-content,icon_heading_right-content,bottom-line_left-content_right-content] lg:pl-5",
          "grid-cols-[24px_1fr] lg:grid-cols-[48px_calc(50%_-_136px)_calc(50%_-_28px)]",
          "grid-rows-[minmax(56px,_auto)_24px_auto] lg:grid-rows-[minmax(120px,_auto)_48px_auto]",
          differentColumns && "grid-cols-[24px_1fr] lg:grid-cols-[48px_53fr_41fr] ",
          onlyBottom && "grid-cols-[auto_24px_auto] lg:grid-rows-[auto_48px_auto]",
          fullWidth &&
            "grid-cols-[24px_1fr] lg:grid-cols-[48px_1fr] grid-areas-[top-line_.,icon_heading,bottom-line_left-content]",
        )}
      >
        {/* Top Line */}
        <div className="flex flex-col items-center relative grid-in-[top-line]">
          <div
            className={clsx(
              "w-1 h-0 transition-all duration-500 ease-in-out",
              colorStylesTop[color],
              (entryTopLine?.isIntersecting || noAnimation) && "h-full",
            )}
          />
          {anchor && (
            <span
              id={anchor}
              className={clsxMerge(
                "absolute bottom-[102px] invisible",
                onlyBottom && "-bottom-[10px]",
              )}
            />
          )}
        </div>

        {/* Icon */}
        <div
          className={clsx(
            "flex justify-center items-center opacity-0 transition-opacity duration-200 grid-in-[icon]",
            (entryBottomLine?.isIntersecting || isBottomVisible || noAnimation) && "opacity-100",
          )}
        >
          <div className="relative w-6 lg:w-12 h-6 lg:h-12">
            <Svg iconName={icon} layout="cover" />
            <div
              className={clsx(
                "absolute inset-0 blur-[20px]",
                color === "green" && "bg-green",
                color === "blue" && "bg-blue",
                color === "purple" && "bg-purple",
              )}
            />
          </div>
        </div>

        {/* Overline Text */}
        <div className="flex items-center grid-in-[heading]">
          <OverlineText text={overlineText} color={color} />
        </div>

        {/* Bottom Line */}
        <div ref={ref} className="flex flex-col items-center relative grid-in-[bottom-line]">
          <div
            className={clsx(
              "w-1 h-0 transition-all duration-500 ease-in-out delay-100",
              colorStylesBottom[color],
              (entryBottomLine?.isIntersecting || isBottomVisible || noAnimation) && "h-full",
            )}
          />
        </div>

        {/* Left Content */}
        <div className="text-white grid-in-[left-content]">{leftContent}</div>

        {/* Right Content */}
        {!fullWidth && <div className="grid-in-[right-content]">{rightContent}</div>}
      </div>
    </Container>
  );
}
