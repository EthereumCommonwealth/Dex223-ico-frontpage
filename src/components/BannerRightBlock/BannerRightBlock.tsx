import React from "react";
import styles from "./BannerRightBlock.module.scss";
import BuyForm from "../BuyForm";
import Button from "../atoms/Button";
import {useCountdown} from "../../hooks/useCountdown";

const countDownDate = new Date("Sep 30, 2023 00:00:00").getTime();

export default function BannerRightBlock() {
  // const [days, hours, minutes, seconds] = useCountdown(countDownDate);
  const [days, hours, minutes, seconds] = ["——", "——", "——", "——"]

  return <div className={styles.formToBuy}>
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
    <div className={styles.progressBar}>
      <div className={styles.bar} />
    </div>
    <div className={styles.raised}>USDT raised: — / —</div>
    <BuyForm />
    <Button variant="outlined">How to buy?</Button>
  </div>
}
