import NeonBlock from "@/components/organisms/NeonBlock";
import Image from "next/image";
export default function RevenueModel() {
  return <NeonBlock fullWidth onlyBottom icon="double-usd" color="green" overlineText="Revenue model" leftContent={
    <div className="w-full">
      <img src={"/images/revenue.png"} className="w-full" alt={""}/>
    </div>}
  />
}
