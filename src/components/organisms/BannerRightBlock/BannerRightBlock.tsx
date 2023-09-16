import React from "react";
import styles from "./BannerRightBlock.module.scss";
import BuyForm from "../BuyForm";
import Button from "../../atoms/Button";
import {useCountdown} from "../../../hooks/useCountdown";

const countDownDate = new Date("Oct 16, 2023 00:00:00").getTime();

export default function BannerRightBlock() {
  // const [days, hours, minutes, seconds] = useCountdown(countDownDate);
  const [days, hours, minutes, seconds] = ["——", "——", "——", "——"]

  return <div className={styles.formToBuy}>
    <div className={styles.completed}>
      <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
        <path d="M13.1004 20.9332L25.2004 8.8332C25.4019 8.6332 25.6412 8.5332 25.9182 8.5332C26.1952 8.5332 26.4338 8.63379 26.6338 8.83497C26.8338 9.03612 26.9338 9.27501 26.9338 9.55164C26.9338 9.82824 26.8338 10.0665 26.6338 10.2665L13.8004 23.0999C13.6004 23.2999 13.3671 23.3999 13.1004 23.3999C12.8338 23.3999 12.6004 23.2999 12.4004 23.0999L6.33377 17.0332C6.13377 16.8317 6.03933 16.5925 6.05044 16.3154C6.06155 16.0384 6.16769 15.7999 6.36887 15.5999C6.57003 15.3999 6.80892 15.2999 7.08554 15.2999C7.36214 15.2999 7.60044 15.3999 7.80044 15.5999L13.1004 20.9332Z" fill="#F5FFF9"/>
      </svg>
      <span>First round completed in less than 24 hours!</span>
    </div>
    <p className={styles.stayTuned}>
      Stay in tune to know about the next round
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
    {/*<Button variant="outlined">How to buy?</Button>*/}
  </div>
}
