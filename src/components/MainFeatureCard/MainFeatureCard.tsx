import React from "react";
import styles from "./MainFeatureCard.module.scss";
import Image from "next/image";
import Text from "../atoms/Text";
import Spacer from "../atoms/Spacer";

interface Props {
  image: string,
  heading: string,
  text: string
}

export default function MainFeatureCard({image, heading, text}: Props) {
  return <div className={styles.featureCard}>
    <Image src={image} alt="" width={80} height={80} />
    <Spacer height={24} />
    <Text variant={24} weight={600}>{heading}</Text>
    <Spacer height={16} />
    <Text variant={20} color="secondary">{text}</Text>
  </div>;
}
