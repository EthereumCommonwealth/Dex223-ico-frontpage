import React from "react";
import styles from "./BannerRightBlock.module.scss";
import BuyForm from "../BuyForm";
import Button from "../../atoms/Button";
import {useCountdown} from "../../../hooks/useCountdown";
import Svg from "../../atoms/Svg";

const countDownDate = new Date("Oct 16, 2023 00:00:00").getTime();

export default function BannerRightBlock() {
  // const [days, hours, minutes, seconds] = useCountdown(countDownDate);
  const [days, hours, minutes, seconds] = ["——", "——", "——", "——"]

  return <div className={styles.formToBuy}>
    <p className={styles.stayTuned}>
      Stay tuned for the next round
    </p>
    <div className={styles.counter}>
      <span className={styles.counterNumber}>{days}</span>
      <span className={styles.doubleDots}>:</span>
      <span className={styles.counterNumber}>{hours}</span>
      <span className={styles.doubleDots}>:</span>
      <span className={styles.counterNumber}>{minutes}</span>
      <span className={styles.doubleDots}>:</span>
      <span className={styles.counterNumber}>{seconds}</span>
    </div>
    <div className={styles.counterLabels}>
      <div className={styles.counterTimeLabel}>Days</div>
      <div className={styles.counterTimeLabel}>Hours</div>
      <div className={styles.counterTimeLabel}>Minutes</div>
      <div className={styles.counterTimeLabel}>Seconds</div>
    </div>
    <BuyForm />
  </div>
}
