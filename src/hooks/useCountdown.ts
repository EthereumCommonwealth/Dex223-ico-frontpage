import { useEffect, useState } from "react";

export const useCountdown = (targetDate: Date | string | number) => {
  const countDownDate = new Date(targetDate).getTime();
  const [countDown, setCountDown] = useState(countDownDate - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const distance = countDownDate - Date.now();

      if (distance <= 0) {
        setCountDown(0);
        clearInterval(interval);
      } else {
        setCountDown(distance);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return formatCountdown(countDown);
};

function formatCountdown(diff: number) {
  if (diff <= 0) return "Finished";

  const totalSeconds = Math.floor(diff / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  if (totalDays > 0) {
    return `${totalDays}d left`;
  }

  if (totalHours >= 1) {
    const hours = totalHours;
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m left`;
  }

  if (totalMinutes >= 1) {
    const minutes = totalMinutes;
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s left`;
  }

  return `${totalSeconds}s left`;
}
