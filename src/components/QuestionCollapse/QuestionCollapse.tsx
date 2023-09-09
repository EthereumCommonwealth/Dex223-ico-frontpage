import React, {useState} from "react";
import styles from "./QuestionCollapse.module.scss";
import Text from "../atoms/Text";
import Collapse from "../Collapse";
import clsx from "clsx";
import Spacer from "../atoms/Spacer";

interface Props {
  question: string,
  text: string
}

export default function QuestionCollapse({question, text}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return <div className={styles.questionCollapse}>
    <div className={styles.questionHeader}>
      <Text variant={24} weight={600}>{question}</Text>
      <button className={clsx(styles.arrow, isOpen && styles.opened)} onClick={() => setIsOpen(!isOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M11.6641 15.9521C11.8838 15.9521 12.0771 15.8643 12.2441 15.6973L19.0557 8.73633C19.2139 8.57812 19.293 8.38477 19.293 8.15625C19.293 7.70801 18.9502 7.35645 18.4932 7.35645C18.2646 7.35645 18.0713 7.44434 17.9219 7.58496L11.6641 13.9834L5.40625 7.58496C5.25684 7.44434 5.05469 7.35645 4.83496 7.35645C4.37793 7.35645 4.03516 7.70801 4.03516 8.15625C4.03516 8.38477 4.11426 8.57812 4.26367 8.73633L11.084 15.6973C11.2422 15.8643 11.4443 15.9521 11.6641 15.9521Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
    <Collapse open={isOpen}>
      <Spacer height={20} />
      <Text color="secondary" variant={20}>{text}</Text>
      <Spacer height={4} />
    </Collapse>

  </div>;
}
