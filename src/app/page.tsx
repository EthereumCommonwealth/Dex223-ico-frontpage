import Advantages from "@/app/components/Advantages";
import Allocation from "@/app/components/Allocation";
import ContactUs from "@/app/components/ContactUs";
import EcosystemProblems from "@/app/components/EcosystemProblems";
import Features from "@/app/components/Features";
import Fight from "@/app/components/Fight";
import Info from "@/app/components/Info";
import MultiChain from "@/app/components/MultiChain";
import Philosophy from "@/app/components/Philosophy";
import Roadmap from "@/app/components/Roadmap";
import Subscription from "@/app/components/Subscription";
import Team from "@/app/components/Team";

export default function HomePage() {
  return (
    <div>
      <Features />
      <EcosystemProblems />
      <Philosophy />
      <Advantages />
      <Allocation />
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
