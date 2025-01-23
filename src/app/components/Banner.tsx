import Container from "@/components/Container";
import Button, { ButtonColor } from "@/components/atoms/Button";
import Svg from "@/components/atoms/Svg";

export default function Banner() {
  return <Container>
    <div className="grid grid-cols-[7fr_5fr] w-full pt-[80px]">
      <div>
        <h1 className="text-56 mb-3">
          <span className="text-green">DEX223</span>: Decentralized exchange for <span className="text-green">ERC-223</span> & <span className="text-purple">ERC-20</span> tokens!
        </h1>
        <p className="text-secondary-text text-18 mb-8">
          Secure, gas-efficient, fully decentralized exchange built with Ethereum smart-contracts.
        </p>

        <div className="flex items-center mb-8 gap-3">
          <Button>DEX223 test-app</Button>
          <Button colorScheme={ButtonColor.LIGHT_GREEN}>Buy/Sell D223</Button>
        </div>

        <div className="rounded-3 border-l-4 border-green flex items-center gap-2 py-3.5 bg-primary-bg pl-4 w-full">
          <Svg iconName="collected-data" />
          <p className="text-secondary-text text-18 font-medium">
            First Round of ICO is concluded 1st CEX listing of D223 happened on 18 January 2025
          </p>
        </div>
      </div>
    </div>
  </Container>
}
