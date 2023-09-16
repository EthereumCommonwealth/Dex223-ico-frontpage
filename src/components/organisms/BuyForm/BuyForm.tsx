// @ts-nocheck
import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react";
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
import {useSnackbar} from "../../../providers/SnackbarProvider";

const ICOContract: `0x${string}` = "0x1F369D3541AA908021399036830BCe70B4E06DAE";

function ActionButton({
                        isApproved,
                        isEnoughBalance,
                        handleApprove,
                        handleBuy,
                        isAmountEntered,
                        isApproving,
                        symbol,
                        waitingForApprove,
                        chainId,
                        isPurchasing,
                        contractBalance,
                        output
                      }) {
  const {open, close, setDefaultChain} = useWeb3Modal();
  const {address, isConnected} = useAccount();
  const {switchNetwork} = useSwitchNetwork();
  const {showMessage} = useSnackbar();

  if (!isConnected) {
    return <Button onClick={open}>Connect wallet</Button>;
  }

  if (!isAmountEntered) {
    return <Button disabled>Enter amount</Button>;
  }

  if (!isEnoughBalance) {
    return <Button disabled>Insufficient balance</Button>;
  }

  if (Boolean(chainId) && chainId !== 820) {
    return <Button onClick={() => switchNetwork(820)}>Switch to Callisto Network</Button>
  }

  if (isPurchasing) {
    return <Button disabled>
      <span className={styles.waitingContent}>
        <span>Purchasing</span>
        <Preloader type="circular" size={24}/>
      </span>
    </Button>
  }

  if (isApproving) {
    return <Button disabled>
      <span className={styles.waitingContent}>
        <span>Approving</span>
        <Preloader type="circular" size={24}/>
      </span>
    </Button>
  }

  if (waitingForApprove) {
    return <Button onClick={handleApprove} disabled>
      <Preloader type="circular" size={24}/>
    </Button>
  }

  if (!isApproved) {
    return <Button onClick={handleApprove}>Approve {symbol}</Button>
  }

  console.log(output);
  console.log(contractBalance);

  return <Button onClick={() => {
    if(+output > +contractBalance) {
      showMessage(`There are only ${contractBalance} D223 available at this moment`, "info");
      return;
    }
    handleBuy();
  }}>Buy Tokens</Button>
}

const total = 80000000;

export default function BuyForm() {
  const {address} = useAccount();
  const {chain} = useNetwork();

  const [amountToPay, setAmountToPay] = useState("");
  const {showMessage} = useSnackbar();

  const [pickedTokenId, setPickedTokenId] = useState(100);

  const contractBalance = useBalance({
    address: ICOContract,
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

  const {
    data: approvingData,
    write: writeTokenApprove,
    isLoading: waitingForApprove
  } = useContractWrite(allowanceConfig);

  const {isLoading: isApproving} = useWaitForTransaction({
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

  const {data: purchaseData, write: buyTokens, isLoading: waitingForPurchase} = useContractWrite({
    address: ICOContract,
    abi: testICOABI,
    functionName: 'purchaseTokens',
    args: [
      pickedToken.address,
      parseUnits(amountToPay, pickedToken.decimals)
    ]
  });

  const {isLoading: isPurchasing, isSuccess,} = useWaitForTransaction({
    hash: purchaseData?.hash,
    onSuccess(data) {
      showMessage("Successfully purchased");
    }
  });

  const processBuyTokens = useCallback(() => {
    buyTokens();
  }, [buyTokens]);

  const output = useMemo(() => {
    if (!amountToPay || !readData) {
      return ""
    }

    return formatUnits(readData.toString(), 18);
  }, [amountToPay, readData]);

  const barPercentage = useMemo(() => {
    if (!contractBalance?.data?.formatted) {
      return 0.5;
    }

    const percentage = (total - +contractBalance?.data?.formatted) / total;
    const multipliedPercentage = percentage * 100;
    console.log(percentage);

    if (multipliedPercentage < 0.5) {
      return 0.5;
    }

    return multipliedPercentage;
  }, [contractBalance?.data?.formatted]);


  return <>
    <div className={styles.progressBar}>
      <div style={{width: `${0}%`}} className={styles.bar}/>
    </div>
    <div className={styles.raised}>
      {/*D223 sold: {contractBalance?.data?.formatted ? (80000000 - +contractBalance?.data?.formatted).toLocaleString("en-US", {maximumFractionDigits: 2}) : "—"} / {total.toLocaleString("en-US")}*/}
      D223 sold: — / —
    </div>
    <div className={styles.ratio}><span>1 DEX223 = 0.001 {pickedToken.symbol}</span></div>
    <div className={styles.tokenCards}>
      {tokensToPayWithForPreSale.map((token) => {
        return <button disabled={token.symbol !== "BUSDT"} key={token.id} onClick={() => setPickedTokenId(token.id)}
                       className={clsx(styles.tokenPickButton, pickedTokenId === token.id && styles.active)}>
          <div className={styles.tokenImage}>
            <Image layout='fill' objectFit='contain' src={token.image} alt=""/>
          </div>
          {token.symbol}
        </button>
      })}
    </div>
    <TokenCard readonly balance={tokenToPayBalance?.formatted} type="pay" tokenName={pickedToken.symbol}
               tokenLogo={pickedToken.image} amount={amountToPay} handleChange={(v) => setAmountToPay(v)}/>
    <Spacer height={12}/>
    <TokenCard balance={testToken223Balance?.formatted} type="receive" tokenName="DEX223"
               tokenLogo="/images/tokens/DEX.svg" amount={output} handleChange={null} isLoading={isLoading} readonly/>
    <Spacer height={20}/>
    {/*<ActionButton*/}
    {/*  handleApprove={writeTokenApprove}*/}
    {/*  handleBuy={processBuyTokens}*/}
    {/*  isEnoughBalance={+tokenToPayBalance?.formatted > +amountToPay}*/}
    {/*  isApproved={allowanceData >= parseUnits(amountToPay, pickedToken.decimals) || pickedToken.id === 11}*/}
    {/*  isApproving={isApproving}*/}
    {/*  isPurchasing={isPurchasing}*/}
    {/*  waitingForApprove={waitingForApprove || waitingForPurchase}*/}
    {/*  isAmountEntered={Boolean(+amountToPay)}*/}
    {/*  symbol={pickedToken.symbol}*/}
    {/*  chainId={chain?.id}*/}
    {/*  contractBalance={contractBalance?.data?.formatted}*/}
    {/*  output={output}*/}
    {/*/>*/}
    <Button disabled>Wait for the next round</Button>
    <Spacer height={8}/>
  </>;
}
