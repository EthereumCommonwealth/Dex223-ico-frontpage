import clsx from "clsx";
import { useMemo } from "react";

interface Props {
  size?: number;
  type?: "circular" | "linear" | "awaiting";
  color?: "green" | "black";
  smallDots?: boolean;
}

export default function Preloader({
  size = 24,
  type = "circular",
  color = "green",
  smallDots = false,
}: Props) {
  const internalSize = useMemo(() => {
    return size / Math.sqrt(2);
  }, [size]);

  switch (type) {
    case "circular":
      return (
        <div
          style={{ width: size, height: size }}
          className="flex items-center justify-center relative"
        >
          <div
            style={{ borderWidth: size > 50 ? 4 : 2 }}
            className={clsx(
              "rounded-full border-4 border-transparent top-0 left-0 w-full h-full bg-transparent animate-spin",
              color === "green" && "border-t-green border-l-green border-r-green",
              color === "black" &&
                "border-t-secondary-bg border-l-secondary-bg border-r-secondary-bg",
            )}
          />
        </div>
      );
    case "linear":
      return (
        <div className="flex items-center gap-[5px]" style={{ height: size }}>
          <span
            className={clsx(
              "block rounded-full animate-flicker1 bg-green",
              smallDots ? "w-[6px] h-[6px]" : "w-2 h-2 ",
            )}
          />
          <span
            className={clsx(
              "block rounded-full animate-flicker2 bg-green",
              smallDots ? "w-[6px] h-[6px]" : "w-2 h-2 ",
            )}
          />
          <span
            className={clsx(
              "block rounded-full animate-flicker3 bg-green",
              smallDots ? "w-[6px] h-[6px]" : "w-2 h-2 ",
            )}
          />
        </div>
      );
    case "awaiting":
      return (
        <div className="flex items-center justify-center" style={{ width: size, height: size }}>
          <div
            style={{ width: internalSize, height: internalSize }}
            className={`rotate-45 relative`}
          >
            {[0, 1, 2, 3, 4].map((v) => {
              return (
                <div
                  key={v}
                  className="absolute animate-orbit w-full h-full"
                  style={{ animationDelay: `${v * 100}ms`, opacity: 1 - 0.2 * (v + 1), zIndex: v }}
                >
                  <div
                    style={{
                      width: internalSize / 5,
                      height: internalSize / 5,
                      boxShadow: `0px 0px ${internalSize / 2.5}px 2px #3ae374`,
                    }}
                    className="absolute top-0 left-0 shadow-orbit w-[10px] h-[10px] bg-green rounded-full"
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
  }
}

export function CircularProgress({ size = 24 }: Props) {
  return (
    <div
      className="MuiCircularProgressIndeterminate"
      role="progressbar"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg viewBox="22 22 44 44">
        <circle
          className="MuiCircularProgressCircleIndeterminate stroke-green"
          cx="44"
          cy="44"
          r="20.2"
          fill="none"
          strokeWidth="3.6"
        />
      </svg>
    </div>
  );
}
