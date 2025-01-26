import Button, { ButtonColor, ButtonSize } from "@/components/atoms/Button";
import Svg from "@/components/atoms/Svg";
import Container from "@/components/Container";

export default function Banner() {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] w-full pt-10 lg:pt-[80px]">
        <div>
          <h1 className="text-30 lg:text-48 3xl:text-56 mb-3">
            <span className="text-green">DEX223</span>: Decentralized exchange for{" "}
            <span className="text-green">ERC-223</span> &{" "}
            <span className="text-purple">ERC-20</span> tokens!
          </h1>
          <p className="text-secondary-text text-16 lg:text-18 mb-6 lg:mb-8">
            Secure, gas-efficient, fully decentralized exchange built with Ethereum smart-contracts.
          </p>

          <div className="flex items-center mb-6 lg:mb-8 gap-3 flex-wrap">
            <Button size={ButtonSize.EXTRA_LARGE} mobileSize={ButtonSize.LARGE}>
              <span className="flex items-center gap-2">
                DEX223 test-app
                <Svg iconName="forward" />
              </span>
            </Button>
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
          </div>

          <div className="rounded-3 border-l-4 border-green flex gap-2 py-2 lg:py-3.5 bg-primary-bg pl-3 pr-4 lg:pr-5 lg:pl-4 w-full">
            <Svg className="flex-shrink-0 text-green mt-px" iconName="calendar" />
            <p className="text-secondary-text text-16 lg:text-18 font-medium">
              First Round of ICO is concluded 1st CEX listing of D223 happened on 25 January 2025
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
