import React, {useCallback, useEffect, useMemo, useState} from "react";
import styles from "./BuyForm.module.scss";
import {getChainId, getDEXToken, getICOContractAddress, getTokensToPayWith, TokenInfo} from "@/constants/tokens";
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
  useContractWrite,
  useFeeData,
  useNetwork,
  usePrepareContractWrite,
  usePublicClient,
  useSendTransaction,
  useSwitchNetwork,
  useWaitForTransaction,
  useWalletClient
} from "wagmi";
import testICOABI from "../../../constants/abis/testICOABI.json";
import {formatEther, formatGwei, formatUnits, parseGwei, parseUnits} from "viem";
import ERC20ABI from "../../../constants/abis/erc20.json";
import Preloader from "../../atoms/Preloader";
import {useSnackbar} from "@/providers/SnackbarProvider";
import Svg from "../../atoms/Svg";
import DrawerDialog from "../../atoms/DrawerDialog";
import KeystoreConnect from "../KeystoreConnect";
import Switch from "../../atoms/Switch";
import GasSettingsDialog from "@/components/organisms/GasSettingsDialog";
import {
  useTransactionGasFee,
  useTransactionGasLimit,
  useTransactionGasPrice,
  useTransactionPriorityFee,
  useTransactionTypeStore
} from "@/stores/useGasSettings";
import RecentTransactionsDialog from "@/components/organisms/RecentTransactionsDialog";
import {useRecentTransactions} from "@/stores/useRecentTransactions";
import useZustandStore from "@/stores/useZustandStore";

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
                        contractBalance,
                        output,
  openKeystore
                      }) {
  const {open} = useWeb3Modal();
  const {isConnected} = useAccount();
  const {switchNetwork} = useSwitchNetwork();
  const {showMessage} = useSnackbar();

  const {feeError} = useTransactionGasFee();

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

  if (isApproving) {
    return <Button disabled>
      <span className={styles.waitingContent}>
        <span>Approving</span>
        <Preloader size={24}/>
      </span>
    </Button>
  }

  if (waitingForApprove) {
    return <Button onClick={handleApprove} disabled>
      <Preloader size={24}/>
    </Button>
  }

  if (!isApproved) {
    return <Button onClick={handleApprove}>Approve {symbol}</Button>
  }

  if(feeError) {
    return <Button error>Update your gas fee settings</Button>
  }

  return <Button onClick={() => {
    if(+output > +contractBalance) {
      showMessage(`There are only ${contractBalance} D223 available at this moment`, "info");
      return;
    }
    handleBuy();
  }}>Buy Tokens</Button>
}

const total = 80000000;

function isNativeToken(token: TokenInfo) {
  return token.id === 1 || token.id === 11;
}

export default function BuyForm() {
  const {address} = useAccount();
  const {chain} = useNetwork();
  const publicClient = usePublicClient({chainId: chain?.id});

  const [devMode, setDevMode] = useState(true);

  const [amountToPay, setAmountToPay] = useState("");
  const {showMessage} = useSnackbar();

  const [pickedTokenId, setPickedTokenId] = useState(getTokensToPayWith(devMode)[0].id);

  const { data: feeData } = useFeeData({
    chainId: chain?.id || 820,
    watch: true
  });

  const actions = useRecentTransactions();

  console.log(actions);

  const {addTransaction} = actions;

  const { type} = useTransactionTypeStore();

  const {baseFee, setBaseFee, setMaxFeePerGas, maxFeePerGas} = useTransactionGasFee();
  const {gasPrice, setGasPrice, setBaseGasPrice} = useTransactionGasPrice();
  const {maxPriorityFeePerGas, setBasePriority, setMaxPriorityFeePerGas} = useTransactionPriorityFee();

  const {gasLimit, setGasLimit, setUnsavedGasLimit, setEstimatedGasLimit} = useTransactionGasLimit();

  useEffect(() => {

    if(feeData?.formatted?.gasPrice) {
      setGasPrice(feeData.formatted.gasPrice);
      setBaseGasPrice(feeData.formatted.gasPrice);
    }

    if(feeData?.lastBaseFeePerGas) {
      setMaxFeePerGas((+formatGwei(feeData.lastBaseFeePerGas) * 1.2).toString());
      setBaseFee(formatGwei(feeData.lastBaseFeePerGas));
    }

    if(feeData?.formatted?.maxPriorityFeePerGas) {
      setMaxPriorityFeePerGas((+feeData.formatted.maxPriorityFeePerGas + 0.5).toString());
      setBasePriority(feeData.formatted.maxPriorityFeePerGas);
    }
  }, [feeData, setBaseGasPrice, setBaseFee, setBasePriority, setGasPrice, setMaxFeePerGas, setMaxPriorityFeePerGas]);

  const contractBalance = useBalance({
    address: getICOContractAddress(devMode),
    token: getDEXToken(devMode).address,
    chainId: getChainId(devMode),
    watch: true
  });

  useEffect(() => {
    setPickedTokenId(getTokensToPayWith(devMode)[0].id);
  }, [devMode]);

  const pickedToken = useMemo(() => {
    const pt = getTokensToPayWith(devMode).find((token) => token.id === pickedTokenId);
    if(!pt) {
      return getTokensToPayWith(devMode)[0];
    }
    return pt;
  }, [devMode, pickedTokenId]);

  const {data: readData, isLoading}: {data: bigint, isLoading: boolean} = useContractRead({
    address: getICOContractAddress(devMode),
    abi: testICOABI,
    functionName: "getRewardAmount",
    chainId: pickedToken.chainId,
    args: [
      isNativeToken(pickedToken) ? "0x0000000000000000000000000000000000000000" : pickedToken.address,
      parseUnits(amountToPay, pickedToken.decimals)
    ]
  });

  const {data: tokenToPayBalance} = useBalance({
    address,
    token: isNativeToken(pickedToken) ? undefined : pickedToken.address,
    watch: true,
    chainId: pickedToken.chainId
  });

  const {data: testToken223Balance} = useBalance({
    address,
    token: getDEXToken(devMode).address,
    watch: true,
    chainId: getDEXToken(devMode).chainId
  });

  const {config: allowanceConfig} = usePrepareContractWrite({
    address: pickedToken.address,
    abi: ERC20ABI,
    functionName: "approve",
    args: [
      getICOContractAddress(devMode),
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

  const {data: allowanceData}: {data: bigint} = useContractRead({
    address: pickedToken.address,
    abi: ERC20ABI,
    functionName: "allowance",
    args: [
      address,
      getICOContractAddress(devMode)
    ],
    watch: true
  });

  const { data: walletClient }: any = useWalletClient();

  useEffect(() => {
    (async () => {
      try {
        if (publicClient?.estimateContractGas) {
          const gas = await publicClient.estimateContractGas({
            account: address,
            address: getICOContractAddress(devMode),
            abi: testICOABI,
            functionName: 'purchaseTokens',
            args: [
              pickedToken.address,
              parseUnits(amountToPay, pickedToken.decimals)
            ]
          });
          setGasLimit(formatUnits(gas * BigInt(12) / BigInt(10), 0));
          setUnsavedGasLimit(formatUnits(gas * BigInt(12) / BigInt(10), 0));
          setEstimatedGasLimit(formatUnits(gas * BigInt(12) / BigInt(10), 0));
        }
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    })();
  }, [address, walletClient, pickedToken.address, pickedToken.decimals, amountToPay, devMode, publicClient, setGasLimit, setUnsavedGasLimit, setEstimatedGasLimit]);

  const gasSettings = useMemo(() => {
    if(type === "legacy") {
      return {gasPrice: parseGwei(gasPrice)}
    } else {
      return {maxPriorityFeePerGas: parseGwei(maxPriorityFeePerGas), maxFeePerGas: parseGwei(maxFeePerGas)}
    }
  }, [gasPrice, maxFeePerGas, maxPriorityFeePerGas, type]);

  const {config: purchaseConfig} = usePrepareContractWrite({
    address: getICOContractAddress(devMode),
    abi: testICOABI,
    functionName: 'purchaseTokens',
    gas: gasLimit,
    ...gasSettings,
    args: [
      pickedToken.address,
      parseUnits(amountToPay, pickedToken.decimals)
    ]
  });

  const {
    data: purchaseData,
    write: buyTokens,
    isLoading: waitingForPurchase,
    error: purchaseError,
  } = useContractWrite({...purchaseConfig, onSettled(data) {
      showMessage("Transaction submitted!");
      addTransaction({
        hash: data.hash,
        chainId: chain.id,
        title: `Purchase ${output} DEX223 for ${amountToPay} ${pickedToken.symbol}`
      })
    }});

  const { data, sendTransaction } =
    useSendTransaction({
      to: getICOContractAddress(devMode),
      value: parseUnits(amountToPay, pickedToken.decimals),
      gas: gasLimit,
      ...gasSettings,
      onSettled: (data) => {
        addTransaction({
          hash: data.hash,
          chainId: chain.id,
          title: `Purchase ${output} DEX223 for ${amountToPay} ${pickedToken.symbol}`
        })
      }
    })

  const processBuyTokens = useCallback(() => {
    if(pickedToken.id === 11 || pickedToken.id === 1) {
      //send CLO
      sendTransaction();
      return;
    }

    buyTokens();
  }, [buyTokens, pickedToken.id, sendTransaction]);

  const output = useMemo(() => {
    if (!amountToPay || !readData) {
      return ""
    }

    return formatUnits(readData, 18);
  }, [amountToPay, readData]);

  const barPercentage = useMemo(() => {
    if (!contractBalance?.data?.formatted) {
      return 0.5;
    }

    const percentage = (total - +contractBalance?.data?.formatted) / total;
    const multipliedPercentage = percentage * 100;

    if (multipliedPercentage < 0.5) {
      return 0.5;
    }

    return multipliedPercentage;
  }, [contractBalance?.data?.formatted]);

  const networkFee = useMemo(() => {
    if(type === "default") {
      const maxFee = (+formatEther(parseGwei((+maxPriorityFeePerGas + +maxFeePerGas).toString()) * BigInt(gasLimit))).toFixed(3);
      const _baseFee = (+formatEther(parseGwei((+maxPriorityFeePerGas + +baseFee).toString()) * BigInt(gasLimit))).toFixed(3)

      return `${_baseFee} - ${maxFee}`;
    }

    return (+formatEther(BigInt(gasLimit) * parseGwei(gasPrice))).toFixed(3);

  }, [baseFee, gasLimit, gasPrice, maxFeePerGas, maxPriorityFeePerGas, type]);

  const [dialogOpened, setDialogOpened] = useState(false);
  const [gasSettingsOpened, setGasSettingsOpened] = useState(false);

  const [isRecentTransactionsOpened, setRecentTransactionsOpened] = useState(false);

  return <>
    <div className={styles.progressBar}>
      <div style={{width: `${0}%`}} className={styles.bar}/>
    </div>
    <div className={styles.raised}>
      {/*D223 sold: {contractBalance?.data?.formatted ? (80000000 - +contractBalance?.data?.formatted).toLocaleString("en-US", {maximumFractionDigits: 2}) : "—"} / {total.toLocaleString("en-US")}*/}
      D223 sold: — / —
    </div>
    <div className={styles.ratio}><span>1 DEX223 = 0.001 {pickedToken.symbol}</span></div>

    <div className={styles.devMode}>
      <span>Dev mode</span>
      <Switch checked={devMode} setChecked={() => setDevMode(!devMode)} />
    </div>
    <div className={clsx(styles.tokenCards, devMode && styles.dev)}>
      {getTokensToPayWith(devMode).map((token) => {
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
    <TokenCard balance={testToken223Balance?.formatted} type="receive" tokenName={getDEXToken(devMode).symbol}
               tokenLogo="/images/tokens/DEX.svg" amount={output} handleChange={null} readonly/>
    <Spacer height={20}/>
    <div className={clsx(styles.gasSettings, gasSettingsOpened && styles.gasSettingsOpened)}>
      <div className={styles.gasHeader} role="button" onClick={() => setGasSettingsOpened(!gasSettingsOpened)}>
        <span className={styles.gasTitle}>Network fee</span>
        <div className={styles.gasExpand}>
          <Svg iconName="gas" />
          ~ {networkFee} CLO
          <button className={styles.editGasButton} onClick={() => setGasSettingsOpened(true)}>EDIT</button>
        </div>
      </div>
      <GasSettingsDialog isOpen={gasSettingsOpened} onClose={() => setGasSettingsOpened(false)} />
    </div>
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
      contractBalance={contractBalance?.data?.formatted}
      output={output}
      openKeystore={() => setDialogOpened(true)}
    />

    <div className={styles.recentTransactionsField}>
      <div>
        <Svg iconName="recent-transactions" />
        Recent transactions
      </div>
      <button onClick={() => setRecentTransactionsOpened(true)} className={styles.textButton}>See all activity</button>
    </div>

    <DrawerDialog onClose={() => setDialogOpened(false)} isOpen={dialogOpened}>
      <KeystoreConnect handleClose={() => setDialogOpened(false)} />
    </DrawerDialog>

    <RecentTransactionsDialog isOpen={isRecentTransactionsOpened} handleClose={() => {
      setRecentTransactionsOpened(false);
    }} />

    {/*<Button disabled>Wait for the next round</Button>*/}
    <Spacer height={8}/>
  </>;
}
