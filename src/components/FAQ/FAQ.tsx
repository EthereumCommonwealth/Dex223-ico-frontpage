import React from "react";
import styles from "./FAQ.module.scss";
import ArticleTitle from "../ArticleTitle";
import clsx from "clsx";
import ArticleHeading from "../ArticleHeading";
import Text from "../atoms/Text";
import QuestionCollapse from "../QuestionCollapse";

const faq = [
  {
    question: "How can I see ERC-223 tokens in my MetaMask?",
    answer: "ERC-223 is a token standard for the Ethereum blockchain that was proposed as an improvement over the existing ERC-20 standard. ERC-20 tokens have been widely used to create fungible tokens on the Ethereum network, powering various decentralized applications, Initial Coin Offerings (ICOs), and more. However, ERC-20 tokens come with certain limitations, some of which ERC-223 seeks to address."
  },
  {
    question: "What is ERC-223 and how does it differ from ERC-20?",
    answer: "ERC-223 is a token standard for the Ethereum blockchain that was proposed as an improvement over the existing ERC-20 standard. ERC-20 tokens have been widely used to create fungible tokens on the Ethereum network, powering various decentralized applications, Initial Coin Offerings (ICOs), and more. However, ERC-20 tokens come with certain limitations, some of which ERC-223 seeks to address."
  },
  {
    question: "What benefits does ERC-223 bring to the ICO and the DEX?",
    answer: "ERC-223 is a token standard for the Ethereum blockchain that was proposed as an improvement over the existing ERC-20 standard. ERC-20 tokens have been widely used to create fungible tokens on the Ethereum network, powering various decentralized applications, Initial Coin Offerings (ICOs), and more. However, ERC-20 tokens come with certain limitations, some of which ERC-223 seeks to address."
  },
  {
    question: "How can I participate in the ERC-223 Project ICO?",
    answer: "ERC-223 is a token standard for the Ethereum blockchain that was proposed as an improvement over the existing ERC-20 standard. ERC-20 tokens have been widely used to create fungible tokens on the Ethereum network, powering various decentralized applications, Initial Coin Offerings (ICOs), and more. However, ERC-20 tokens come with certain limitations, some of which ERC-223 seeks to address."
  },
  {
    question: "How will the funds raised during the ICO be utilized?",
    answer: "ERC-223 is a token standard for the Ethereum blockchain that was proposed as an improvement over the existing ERC-20 standard. ERC-20 tokens have been widely used to create fungible tokens on the Ethereum network, powering various decentralized applications, Initial Coin Offerings (ICOs), and more. However, ERC-20 tokens come with certain limitations, some of which ERC-223 seeks to address."
  },
  {
    question: "When can I expect the launch of DEX223 after the ICO?",
    answer: "ERC-223 is a token standard for the Ethereum blockchain that was proposed as an improvement over the existing ERC-20 standard. ERC-20 tokens have been widely used to create fungible tokens on the Ethereum network, powering various decentralized applications, Initial Coin Offerings (ICOs), and more. However, ERC-20 tokens come with certain limitations, some of which ERC-223 seeks to address."
  }
]

export default function FAQ() {
  return <div className={clsx(styles.faq, "container")}>
    <div className={styles.titles}>
      <ArticleTitle text="FAQ" />
      <ArticleHeading text="Frequently Asked Questions" />
      <Text variant={20}>You can find answers to common queries in this concise FAQ guide.</Text>
    </div>
    <div className={styles.questions}>
      {faq.map(({question, answer}) => {
       return <QuestionCollapse
         key={question}
         question={question}
         text={answer}
       />
      })}
    </div>
  </div>;
}
