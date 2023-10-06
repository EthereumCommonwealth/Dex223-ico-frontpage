// @ts-nocheck
import React, {useCallback, useEffect, useMemo, useState} from "react";
import styles from "./BuyForm.module.scss";
import {
  TEST_DEX223, tokensToPayWith,
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
  useContractWrite, useFeeData, useNetwork,
  usePrepareContractWrite, useSwitchNetwork,
  useWaitForTransaction, useWalletClient
} from "wagmi";
import testICOABI from "../../../constants/abis/testICOABI.json";
import {createPublicClient, formatGwei, formatUnits, parseUnits} from "viem";
import ERC20ABI from "../../../constants/abis/erc20.json";
import Preloader from "../../atoms/Preloader";
import {useSnackbar} from "../../../providers/SnackbarProvider";
import Collapse from "../../atoms/Collapse";
import Svg from "../../atoms/Svg";
import DrawerDialog from "../../atoms/DrawerDialog";
import KeystoreConnect from "../KeystoreConnect";

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
                        output,
  openKeystore
                      }) {
  const {open, close, setDefaultChain} = useWeb3Modal();
  const {address, isConnected} = useAccount();
  const {switchNetwork} = useSwitchNetwork();
  const {showMessage} = useSnackbar();

  if (!isConnected) {
    return <>
      <Button onClick={open}>Connect wallet</Button>
      <Spacer height={20} />
      <Button onClick={openKeystore} variant="outlined">Import keystore file</Button>
      </>;
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

  const [pickedTokenId, setPickedTokenId] = useState(tokensToPayWith[0].id);

  const [gasPrice, setGasPrice] = useState(null);
  const [gasLimit, setGasLimit] = useState(null);
  const { data: feeData } = useFeeData();

  const contractBalance = useBalance({
    address: ICOContract,
    token: "0xf5717D6c1cbAFE00A4c800B227eCe496180244F9",
    chainId: 820,
    watch: true
  });

  const pickedToken = useMemo(() => {
    return tokensToPayWith.find((token) => token.id === pickedTokenId);
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
    token: (pickedToken.id !== 1 && pickedToken.id !== 11) ? pickedToken.address : undefined,
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

  const defaultGasPrice = feeData?.gasPrice ? formatGwei(feeData.gasPrice) : "0";

  const [defaultGasLimit, setDefaultGasLimit] = useState(null as null | string);

  const { data: walletClient }: any = useWalletClient();

  useEffect(() => {
    (async () => {
      try {
        const publicClient = createPublicClient({ chainId: chain.id });
        if (publicClient?.estimateContractGas) {
          const gas = await publicClient.estimateContractGas({
            account: walletClient?.account,
            address: ICOContract,
            abi: testICOABI,
            functionName: 'purchaseTokens',
            args: [
              pickedToken.address,
              parseUnits(amountToPay, pickedToken.decimals)
            ]
          });
          setDefaultGasLimit(formatUnits(gas, 0));
        }
      } catch (error) {
        console.log("🚀 ~ error:", error);
        setDefaultGasLimit(null);
      }
    })();
  }, [address, walletClient, chain?.id, pickedToken?.address, pickedToken?.decimals, amountToPay]);

  const finalGasPrice = gasPrice === null ? defaultGasPrice : gasPrice;
  const finalGasLimit = gasLimit === null ? defaultGasLimit : gasLimit;

  const {data: purchaseData, write: buyTokens, isLoading: waitingForPurchase} = useContractWrite({
    address: ICOContract,
    abi: testICOABI,
    functionName: 'purchaseTokens',
    args: [
      pickedToken.address,
      parseUnits(amountToPay, pickedToken.decimals)
    ]
  });

  const {isLoading: isPurchasing, isSuccess} = useWaitForTransaction({
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


  const [isGasSettingsOpened, setGasSettingsOpened] = useState(false);

  const [dialogOpened, setDialogOpened] = useState(false);

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
      {tokensToPayWith.map((token) => {
        return <button key={token.id} onClick={() => setPickedTokenId(token.id)}
                       className={clsx(styles.tokenPickButton, pickedTokenId === token.id && styles.active)}>
          <div className={styles.tokenImage}>
            <Image layout='fill' objectFit='contain' src={token.image} alt=""/>
          </div>
          {token.symbol}
        </button>
      })}
    </div>
    <TokenCard balance={tokenToPayBalance?.formatted} type="pay" tokenName={pickedToken.symbol}
               tokenLogo={pickedToken.image} amount={amountToPay} handleChange={(v) => setAmountToPay(v)}/>
    <Spacer height={12}/>
    <TokenCard balance={testToken223Balance?.formatted} type="receive" tokenName="DEX223"
               tokenLogo="/images/tokens/DEX.svg" amount={output} handleChange={null} isLoading={isLoading} readonly/>
    <Spacer height={20}/>
    <div className={clsx(styles.gasSettings, isGasSettingsOpened && styles.gasSettingsOpened)}>
      <div className={styles.gasHeader} role="button"  onClick={() => setGasSettingsOpened(!isGasSettingsOpened)}>
        <span className={styles.gasTitle}>Network fee</span>
        <div className={styles.gasExpand}>
          <span>0.001 ETH</span>
          <Svg iconName="arrow-right" />
        </div>
      </div>
      <Collapse open={isGasSettingsOpened}>
        <div className={styles.fields}>
         <div>
           <h4 className={styles.gasLabel}>
             Gas limit
             <Svg iconName="info" />
           </h4>
           <input
             value={finalGasLimit || ""}
             onChange={(e) => {
               setGasLimit(e.target.value);
             }}
             placeholder="Gas Limit"
             className={styles.gasInput}
             type="number"
           />
         </div>
         <div>
           <h4 className={styles.gasLabel}>
             Gas price
             <Svg iconName="info" />
           </h4>
           <input
             value={finalGasPrice || ""}
             onChange={(e) => {
               setGasPrice(e.target.value);
             }}
             placeholder="Gas Price"
             className={styles.gasInput}
             type="number"
           />
         </div>
        </div>
      </Collapse>
    </div>
    <Spacer height={20} />
    <ActionButton
      handleApprove={writeTokenApprove}
      handleBuy={processBuyTokens}
      isEnoughBalance={+tokenToPayBalance?.formatted > +amountToPay}
      isApproved={allowanceData >= parseUnits(amountToPay, pickedToken.decimals) || pickedToken.id === 11}
      isApproving={isApproving}
      isPurchasing={isPurchasing}
      waitingForApprove={waitingForApprove || waitingForPurchase}
      isAmountEntered={Boolean(+amountToPay)}
      symbol={pickedToken.symbol}
      chainId={chain?.id}
      contractBalance={contractBalance?.data?.formatted}
      output={output}
      openKeystore={() => setDialogOpened(true)}
    />

    <DrawerDialog onClose={() => setDialogOpened(false)} isOpen={dialogOpened}>
      <KeystoreConnect handleClose={() => setDialogOpened(false)} />
    </DrawerDialog>
    {/*<Button disabled>Wait for the next round</Button>*/}
    <Spacer height={8}/>
  </>;
}
