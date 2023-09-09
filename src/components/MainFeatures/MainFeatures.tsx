import React from "react";
import styles from "./MainFeatures.module.scss";
import ArticleTitle from "../ArticleTitle";
import ArticleHeading from "../ArticleHeading";
import Text from "../atoms/Text";
import MainFeatureCard from "../MainFeatureCard";
import clsx from "clsx";
import Spacer from "../atoms/Spacer";

const features = [
  {
    image: "/images/main-features/image-2.svg",
    heading: "ERC-223 Support",
    text: "Seamlessly trade your favorite ERC-223 tokens with ease. DEX223's comprehensive support ensures you're always connected to the tokens that matter most to you. Say goodbye to trading limitations and embrace a world of boundless opportunities.",
  },
  {
    image: "/images/main-features/image-1.svg",
    heading: "Margin Trading",
    text: "Dive into the exhilarating realm of margin trading, where you can amplify your potential gains. Whether you're a seasoned trader or an aspiring investor, our intuitive margin trading tools empower you to leverage your strategies for maximum profitability. Take control of your trades like never before.",
  },
  {
    image: "/images/main-features/image-3.svg",
    heading: "Transparent Auto-Listings",
    text: "For the trailblazing developers of new tokens, DEX223 offers a truly unique opportunity. Our transparent auto-listings streamline the process of introducing your tokens to the market. No more waiting in the shadows – showcase your innovation and disrupt the industry with confidence.",
  }
]

export default function MainFeatures() {
  return <div className={clsx("container", styles.mainFeatures)}>
    <div className={styles.blur} />
    <div className={styles.textPart}>
      <ArticleTitle text="Empower. Amplify. Innovate" align="center" />
      <ArticleHeading text="Main Features of DEX223" align="center" />
      <Text tag="p" color="secondary" align="center">
        Experience the future of trading with DEX223 – where innovation meets empowerment. Join our vibrant community
        of traders, investors, and developers who are shaping the landscape of decentralized finance.
        Elevate your trading potential today!
      </Text>
    </div>
    <Spacer height={60} />
    <div className={styles.cards}>
      {features.map(({text, heading, image}) => {
        return <MainFeatureCard key={image} image={image} heading={heading} text={text} />
      })}
    </div>
  </div>;
}
