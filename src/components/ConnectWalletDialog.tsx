import DialogHeader from "@/components/DialogHeader";
import {
  useConnectWalletDialogStateStore,
} from "@/stores/useConnectWalletStore";
import KeystoreCard from "@/components/wallet-cards/KeystoreCard";
import MetamaskCard from "@/components/wallet-cards/MetamaskCard";
import WalletConnectCard from "@/components/wallet-cards/WalletConnectCard";
import DrawerDialog from "@/components/DrawerDialog";

function StepLabel({ step, label }: { step: string; label: string }) {
  return (
    <div className="flex gap-5 items-center">
      <span className="w-10 h-10 text-18 rounded-full bg-tertiary-bg flex items-center justify-center">
        {step}
      </span>
      <span className="text-18 font-bold">{label}</span>
    </div>
  );
}

export default function ConnectWalletDialog() {
  const { isOpened: isOpenedWallet, setIsOpened: setOpenedWallet } =
    useConnectWalletDialogStateStore();

  return (
    <DrawerDialog isOpen={isOpenedWallet} setIsOpen={setOpenedWallet}>
      <div className="w-full md:w-[600px]">
        <DialogHeader onClose={() => setOpenedWallet(false)} title={"Connect wallet"} />
        <div className="card-spacing">
          <div className="grid grid-cols-3 gap-3 mt-3">
            <MetamaskCard />
            <WalletConnectCard />
            <KeystoreCard />
          </div>
        </div>
      </div>
    </DrawerDialog>
  );
}
