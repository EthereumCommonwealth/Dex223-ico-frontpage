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
        <div>
          <h1 className="text-30 lg:text-48 3xl:text-56 mb-3 text-medium">
            <span className="text-green">DEX223</span>: Decentralized exchange for{" "}
            <span className="text-green">ERC-223</span> &{" "}
            <span className="text-purple">ERC-20</span> tokens!
          </h1>
          <p className="text-secondary-text text-16 lg:text-18 mb-6 lg:mb-8">
            Other exchanges keep supporting ERC-20 leading to proliferation of insecure standards
            and losses of funds. DEX223 is first to support ERC-223 which solves this problems
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
              href="https://www.bitmart.com/trade/en-US?type=spot&symbol=D223_USDT"
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

          <div className="rounded-3 border-l-4 border-green flex gap-2 py-2 lg:py-3.5 bg-primary-bg pl-3 pr-4 lg:pr-5 lg:pl-4 w-full">
            <Svg className="flex-shrink-0 text-green mt-px" iconName="calendar" />
            <p className="text-secondary-text text-16 lg:text-18 font-medium">
              Dex223 achieved its inaugural centralized exchange (CEX) listing of D223 token on
              January 25, 2025. Currently, Dex223 smart contracts are undergoing an external audit.
            </p>
          </div>
        </div>
        <div />
        <CompareAnimationSlider />
      </div>
    </Container>
  );
}
