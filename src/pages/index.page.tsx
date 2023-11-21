import { useEffect, useState } from "react";
import NewBanner from "./homepage/components/NewBanner";
import EcosystemProblems from "./homepage/components/EcosystemProblems";
import Philosophy from "./homepage/components/Philosophy";
import Innovation from "./homepage/components/Innovation";
import Tokenomics from "./homepage/components/Tokenomics";
import InfoSection from "./homepage/components/InfoSection";
import Competitors from "./homepage/components/Competitors";
import BuildingTrust from "./homepage/components/BuildingTrust";
import Fight from "./homepage/components/Fight";
import ContactUs from "./homepage/components/ContactUs";
import Spacer from "../components/atoms/Spacer";
import ScrollToTopButton from "../components/organisms/ScrollToTopButton";
import MeetTheTeam from "./homepage/components/MeetTheTeam";
import Layout from "@/components/layout/Layout";

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
    document.getElementById("__next").className = "overflow-hidden";
  }, []);

  if (!hasMounted) {
    return;
  }

  return (
    <>
      <Layout>
        <NewBanner/>
        <EcosystemProblems/>

        <Spacer height={40}/>
        <Philosophy/>
        <Spacer height={40}/>
        <Innovation/>
        <Spacer height={40}/>
        <Tokenomics/>
        <Spacer height={40}/>
        <InfoSection/>
        <Spacer height={40}/>
        <Competitors/>
        <Spacer height={40}/>
        <BuildingTrust/>
        <Spacer height={40}/>
        <Fight/>
        <Spacer height={40}/>
        <MeetTheTeam/>
        <Spacer height={40}/>
        <ContactUs/>

        <ScrollToTopButton/>
      </Layout>
    </>
  )
}
