import Button, { ButtonColor, ButtonSize } from "@/components/atoms/Button";
import Pattern, { PatternColor } from "@/components/atoms/Pattern";
import Svg from "@/components/atoms/Svg";
import CompareAnimationSlider from "@/components/CompareAnimationSlider";
import Container from "@/components/Container";

export default function Banner() {
  return (
    <Container>
      <Pattern patternColor={PatternColor.PURPLE} className="w-250 h-250 -left-[680px] top-10" />
      <Pattern
        patternColor={PatternColor.GREEN}
        className="w-250 h-250 -right-[461px] bg-cover top-0 opacity-10 -z-10 -scale-100"
      />
      <div className="grid grid-cols-1 lg:grid-cols-[6fr_1fr_5fr] w-full pt-10 lg:pt-[80px]">
        <div className="flex flex-col justify-center">
          <div className="flex mb-3">
            <div className="relative py-1.5 text-18">
              <div className="absolute top-0 left-0 right-0 w-full h-px bg-gradient-to-r from-secondary-bg via-[#C76060] to-secondary-bg" />
              <div className="absolute bottom-0 left-0 right-0 w-full h-px bg-gradient-to-r from-secondary-bg via-[#C76060] to-secondary-bg" />
              <p className="bg-gradient-to-r text-transparent from-[#F0B1B1] bg-clip-text to-[#B15A5A] font-medium">
                ERC-20 standard is insecure
              </p>
            </div>
          </div>

          <h1 className="text-30 lg:text-48 3xl:text-56 mb-4 lg:mb-5 font-medium tracking-[-0.025em] leading-[1.12]">
            First decentralized exchange to support{" "}
            <span className="bg-gradient-to-r text-transparent from-[#CDF5E2] bg-clip-text to-green">
              ERC-223
            </span>{" "}
            standard
          </h1>
          <p className="text-secondary-text text-16 lg:text-18 mb-6 lg:mb-8 max-w-[560px]">
            Other exchanges keep supporting ERC-20 leading to proliferation of insecure standards
            and losses of funds. DEX223 is first to support ERC-223 which solves these problems
          </p>

          <div className="flex items-center mb-6 lg:mb-8 gap-3 flex-wrap">
            <a target="_blank" href="https://test-app.dex223.io/en/">
              <Button size={ButtonSize.EXTRA_LARGE} mobileSize={ButtonSize.LARGE}>
                <span className="flex items-center gap-2">
                  DEX223 test-app
                  <Svg iconName="forward" />
                </span>
              </Button>
            </a>
            <a
              target="_blank"
              href="https://app.dex223.io/en/swap?tokenB=0x675eb5922604F434bcaAC4B4B433D8668925DD67"
            >
              <Button
                size={ButtonSize.EXTRA_LARGE}
                colorScheme={ButtonColor.LIGHT_GREEN}
                mobileSize={ButtonSize.LARGE}
              >
                <span className="flex items-center gap-2">
                  Buy/Sell D223
                  <Svg iconName="forward" />
                </span>
              </Button>
            </a>
          </div>
        </div>
        <div />
        <CompareAnimationSlider />
      </div>
    </Container>
  );
}
