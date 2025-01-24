"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { Address } from "viem";
import {
  useAccount,
  useBalance,
  useBlockNumber,
  useConnect,
  useContractWrite,
  useSwitchChain,
  useWalletClient,
  useWriteContract,
} from "wagmi";

import Button from "@/components/atoms/Button";
import Preloader from "@/components/atoms/Preloader";
import { ERC223_ABI } from "@/constants/abis/erc223";
import { DEX223, DEX223_UPGRADED, upgradeD223Contract } from "@/constants/tokens";
import useMediaQuery from "@/hooks/useMediaQuery";
import addToast from "@/other/toast";
import { useConnectWalletDialogStateStore } from "@/stores/useConnectWalletStore";

export default function UpgradePage() {
  const { isOpened: isOpenedWallet, setIsOpened: setOpenedWallet } =
    useConnectWalletDialogStateStore();
  const isMobile = useMediaQuery("(max-width: 640px)");

  const { address, isConnected, chainId } = useAccount();
  const { data: blockNumber } = useBlockNumber({
    scopeKey: "global",
    watch: true,
    cacheTime: 5000,
  });
  const { data: D223Balance, refetch: refetchBalance } = useBalance({
    address: address,
    token: DEX223.address,
    query: {
      enabled: Boolean(address),
    },
  });

  useEffect(() => {
    refetchBalance();
  }, [blockNumber, refetchBalance]);

  const [status, setStatus] = useState<"initial" | "error" | "success">("initial");
  const [hash, setHash] = useState<Address | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { data: walletClient } = useWalletClient();

  const handleUpgrade = useCallback(async () => {
    if (!walletClient) {
      addToast("Wallet client not found", "error");
      return;
    }

    if (!D223Balance?.value) {
      addToast("Balance is empty", "error");
      return;
    }

    try {
      setIsLoading(true);
      const hash = await walletClient.writeContract({
        abi: ERC223_ABI,
        functionName: "transfer",
        address: DEX223.address,
        args: [upgradeD223Contract, D223Balance.value],
        gas: BigInt(90000),
      });

      setHash(hash);
      setStatus("success");
    } catch (e) {
      if (
        e?.cause?.name !== "UserRejectedRequestError" &&
        e?.cause?.cause?.name !== "UserRejectedRequestError"
      ) {
        setStatus("error");
      }
      console.log(e);
      addToast("Something went wrong", "error");
    } finally {
      setIsLoading(false);
    }
  }, [D223Balance?.value, walletClient]);

  const { switchChain, isPending: loadingSwitchNetwork } = useSwitchChain();

  return (
    <div className="max-w-[600px] mx-auto h-[calc(100vh-48px)] flex items-center justify-center relative">
      <div className="w-full px-4">
        {/*<div className={styles.pattern1}>*/}
        {/*  <Image alt="" src="/images/patterns/purple.svg" width={600} height={600} />*/}
        {/*</div>*/}
        {/*<div className={styles.pattern2}>*/}
        {/*  <Image alt="" src="/images/patterns/green.svg" width={600} height={600} />*/}
        {/*</div>*/}
        {status === "initial" && (
          <>
            <h1 className="text-48 text-center text-primary-text font-bold">Upgrade your tokens</h1>
            {!isConnected && (
              <p className="text-16 md:text-20 text-secondary-text text-center mt-2">
                Connect your wallet to see your balance
              </p>
            )}

            {isConnected && (
              <div className="mt-6 max-sm:flex-col max-sm:gap-1 flex justify-between rounded-3 bg-primary-bg items-center px-5 py-3">
                <span className="text-secondary-text">You have</span>

                <div className="flex items-center gap-2">
                  <span className="font-medium text-16 md:text-20 text-primary-text">
                    {D223Balance?.formatted}
                  </span>
                  <div className="bg-tertiary-bg rounded-2 flex items-center pr-3 py-1 pl-1 gap-1">
                    <Image src={DEX223_UPGRADED.image} width={24} height={24} alt="DEX223" />
                    <span className="text-secondary-text">D223</span>
                  </div>
                </div>
              </div>
            )}

            {isConnected ? (
              <>
                {chainId === 1 ? (
                  <>
                    {!!D223Balance?.value && (
                      <div className="flex justify-center mt-6">
                        <Button
                          disabled={isLoading}
                          onClick={async () => {
                            await handleUpgrade();
                          }}
                          fullWidth={isMobile}
                        >
                          {isLoading ? (
                            <span className="flex items-center gap-2">
                              Upgrading tokens
                              <Preloader size={24} />
                            </span>
                          ) : (
                            "Upgrade tokens now"
                          )}
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex justify-center mt-6">
                    <Button
                      disabled={loadingSwitchNetwork}
                      onClick={() => switchChain({ chainId: 1 })}
                      fullWidth={isMobile}
                    >
                      {loadingSwitchNetwork ? (
                        <span className="flex items-center gap-2">
                          Switching network
                          <Preloader size={24} />
                        </span>
                      ) : (
                        "Switch to Ethereum"
                      )}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-6 flex items-center flex-col sm:flex-row justify-center gap-3">
                <div className="flex items-center gap-3">
                  <Button onClick={() => setOpenedWallet(true)}>Connect wallet</Button>
                </div>
              </div>
            )}
          </>
        )}
        {status === "error" && (
          <div className="flex flex-col items-center">
            <Image width={160} height={160} src="/status/error.svg" alt="success" />
            <h2 className="text-primary-text text-24 ">Something went wrong</h2>
            <p className="text-center text-secondary-text mb-6 max-w-[420px] mx-auto">
              There was an error during the token upgrade process. Please try again
            </p>
            <Button fullWidth={isMobile} onClick={() => setStatus("initial")}>
              Try again
            </Button>
          </div>
        )}
        {status === "success" && (
          <div className="flex flex-col items-center">
            <Image width={160} height={160} src="/status/success.svg" alt="success" />
            <h2 className="text-primary-text text-24 mb-2 font-medium">
              Tokens successfully upgraded
            </h2>
            <p className="text-center text-secondary-text mb-6 max-w-[420px] mx-auto">
              The tokens have been successfully upgraded and are now ready for use
            </p>

            <a
              target="_blank"
              className="text-green hover:text-green_hover"
              href={`https://etherscan.io/tx/${hash}`}
            >
              <span className="flex items-center gap-1">
                View transaction
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.2236 14.8799C18.2236 15.1201 18.1416 15.3193 17.9775 15.4775C17.8193 15.6357 17.6348 15.7148 17.4238 15.7148C17.207 15.7148 17.0195 15.6328 16.8613 15.4688C16.709 15.3047 16.6328 15.1201 16.6328 14.915V11.6631L16.791 7.55859L15.3408 9.20215L6.61328 17.9209C6.45508 18.0791 6.27051 18.1582 6.05957 18.1582C5.91309 18.1582 5.77832 18.1201 5.65527 18.0439C5.53223 17.9678 5.43262 17.8682 5.35645 17.7451C5.28027 17.6162 5.24219 17.4814 5.24219 17.3408C5.24219 17.1357 5.32422 16.9512 5.48828 16.7871L14.1982 8.05957L15.833 6.62695L11.5439 6.76758H8.48535C8.28027 6.76758 8.0957 6.69141 7.93164 6.53906C7.77344 6.38086 7.69434 6.19629 7.69434 5.98535C7.69434 5.77441 7.77051 5.58984 7.92285 5.43164C8.0752 5.26758 8.27441 5.18555 8.52051 5.18555H17.3623C17.626 5.18555 17.834 5.26465 17.9863 5.42285C18.1387 5.58105 18.2148 5.78613 18.2148 6.03809L18.2236 14.8799Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
