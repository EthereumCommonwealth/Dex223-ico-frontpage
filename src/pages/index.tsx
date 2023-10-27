import { useEffect, useState } from "react";
import NewBanner from "../components/sections/NewBanner";
import Header from "../components/sections/Header";
import EcosystemProblems from "../components/sections/EcosystemProblems";
import Philosophy from "../components/sections/Philosophy";
import Innovation from "../components/sections/Innovation";
import Tokenomics from "../components/sections/Tokenomics";
import InfoSection from "../components/sections/InfoSection";
import Competitors from "../components/sections/Competitors";
import BuildingTrust from "../components/sections/BuildingTrust";
import Fight from "../components/sections/Fight";
import ContactUs from "../components/sections/ContactUs";
import Spacer from "../components/atoms/Spacer";
import Footer from "../components/sections/Footer";
import ScrollToTopButton from "../components/organisms/ScrollToTopButton";
import MeetTheTeam from "@/components/sections/MeetTheTeam";
import {useRecentTransactions} from "@/stores/useRecentTransactions";
export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
    document.getElementById("__next").className = "overflow-hidden";
  }, []);

  if(!hasMounted) {
    return;
  }

  return (
    <>
      {/* ADAPTED */}

      <Header />
      <NewBanner />
      <EcosystemProblems />

      <Spacer height={40} />
      <Philosophy />
      <Spacer height={40} />
      <Innovation />
      <Spacer height={40} />
      <Tokenomics />
      <Spacer height={40} />
      <InfoSection />
      <Spacer height={40} />
      <Competitors />
      <Spacer height={40} />
      <BuildingTrust />
      <Spacer height={40} />
      <Fight />
      <Spacer height={40} />
      <MeetTheTeam />
      <Spacer height={40} />
      <ContactUs />

      <ScrollToTopButton />
      <Footer />
    </>
  )
}
