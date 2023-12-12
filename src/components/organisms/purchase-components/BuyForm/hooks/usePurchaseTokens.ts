import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  usePublicClient,
  useSendTransaction
} from "wagmi";
import {
  ICOContractAddressETH,
  ICOContractAddressETHPreSale,
  tokensToPayWith,
  tokensToPayWithPreSale
} from "@/constants/tokens";
import { parseUnits } from "viem";
import { useEffect, useMemo } from "react";
import testICOABI from "@/constants/abis/icoABI.json";
import { useRecentTransactionsStore } from "@/stores/useRecentTransactions";
import {
  useTransactionGasFee, useTransactionGasLimit,
  useTransactionGasPrice,
  useTransactionPriorityFee,
  useTransactionTypeStore
} from "@/stores/useGasSettings";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { usePurchaseData } from "@/stores/usePurchaseData";
import { useReward } from "@/components/organisms/purchase-components/BuyForm/hooks/useReward";
import { isNativeToken } from "@/functions/isNativeToken";
import { trackEvent } from "@/functions/mixpanel";

function stringifyObject(object: { [key: string]: any }) {
  return JSON.parse(JSON.stringify(object, (key, value) =>
    typeof value === 'bigint'
      ? value.toString()
      : value // return everything else unchanged
  ));
}

export function usePurchaseTokens({presale}) {
  const {
    setPickedTokenId,
    amountToPay,
    pickedToken
  } = usePurchaseData((state) => ({
    setPickedTokenId: state.setPickedTokenId,
    amountToPay: state.amountToPay,
    pickedToken: state.computed.pickedToken
  }));

  const { addTransaction, isViewed } = useRecentTransactionsStore();
  const { address } = useAccount();

  const { chain } = useNetwork();
  const publicClient = usePublicClient({ chainId: chain?.id });

  const { type } = useTransactionTypeStore();

  const { maxFeePerGas } = useTransactionGasFee();
  const { maxPriorityFeePerGas } = useTransactionPriorityFee();
  const { gasPrice } = useTransactionGasPrice();
  const { gasLimit } = useTransactionGasLimit();

  const { showMessage } = useSnackbar();

  const gasSettings: {gasPrice: bigint} | {maxFeePerGas: bigint, maxPriorityFeePerGas: bigint} = useMemo(() => {
    if (type === "legacy") {
      return { gasPrice }
    } else {
      return { maxPriorityFeePerGas, maxFeePerGas }
    }
  }, [gasPrice, maxFeePerGas, maxPriorityFeePerGas, type]);

  useEffect(() => {
    setPickedTokenId(presale ? tokensToPayWithPreSale[0].id : tokensToPayWith[0].id);
  }, [setPickedTokenId, chain, presale]);

  const { output } = useReward({ pickedToken, amountToPay, presale });

  const { config: purchaseConfig, error } = usePrepareContractWrite({
    address: presale ? ICOContractAddressETHPreSale : ICOContractAddressETH,
    abi: testICOABI,
    functionName: 'purchaseTokens',
    gas: gasLimit,
    ...gasSettings,
    args: [
      pickedToken.address,
      parseUnits(amountToPay, pickedToken.decimals)
    ],
    cacheTime: 0,
    enabled: !isNativeToken(pickedToken)
  });

  const {
    write: purchaseWithTokens,
    isLoading: waitingForPurchaseWithTokens
  } = useContractWrite({
    ...purchaseConfig,
    onSettled: async (data, error) => {
      if (error) {
        trackEvent("error", {
          message: "Something went wrong",
          errorFunction: "purchaseWithTokens"
        })  
        return showMessage("Something went wrong", "error");
      }

      showMessage("Transaction submitted!");
      const _nonce = await publicClient.getTransactionCount({
        address,
        blockTag: "pending"
      });

      addTransaction({
          hash: data.hash,
          chainId: chain.id,
          title: `Purchase ${output || 0} DEX223 for ${amountToPay} ${pickedToken.symbol}`,
          type: type === "default" ? 2 : 0,
          details: {
            nonce: _nonce - 1,
            address: presale ? ICOContractAddressETHPreSale : ICOContractAddressETH,
            abi: "ICO_ABI",
            functionName: 'purchaseTokens',
            gas: gasLimit.toString(),
            ...stringifyObject(gasSettings),
            args: [
              pickedToken.address,
              parseUnits(amountToPay, pickedToken.decimals).toString()
            ]
          }
        },
        address
      );

      // Track token purchase
      trackEvent("purchaseTokens", {
        txHash: data.hash,
        purchaseType: "tokens",
        dex223Amount: output || 0,
        amountToPay,
        amountSymbol: pickedToken.symbol,
      })
    }
  });

  const { data, sendTransaction: purchaseWithCoins, isLoading: waitingForPurchaseWithCoins } =
    useSendTransaction({
      to: presale ? ICOContractAddressETHPreSale : ICOContractAddressETH,
      value: parseUnits(amountToPay, pickedToken.decimals),
      gas: gasLimit,
      ...gasSettings,
      onSettled: async (data, error) => {
        if (error) {
          trackEvent("error", {
            message: "Something went wrong",
            errorFunction: "purchaseWithCoins"
          })  
        }

        const _nonce = await publicClient.getTransactionCount({
          address,
          blockTag: "pending"
        });

        addTransaction({
            hash: data.hash,
            chainId: chain.id,
            title: `Purchase ${output || 0} DEX223 for ${amountToPay} ${pickedToken.symbol}`,
            type: type === "default" ? 2 : 0,
            details: {
              nonce: _nonce - 1,
              to: presale ? ICOContractAddressETHPreSale : ICOContractAddressETH,
              value: parseUnits(amountToPay, pickedToken.decimals).toString(),
              gas: gasLimit.toString(),
              ...stringifyObject(gasSettings)
            },
          }, address
        );

        // Track token purchase
        trackEvent("purchaseTokens", {
          txHash: data.hash,
          purchaseType: "coins",
          dex223Amount: output || 0,
          amountToPay,
          amountSymbol: pickedToken.symbol,
        })
      }
    })

  const isLoading = useMemo(() => {
    return waitingForPurchaseWithCoins || waitingForPurchaseWithTokens;
  }, [waitingForPurchaseWithCoins, waitingForPurchaseWithTokens]);

  return {
    purchaseWithCoins,
    purchaseWithTokens,
    isLoading,
    error
  }
}
