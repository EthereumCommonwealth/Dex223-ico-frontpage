import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  usePublicClient,
  useSendTransaction
} from "wagmi";
import { getICOContractAddress, getTokensToPayWith } from "@/constants/tokens";
import { parseUnits } from "viem";
import { useCallback, useEffect, useMemo } from "react";
import testICOABI from "@/constants/abis/testICOABI.json";
import { useRecentTransactionsStore } from "@/stores/useRecentTransactions";
import {
  useTransactionGasFee, useTransactionGasLimit,
  useTransactionGasPrice,
  useTransactionPriorityFee,
  useTransactionTypeStore
} from "@/stores/useGasSettings";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { usePurchaseData } from "@/stores/usePurchaseData";
import { useReward } from "@/components/organisms/BuyForm/hooks/useReward";

function stringifyObject(object: { [key: string]: any }) {
  return JSON.parse(JSON.stringify(object, (key, value) =>
    typeof value === 'bigint'
      ? value.toString()
      : value // return everything else unchanged
  ));
}

export function usePurchaseTokens({ devMode }) {
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

  const gasSettings = useMemo(() => {
    if (type === "legacy") {
      return { gasPrice }
    } else {
      return { maxPriorityFeePerGas, maxFeePerGas }
    }
  }, [gasPrice, maxFeePerGas, maxPriorityFeePerGas, type]);

  useEffect(() => {
    setPickedTokenId(getTokensToPayWith(devMode)[0].id);
  }, [devMode, setPickedTokenId]);

  const { output } = useReward({ devMode, pickedToken, amountToPay });

  const { config: purchaseConfig, error } = usePrepareContractWrite({
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
    write: buyTokens,
    isLoading: waitingForPurchase
  } = useContractWrite({
    ...purchaseConfig, onSettled: async (data, error) => {
      if (error) {
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
            address: getICOContractAddress(devMode),
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
    }
  });

  const { data, sendTransaction } =
    useSendTransaction({
      to: getICOContractAddress(devMode),
      value: parseUnits(amountToPay, pickedToken.decimals),
      gas: gasLimit,
      ...gasSettings,
      onSettled: async (data) => {
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
              to: getICOContractAddress(devMode),
              value: parseUnits(amountToPay, pickedToken.decimals).toString(),
              gas: gasLimit.toString(),
              ...stringifyObject(gasSettings)
            },
          }, address
        )
      }
    })

  const processBuyTokens = useCallback(() => {
    if (pickedToken.id === 11 || pickedToken.id === 1) {
      //send CLO
      sendTransaction();
      return;
    }

    if (buyTokens) {
      buyTokens();
    }
  }, [buyTokens, pickedToken.id, sendTransaction]);

  return { processBuyTokens, waitingForPurchase, error }
}
