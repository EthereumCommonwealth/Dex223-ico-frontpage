import Image from "next/image";

import NeonBlock from "@/components/organisms/NeonBlock";
export default function RevenueModel() {
  return (
    <NeonBlock
      fullWidth
      onlyBottom
      icon="double-usd"
      color="green"
      overlineText="Revenue model"
      leftContent={
        <div className="w-full">
          <img src={"/images/revenue.png"} className="w-full max-sm:hidden" alt={""} />
          <img src={"/images/revenue-mobile.png"} className="w-full sm:hidden" alt={""} />
        </div>
      }
    />
  );
}
