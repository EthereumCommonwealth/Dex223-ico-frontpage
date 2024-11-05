import { useEffect, useState } from "react";

import Layout from "@/components/layout/Layout";
import MultichainRollout from "@/pages/homepage/components/MultichainRollout";
import Roadmap from "@/pages/homepage/components/Roadmap";

import Spacer from "../components/atoms/Spacer";
import ScrollToTopButton from "../components/organisms/others/ScrollToTopButton";
import BuildingTrust from "./homepage/components/BuildingTrust";
import Competitors from "./homepage/components/Competitors";
import ContactUs from "./homepage/components/ContactUs";
import EcosystemProblems from "./homepage/components/EcosystemProblems";
import Fight from "./homepage/components/Fight";
import InfoSection from "./homepage/components/InfoSection";
import Innovation from "./homepage/components/Innovation";
import MeetTheTeam from "./homepage/components/MeetTheTeam";
import NewBanner from "./homepage/components/NewBanner";
import Philosophy from "./homepage/components/Philosophy";
import Tokenomics from "./homepage/components/Tokenomics";

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
        <NewBanner />
        <EcosystemProblems />

        <Spacer height={40} />
        <Philosophy />
        <Spacer height={40} />
        <Innovation />
        <Spacer height={40} />
        <Tokenomics />
        <Spacer height={40} />
        <MultichainRollout />
        <Spacer height={40} />
        <InfoSection />
        <Spacer height={40} />
        <Competitors />
        <Spacer height={40} />
        {/*<BuildingTrust/>*/}
        {/*<Spacer height={40}/>*/}
        <Fight />
        <Spacer height={40} />
        <Roadmap />
        <Spacer height={40} />
        <MeetTheTeam />
        <Spacer height={40} />
        <ContactUs />

        <ScrollToTopButton />
      </Layout>
    </>
  );
}
