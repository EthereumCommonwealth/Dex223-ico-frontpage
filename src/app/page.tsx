import Advantages from "@/app/components/Advantages";
import Allocation from "@/app/components/Allocation";
import Banner from "@/app/components/Banner";
import ContactUs from "@/app/components/ContactUs";
import EcosystemProblems from "@/app/components/EcosystemProblems";
import Features from "@/app/components/Features";
import Fight from "@/app/components/Fight";
import Info from "@/app/components/Info";
import Innovation from "@/app/components/Innovation";
import MultiChain from "@/app/components/MultiChain";
import Philosophy from "@/app/components/Philosophy";
import RevenueModel from "@/app/components/RevenueModel";
import Roadmap from "@/app/components/Roadmap";
import Subscription from "@/app/components/Subscription";
import Team from "@/app/components/Team";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 mb-[119px] lg:mb-[145]">
      <Banner />
      <Features />
      <Philosophy />
      <Innovation />
      <EcosystemProblems />
      <Advantages />
      <Allocation />
      <RevenueModel />
      <MultiChain />
      <Info />
      <Fight />
      <Roadmap />
      <Team />
      <ContactUs />
      <Subscription />
    </div>
  );
}
