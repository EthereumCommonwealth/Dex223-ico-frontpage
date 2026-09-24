import Advantages from "@/app/[locale]/components/Advantages";
import Allocation from "@/app/[locale]/components/Allocation";
import Banner from "@/app/[locale]/components/Banner";
import ContactUs from "@/app/[locale]/components/ContactUs";
import EcosystemProblems from "@/app/[locale]/components/EcosystemProblems";
import Features from "@/app/[locale]/components/Features";
import Fight from "@/app/[locale]/components/Fight";
import Info from "@/app/[locale]/components/Info";
import Innovation from "@/app/[locale]/components/Innovation";
import MultiChain from "@/app/[locale]/components/MultiChain";
import Philosophy from "@/app/[locale]/components/Philosophy";
import RevenueModel from "@/app/[locale]/components/RevenueModel";
import Roadmap from "@/app/[locale]/components/Roadmap";
import Subscription from "@/app/[locale]/components/Subscription";
import Team from "@/app/[locale]/components/Team";
import WhyChooseUs from "@/app/[locale]/components/WhyChooseUs";
import ScrollToTopButton from "@/components/organisms/ScrollToTopButton";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 mb-10 md:mb-[119px] lg:mb-[145]">
      <Banner />
      <WhyChooseUs />
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

      <ScrollToTopButton />
    </div>
  );
}
