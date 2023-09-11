// @ts-nocheck
import React, {ChangeEvent, useCallback, useMemo, useState} from "react";
import styles from "./BuyForm.module.scss";
import {DEX223, TEST_DEX223, TEST_USDT, testTokensToPayWith} from "../../constants/tokens";
import clsx from "clsx";
import Image from "next/image";
import TokenCard from "../organisms/TokenCard";
import Button from "../atoms/Button";
import {useWeb3Modal} from "@web3modal/react";
import Spacer from "../atoms/Spacer";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite, usePrepareSendTransaction,
  useSendTransaction
} from "wagmi";
import testICOABI from "../../constants/abis/testICOABI.json";
import testUSDTABI from "../../constants/abis/testUSDTABI.json";
import {formatUnits, parseUnits} from "viem";
import ERC20ABI from "../../constants/abis/erc20.json";


const ICOContract: `0x${string}` = "0xB3C4B7d7aA5Ceb5116b50Cd8a683C06aad579E46";

function ActionButton({isApproved, isEnoughBalance, handleApprove, handleBuy, isAmountEntered}) {
  const {open, close, setDefaultChain} = useWeb3Modal();
  const {address, isConnected} = useAccount();

  if(!isConnected) {
    return <Button onClick={open}>Connect wallet</Button>;
  }

  if(!isAmountEntered) {
    return <Button disabled>Enter amount</Button>;
  }

  if(!isEnoughBalance) {
    return <Button disabled>Insufficient balance</Button>;
  }

  if(!isApproved) {
    return <Button onClick={handleApprove}>Approve</Button>
  }

  return <Button onClick={handleBuy}>Buy ERC223</Button>
}

export default function BuyForm() {
  const {open, close, setDefaultChain} = useWeb3Modal();
  const {address, isConnected} = useAccount();

  const [amountToPay, setAmountToPay] = useState("");

  const [pickedTokenId, setPickedTokenId] = useState(11);

  const pickedToken = useMemo(() => {
    return testTokensToPayWith.find((token) => token.id === pickedTokenId);
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

  const {write: writeTokenApprove} = useContractWrite(allowanceConfig);

  const { isSuccess, write } = useContractWrite({
    address: TEST_USDT.address,
    abi: testUSDTABI,
    functionName: 'ask',
    args: [parseUnits("100", 6)]
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

  const { write: buyTokens } = useContractWrite({
    address: ICOContract,
    abi: testICOABI,
    functionName: 'purchaseTokens',
    args: [
      pickedToken.address,
      parseUnits(amountToPay, pickedToken.decimals)
    ]
  });

  const { config } = usePrepareSendTransaction({
    to: ICOContract,
    value: parseUnits(amountToPay, pickedToken.decimals)
  });

  const { data, sendTransaction } =
    useSendTransaction(config)

  const processBuyTokens = useCallback(() => {
    if(pickedToken.id === 11) {
      //send CLO
      sendTransaction();
      return;
    }

    buyTokens();
  }, [buyTokens, pickedToken.id, sendTransaction]);

  const output = useMemo(() => {
    if(!amountToPay || !readData) {
      return ""
    }

    return formatUnits(readData.toString(), 18);
  }, [amountToPay, readData]);

  return <>
    <div className={styles.ratio}><span>1 DEX223 = 0.023 {pickedToken.symbol}</span></div>
    <div className={styles.tokenCards}>
      {testTokensToPayWith.map((token) => {
        return <button key={token.id} onClick={() => setPickedTokenId(token.id)} className={clsx(styles.tokenPickButton, pickedTokenId === token.id && styles.active)}>
          <div className={styles.tokenImage}>
            <Image layout='fill' objectFit='contain' src={token.image} alt="" />
          </div>
          {token.symbol}
        </button>
      })}
    </div>
    <TokenCard balance={tokenToPayBalance?.formatted} type="pay" tokenName={pickedToken.symbol} tokenLogo={pickedToken.image} amount={amountToPay} handleChange={(e: ChangeEvent<HTMLInputElement>) => setAmountToPay(e.target.value)} />
    <Spacer height={12} />
    <TokenCard balance={testToken223Balance?.formatted} type="receive" tokenName="DEX223 (test)" tokenLogo="/images/tokens/DEX.svg" amount={output} handleChange={null} isLoading={isLoading} readonly />
    <Spacer height={20} />
    <ActionButton
      handleApprove={writeTokenApprove}
      handleBuy={processBuyTokens}
      isEnoughBalance={+tokenToPayBalance?.formatted > +amountToPay}
      isApproved={allowanceData >= parseUnits(amountToPay, pickedToken.decimals) || pickedToken.id === 11}
      isAmountEntered={Boolean(amountToPay)}
    />
    <Spacer height={8} />
  </>;
}
