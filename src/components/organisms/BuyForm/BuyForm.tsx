// @ts-nocheck
import React, {ChangeEvent, useCallback, useMemo, useState} from "react";
import styles from "./BuyForm.module.scss";
import {
  TEST_DEX223,
  tokensToPayWithForPreSale
} from "../../../constants/tokens";
import clsx from "clsx";
import Image from "next/image";
import TokenCard from "../TokenCard";
import Button from "../../atoms/Button";
import {useWeb3Modal} from "@web3modal/react";
import Spacer from "../../atoms/Spacer";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite, useNetwork,
  usePrepareContractWrite, useSwitchNetwork,
  useWaitForTransaction
} from "wagmi";
import testICOABI from "../../../constants/abis/testICOABI.json";
import {formatUnits, parseUnits} from "viem";
import ERC20ABI from "../../../constants/abis/erc20.json";
import Preloader from "../../atoms/Preloader";


const ICOContract: `0x${string}` = "0xF8e0fa622025BB391d2136f3c52D8dA5611a68ED";

function ActionButton({isApproved, isEnoughBalance, handleApprove, handleBuy, isAmountEntered, isApproving, symbol, waitingForApprove, chainId}) {
  const {open, close, setDefaultChain} = useWeb3Modal();
  const {address, isConnected} = useAccount();
  const { switchNetwork } = useSwitchNetwork();

  if(!isAmountEntered) {
    return <Button disabled>Enter amount</Button>;
  }

  if(!isConnected) {
    return <Button onClick={open}>Connect wallet</Button>;
  }

  if(!isEnoughBalance) {
    return <Button disabled>Insufficient balance</Button>;
  }

  if(Boolean(chainId) && chainId !== 820) {
    return <Button onClick={() => switchNetwork(820)}>Switch to Callisto Network</Button>
  }

  if(isApproving) {
    return <Button onClick={handleApprove} disabled>
      <span className={styles.waitingContent}>
        <span>Approving</span>
        <Preloader type="circular" size={24} />
      </span>
    </Button>
  }

  if(waitingForApprove) {
    return <Button onClick={handleApprove} disabled>
        <Preloader type="circular" size={24} />
    </Button>
  }

  if(!isApproved) {
    return <Button onClick={handleApprove}>Approve {symbol}</Button>
  }

  return <Button onClick={handleBuy}>Buy Tokens</Button>
}

export default function BuyForm() {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const [amountToPay, setAmountToPay] = useState("");

  const [pickedTokenId, setPickedTokenId] = useState(100);

  const contractBalance = useBalance({
    address: "0xF8e0fa622025BB391d2136f3c52D8dA5611a68ED",
    token: "0xf5717D6c1cbAFE00A4c800B227eCe496180244F9",
    chainId: 820,
    watch: true
  });

  const pickedToken = useMemo(() => {
    return tokensToPayWithForPreSale.find((token) => token.id === pickedTokenId);
  }, [pickedTokenId]);

  const {data: readData, isLoading} = useContractRead({
    address: ICOContract,
    abi: testICOABI,
    functionName: "getRewardAmount",
    chainId: pickedToken.chainId,
    args: [
      pickedToken.id === 11 ? "0x0000000000000000000000000000000000000000" : pickedToken.address,
      parseUnits(amountToPay, pickedToken.decimals)
    ]
  });

  const {data: tokenToPayBalance} = useBalance({
    address,
    token: pickedToken.id !== 11 ? pickedToken.address : undefined,
    watch: true,
    chainId: pickedToken.chainId
  });

  const {data: testToken223Balance} = useBalance({
    address,
    token: TEST_DEX223.address,
    watch: true,
    chainId: 820
  });

  const {config: allowanceConfig} = usePrepareContractWrite({
    address: pickedToken.address,
    abi: ERC20ABI,
    functionName: "approve",
    args: [
      ICOContract,
      parseUnits(amountToPay, pickedToken.decimals)
    ]
  });

  const {data: approvingData, write: writeTokenApprove, isLoading: waitingForApprove} = useContractWrite(allowanceConfig);

  const { isLoading: isApproving } = useWaitForTransaction({
    hash: approvingData?.hash,
  });

  const {data: allowanceData} = useContractRead({
    address: pickedToken.address,
    abi: ERC20ABI,
    functionName: "allowance",
    args: [
      address,
      ICOContract
    ],
    watch: true
  });

  const { write: buyTokens, isLoading: waitingForPurchase } = useContractWrite({
    address: ICOContract,
    abi: testICOABI,
    functionName: 'purchaseTokens',
    args: [
      pickedToken.address,
      parseUnits(amountToPay, pickedToken.decimals)
    ]
  });

  const processBuyTokens = useCallback(() => {
    buyTokens();
  }, [buyTokens]);

  const output = useMemo(() => {
    if(!amountToPay || !readData) {
      return ""
    }

    return formatUnits(readData.toString(), 18);
  }, [amountToPay, readData]);


  const barPercentage = useMemo(() => {
    if(!contractBalance?.data?.formatted) {
      return 0.5;
    }

    const percentage = (80000000 - +contractBalance?.data?.formatted) / 80000000;

    if(percentage < 0.5) {
      return 0.5;
    }

    return percentage;
  }, [contractBalance?.data?.formatted]);


  return <>
    <div className={styles.progressBar}>
      <div style={{width: `${barPercentage}%`}} className={styles.bar} />
    </div>
    <div className={styles.raised}>D233 raised: {contractBalance?.data?.formatted ? 80000000 - +contractBalance?.data?.formatted : "—"} / 80000000</div>
    <div className={styles.ratio}><span>1 DEX223 = 0.0004 {pickedToken.symbol}</span></div>
    <div className={styles.tokenCards}>
      {tokensToPayWithForPreSale.map((token) => {
        return <button disabled={token.symbol !== "BUSDT"} key={token.id} onClick={() => setPickedTokenId(token.id)} className={clsx(styles.tokenPickButton, pickedTokenId === token.id && styles.active)}>
          <div className={styles.tokenImage}>
            <Image layout='fill' objectFit='contain' src={token.image} alt="" />
          </div>
          {token.symbol}
        </button>
      })}
    </div>
    <TokenCard balance={tokenToPayBalance?.formatted} type="pay" tokenName={pickedToken.symbol} tokenLogo={pickedToken.image} amount={amountToPay} handleChange={(v) => setAmountToPay(v)} />
    <Spacer height={12} />
    <TokenCard balance={testToken223Balance?.formatted} type="receive" tokenName="DEX223" tokenLogo="/images/tokens/DEX.svg" amount={output} handleChange={null} isLoading={isLoading} readonly />
    <Spacer height={20} />
    <ActionButton
      handleApprove={writeTokenApprove}
      handleBuy={processBuyTokens}
      isEnoughBalance={+tokenToPayBalance?.formatted > +amountToPay}
      isApproved={allowanceData >= parseUnits(amountToPay, pickedToken.decimals) || pickedToken.id === 11}
      isApproving={isApproving}
      waitingForApprove={waitingForApprove || waitingForPurchase}
      isAmountEntered={Boolean(+amountToPay)}
      symbol={pickedToken.symbol}
      chainId={chain?.id}
    />
    <Spacer height={8} />
  </>;
}
