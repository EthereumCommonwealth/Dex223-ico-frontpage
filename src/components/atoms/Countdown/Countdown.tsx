import styles from "./Countdown.module.scss";
import React from "react";
import { useCountdown } from "@/hooks/useCountdown";


const countDownDate = new Date(Date.UTC(2024, 0, 11, 0,0,0,0));

export default function Countdown() {
  const [days, hours, minutes, seconds] = ["——", "——", "——", "——"];
  // const [days, hours, minutes, seconds] = useCountdown(countDownDate);

  return (<>
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
  </>)
}
