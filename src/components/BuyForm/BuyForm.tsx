import React, {ChangeEvent, useCallback, useMemo, useState} from "react";
import styles from "./BuyForm.module.scss";
import {DEX223, TEST_DEX223, TEST_USDT, testTokensToPayWith} from "../../constants/tokens";
import clsx from "clsx";
import Image from "next/image";
import TokenCard from "../TokenCard";
import Button from "../Button";
import {useWeb3Modal} from "@web3modal/react";
import Spacer from "../Spacer";
import {
  erc20ABI,
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite, usePrepareSendTransaction,
  useSendTransaction
} from "wagmi";
import testICOABI from "../../constants/abis/testICOABI.json";
import testUSDTABI from "../../constants/abis/testUSDTABI.json";
import {formatEther, formatUnits, parseEther, parseUnits} from "viem";
import ERC20ABI from "../../constants/abis/erc20.json";


const ICOContract = "0xB3C4B7d7aA5Ceb5116b50Cd8a683C06aad579E46";

export default function BuyForm() {
  const {open, close, setDefaultChain} = useWeb3Modal();
  const {address, isConnected} = useAccount();

  const [amountToPay, setAmountToPay] = useState("");

  const [pickedTokenId, setPickedTokenId] = useState(11);

  const pickedToken = useMemo(() => {
    return testTokensToPayWith.find((token) => token.id === pickedTokenId);
  }, [pickedTokenId]);

  console.log("PARSED");
  console.log(parseEther(amountToPay));

  const {data: readData,isLoading} = useContractRead({
    address: ICOContract,
    abi: testICOABI,
    functionName: "getRewardAmount",
    args: [
      pickedToken.id === 11 ? "0x0000000000000000000000000000000000000000" : pickedToken.address,
      parseUnits(amountToPay, pickedToken.decimals)
    ]
  });

  console.log("HOW MANY YOU GET");
  console.log(readData);

  const {data: tokenToPayBalance} = useBalance({
    address,
    token: pickedToken.id !== 11 ? pickedToken.address : undefined,
    watch: true,
    chainId: 820
  });

  const {data: testToken223Balance} = useBalance({
    address,
    token: TEST_DEX223.address,
    watch: true,
    chainId: 820
  });

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
  })
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
    <div className={styles.ratio}>1 DEX223 = 0.023 {pickedToken.symbol}</div>
    <div className={styles.tokenCards}>
      {testTokensToPayWith.map((token) => {
        return <button key={token.id} onClick={() => setPickedTokenId(token.id)} className={clsx(styles.tokenPickButton, pickedTokenId === token.id && styles.active)}>
          <Image width={24} height={24} src={token.image} alt="" />
          {token.symbol}
        </button>
      })}
    </div>
    <TokenCard balance={tokenToPayBalance?.formatted} type="pay" tokenName={pickedToken.symbol} tokenLogo={pickedToken.image} amount={amountToPay} handleChange={(e: ChangeEvent<HTMLInputElement>) => setAmountToPay(e.target.value)} />
    <Spacer height={12} />
    <TokenCard balance={testToken223Balance?.formatted} type="receive" tokenName="DEX223 (test)" tokenLogo="/images/tokens/DEX.svg" amount={output} handleChange={null} isLoading={isLoading} readonly />
    <Spacer height={20} />
    <Button onClick={writeTokenApprove}>Approve</Button>
    {isConnected ? <Button onClick={processBuyTokens}>Buy ERC223</Button> : <Button onClick={open}>Connect wallet</Button>}
    <Spacer height={20} />
    <Button onClick={write}>Get 100 Test USDT</Button>
  </>;
}
