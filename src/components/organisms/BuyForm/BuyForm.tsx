// @ts-nocheck
import React, {useCallback, useEffect, useMemo, useState} from "react";
import styles from "./BuyForm.module.scss";
import {
  getDEXToken, getTokensToPayWith, getICOContractAddress, getChainId, TokenInfo
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
  usePrepareContractWrite, usePrepareSendTransaction, usePublicClient, useSendTransaction, useSwitchNetwork,
  useWaitForTransaction, useWalletClient
} from "wagmi";
import testICOABI from "../../../constants/abis/testICOABI.json";
import {formatGwei, formatUnits, parseGwei, parseUnits} from "viem";
import ERC20ABI from "../../../constants/abis/erc20.json";
import Preloader from "../../atoms/Preloader";
import {useSnackbar} from "../../../providers/SnackbarProvider";
import Collapse from "../../atoms/Collapse";
import Svg from "../../atoms/Svg";
import DrawerDialog from "../../atoms/DrawerDialog";
import KeystoreConnect from "../KeystoreConnect";
import {publicClient as createPublicClient} from "../../../pages/_app";
import Switch from "../../atoms/Switch";
import GasSettingsDialog from "@/components/organisms/GasSettingsDialog";
import {useTransactionTypeStore} from "@/stores/useGasSettings";

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
  const {open} = useWeb3Modal();
  const {isConnected} = useAccount();
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

  const [gasPrice, setGasPrice] = useState(null);
  const [gasLimit, setGasLimit] = useState(null);
  const { data: feeData } = useFeeData();

  console.log(feeData);

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

  const {data: readData, isLoading} = useContractRead({
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

  const {data: allowanceData} = useContractRead({
    address: pickedToken.address,
    abi: ERC20ABI,
    functionName: "allowance",
    args: [
      address,
      getICOContractAddress(devMode)
    ],
    watch: true
  });

  const defaultGasPrice = feeData?.gasPrice ? formatGwei(feeData.gasPrice) : "0";

  const [defaultGasLimit, setDefaultGasLimit] = useState(null as null | string);

  const { data: walletClient }: any = useWalletClient();

  useEffect(() => {
    (async () => {
      try {
        console.log("Trying to get gas");

        console.log(publicClient);
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
          console.log(gas);
          setDefaultGasLimit(formatUnits(gas, 0));
        }
      } catch (error) {
        console.log("🚀 ~ error:", error);
        // setDefaultGasLimit(null);
      }
    })();
  }, [address, walletClient, pickedToken?.address, pickedToken?.decimals, amountToPay, devMode, publicClient]);

  const finalGasPrice = gasPrice === null ? defaultGasPrice : gasPrice;
  const finalGasLimit = gasLimit === null ? defaultGasLimit : gasLimit;

  const {config: purchaseConfig} = usePrepareContractWrite({
    address: getICOContractAddress(devMode),
    abi: testICOABI,
    functionName: 'purchaseTokens',
    // gas: gasPrice ? parseUnits(gasPrice, 0) : undefined,
    // gasPrice: gasLimit ? parseGwei(gasLimit) : undefined,
    args: [
      pickedToken.address,
      parseUnits(amountToPay, pickedToken.decimals)
    ]
  })

  console.log(purchaseConfig);

  const {data: purchaseData, write: buyTokens, isLoading: waitingForPurchase} = useContractWrite(purchaseConfig);

  const {isLoading: isPurchasing, isSuccess} = useWaitForTransaction({
    hash: purchaseData?.hash,
    onSuccess(data) {
      showMessage("Successfully purchased");
    }
  });

  const { data, sendTransaction } =
    useSendTransaction({
      to: getICOContractAddress(devMode),
      value: parseUnits(amountToPay, pickedToken.decimals),
      gas: gasLimit ? parseGwei(gasLimit) : undefined,
      gasPrice: gasPrice ? parseUnits(gasPrice, 0) : undefined,
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

    return formatUnits(readData.toString(), 18);
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

  const networkFee = parseGwei(finalGasPrice) * parseUnits(finalGasLimit || "0", 0);

  // const [isGasSettingsOpened, setGasSettingsOpened] = useState(false);
  const [dialogOpened, setDialogOpened] = useState(false);

  const [gasSettingsOpened, setGasSettingsOpened] = useState(false);

  const type = useTransactionTypeStore(state => state.type);


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
               tokenLogo="/images/tokens/DEX.svg" amount={output} handleChange={null} isLoading={isLoading} readonly/>
    <Spacer height={20}/>
    <div className={clsx(styles.gasSettings, gasSettingsOpened && styles.gasSettingsOpened)}>
      <div className={styles.gasHeader} role="button" onClick={() => setGasSettingsOpened(!gasSettingsOpened)}>
        <span className={styles.gasTitle}>Network fee</span>
        <div className={styles.gasExpand}>
          {type}
          <span>~{" "}{formatUnits(networkFee, 18)} {getChainId(devMode) === 820 ? "CLO" : "ETH"}</span>
          <Svg iconName="arrow-right" />
        </div>
      </div>
      <GasSettingsDialog isOpen={gasSettingsOpened} onClose={() => setGasSettingsOpened(false)} />
      <button onClick={() => setGasSettingsOpened(true)}>Change</button>
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
