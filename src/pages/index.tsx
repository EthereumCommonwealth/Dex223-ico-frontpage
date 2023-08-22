import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import clsx from "clsx";
import {useWeb3Modal} from "@web3modal/react";
import TokenCard from "../components/TokenCard";
import {ChangeEvent, useEffect, useMemo, useState} from "react";
import Image from "next/image";
import {tokensToPayWith} from "../constants/tokens";
import Button from "../components/Button";
import {useCountdown} from "../hooks/useCountdown";
import AboutTheProject from "../components/AboutTheProject";
import MainFeatures from "../components/MainFeatures";
import Tokenomics from "../components/Tokenomics";
import TokenInformation from "../components/TokenInformation";
import Competitors from "../components/Competitors";
import MeetTheTeam from "../components/MeetTheTeam";
import PastAchievement from "../components/PastAchievement";
import FAQ from "../components/FAQ";
import Spacer from "../components/Spacer";
import Text from "../components/Text";

const countDownDate = new Date("Sep 30, 2023 00:00:00").getTime();

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [days, hours, minutes, seconds] = useCountdown(countDownDate);

  const {open, close, setDefaultChain} = useWeb3Modal();

  const [amountToPay, setAmountToPay] = useState("");

  const [pickedTokenId, setPickedTokenId] = useState(1);

  const pickedToken = useMemo(() => {
    return tokensToPayWith.find((token) => token.id === pickedTokenId);
  }, [pickedTokenId]);

  if(!hasMounted) {
    return;
  }

  return (
    <>
      <Head>
        <title>ERC223 ICO</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.buySection}>
        <div className={styles.videoWrapper}>
        <video playsInline autoPlay muted loop>
          <source src="/banner.mp4" type="video/mp4" />
        </video>
      </div>
        <header className={styles.header}>
          <div className={clsx("container", styles.headerContent)}>
            <div className={styles.bottomLine}>
              <svg width="3840" height="51" viewBox="0 0 3840 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3840 1H1979L1796.5 50H0" stroke="#5A5A5A"/>
              </svg>
            </div>
            <div className={styles.logoAndNav}>
              <svg width="186" height="47" viewBox="0 0 186 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M51.5706 36.3368V9.66357H60.2433C62.992 9.66357 65.3734 10.2245 67.3875 11.3463C69.4253 12.4443 71.0011 13.9957 72.1148 16.0007C73.2285 18.0057 73.7853 20.3328 73.7853 22.9823C73.7853 25.6078 73.2285 27.935 72.1148 29.9638C71.0011 31.9688 69.4253 33.5322 67.3875 34.654C65.3734 35.7758 62.992 36.3368 60.2433 36.3368H51.5706ZM55.7648 32.5774H60.3143C62.1863 32.5774 63.8095 32.1836 65.1838 31.3959C66.5819 30.6083 67.66 29.4984 68.4183 28.0663C69.1765 26.6342 69.5557 24.9395 69.5557 22.9823C69.5557 21.025 69.1647 19.3423 68.3827 17.9341C67.6245 16.5019 66.5582 15.392 65.1838 14.6044C63.8095 13.8167 62.1863 13.4229 60.3143 13.4229H55.7648V32.5774Z" fill="#F5FFF9"/>
                <path d="M77.9159 36.3368V9.66357H95.3678V13.4229H82.11V21.0847H94.6569V24.844H82.11V32.5774H95.3678V36.3368H77.9159Z" fill="#F5FFF9"/>
                <path d="M96.917 36.3368L105.554 22.8391L97.0592 9.66357H101.822L108.931 20.6909H106.905L113.942 9.66357H118.705L110.246 22.8391L118.883 36.3368H114.12L106.905 25.023L108.931 25.0588L101.644 36.3368H96.917Z" fill="#F5FFF9"/>
                <path d="M124.921 36.3372V33.2939L132.172 25.4889C133.594 23.9613 134.708 22.7321 135.513 21.8012C136.343 20.8465 136.935 20.0111 137.291 19.295C137.67 18.5789 137.859 17.8271 137.859 17.0394C137.859 15.7505 137.468 14.76 136.686 14.0678C135.904 13.3517 134.897 12.9937 133.665 12.9937C132.386 12.9937 131.284 13.3636 130.36 14.1036C129.435 14.8196 128.796 15.8698 128.44 17.2542L124.744 16.1801C125.028 14.7719 125.597 13.5546 126.45 12.5282C127.303 11.478 128.345 10.6665 129.578 10.0936C130.833 9.5208 132.184 9.23438 133.63 9.23438C135.312 9.23438 136.781 9.5566 138.037 10.2011C139.293 10.8216 140.264 11.6928 140.952 12.8147C141.662 13.9365 142.018 15.2373 142.018 16.7172C142.018 17.6958 141.828 18.6505 141.449 19.5814C141.094 20.4884 140.537 21.4551 139.779 22.4815C139.02 23.4839 138.049 24.6177 136.864 25.8827L130.466 32.7569H142.515V36.3372H124.921Z" fill="#3BD171"/>
                <path d="M146.164 36.3372V33.2939L153.415 25.4889C154.837 23.9613 155.951 22.7321 156.756 21.8012C157.586 20.8465 158.178 20.0111 158.533 19.295C158.912 18.5789 159.102 17.8271 159.102 17.0394C159.102 15.7505 158.711 14.76 157.929 14.0678C157.147 13.3517 156.14 12.9937 154.908 12.9937C153.628 12.9937 152.526 13.3636 151.602 14.1036C150.678 14.8196 150.038 15.8698 149.683 17.2542L145.986 16.1801C146.271 14.7719 146.84 13.5546 147.693 12.5282C148.546 11.478 149.588 10.6665 150.82 10.0936C152.076 9.5208 153.427 9.23438 154.872 9.23438C156.555 9.23438 158.024 9.5566 159.28 10.2011C160.536 10.8216 161.507 11.6928 162.194 12.8147C162.905 13.9365 163.261 15.2373 163.261 16.7172C163.261 17.6958 163.071 18.6505 162.692 19.5814C162.337 20.4884 161.78 21.4551 161.021 22.4815C160.263 23.4839 159.292 24.6177 158.107 25.8827L151.709 32.7569H163.758V36.3372H146.164Z" fill="#3BD171"/>
                <path d="M176.044 36.7668C174.622 36.7668 173.284 36.5043 172.028 35.9792C170.796 35.454 169.729 34.7141 168.829 33.7594C167.952 32.8046 167.324 31.6828 166.945 30.3939L170.499 29.0334C170.973 30.2984 171.696 31.277 172.667 31.9692C173.639 32.6614 174.765 33.0075 176.044 33.0075C177.087 33.0075 177.987 32.8046 178.745 32.3989C179.527 31.9931 180.132 31.4202 180.558 30.6803C181.008 29.9404 181.233 29.0453 181.233 27.9951C181.233 26.9688 181.008 26.0856 180.558 25.3457C180.132 24.6058 179.527 24.0448 178.745 23.6629C177.987 23.2811 177.087 23.0901 176.044 23.0901C175.618 23.0901 175.179 23.1259 174.729 23.1975C174.302 23.2691 173.923 23.3646 173.592 23.4839L172.667 21.5148L179.634 13.2443H168.367V9.66401H184.326V13.0653L177.501 21.3L177.395 19.9394C178.982 19.9633 180.38 20.3213 181.589 21.0135C182.797 21.6819 183.733 22.6127 184.397 23.8062C185.084 24.9757 185.428 26.3362 185.428 27.8877C185.428 29.5585 185.025 31.0742 184.219 32.4347C183.413 33.7713 182.3 34.8335 180.878 35.6211C179.48 36.3849 177.869 36.7668 176.044 36.7668Z" fill="#3BD171"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M39.7796 21.3828C39.7777 21.3699 39.7745 21.357 39.7709 21.3429L39.7681 21.3319C39.7658 21.3261 39.764 21.3203 39.7623 21.3145C39.7606 21.3087 39.7589 21.3029 39.7566 21.2972C39.7566 21.2972 39.7559 21.2945 39.7549 21.2913C39.7541 21.2885 39.753 21.2854 39.752 21.2833C39.7244 21.2023 39.6784 21.1121 39.6093 21.0334C39.6093 21.0334 39.607 21.0288 39.6047 21.0288C39.5679 20.9871 39.5242 20.9501 39.4736 20.9223C39.4686 20.9173 39.4624 20.9135 39.4567 20.91C39.4546 20.9087 39.4525 20.9074 39.4506 20.9061L31.9626 16.5588L21.7164 10.6104L21.5438 10.5109L21.4863 10.4762L3.60252 0.0902324H3.59792C3.58182 0.0809778 3.45759 0.0254502 3.34717 0.0092546C3.29426 0.00231365 3.24365 0 3.24365 0H3.17694C3.08433 0.00635022 2.93396 0.10372 2.90023 0.125563L2.90022 0.125566C2.89709 0.127597 2.89496 0.128974 2.89398 0.129564C2.45694 0.382883 2.0199 0.63678 1.58285 0.890676L1.58271 0.89076L1.58269 0.890772C1.14561 1.14469 0.708533 1.39861 0.271454 1.65195C0.266573 1.65587 0.261278 1.6598 0.255744 1.6639L0.255742 1.66391C0.248236 1.66947 0.240291 1.67537 0.232347 1.68202C0.220844 1.69128 0.211642 1.70053 0.20014 1.7121C0.190938 1.71904 0.181736 1.72598 0.174835 1.73755C0.167934 1.74449 0.161032 1.75375 0.154131 1.763C0.110422 1.81159 0.0805161 1.8648 0.0575115 1.91339C0.0483097 1.92958 0.0414083 1.94578 0.0368074 1.96198C0.0230046 2.00593 0.0138028 2.04527 0.00690138 2.07534C0.00460092 2.08923 0.00230046 2.10542 0 2.12162V43.7164H0.00230046C-0.00230046 43.9964 0.0713143 44.1745 0.257652 44.3203C0.267884 44.3271 0.278116 44.3343 0.288465 44.3416C0.306037 44.3539 0.323947 44.3665 0.342769 44.3781L3.02511 45.9352L3.03201 45.9398C3.04581 45.9468 3.05961 45.9514 3.07342 45.956C3.07637 45.959 3.08026 45.9601 3.08389 45.9611C3.08592 45.9616 3.08787 45.9622 3.08952 45.963C3.09757 45.9653 3.1062 45.9676 3.11482 45.9699C3.12345 45.9722 3.13208 45.9745 3.14013 45.9769C3.14588 45.9792 3.15163 45.9809 3.15738 45.9826C3.16313 45.9844 3.16888 45.9861 3.17464 45.9884C3.18013 45.9884 3.18561 45.9895 3.19135 45.9906C3.19764 45.9918 3.20423 45.9931 3.21144 45.9931C3.22295 45.9954 3.23445 45.9954 3.24595 45.9954H3.25516C3.25516 45.9954 3.27587 46 3.28737 46C3.30614 46 3.32645 45.9985 3.34578 45.9954H3.35867C3.35867 45.9954 3.36097 45.9931 3.36327 45.9931C3.36557 45.9931 3.36557 45.9931 3.36788 45.9907C3.37478 45.9907 3.38168 45.9907 3.38858 45.9861C3.40008 45.9838 3.41158 45.9815 3.42309 45.9769C3.43919 45.9769 3.45529 45.9699 3.4714 45.963C3.4875 45.9584 3.5036 45.9514 3.51971 45.9445C3.54961 45.9306 3.57952 45.9144 3.60942 45.8982L11.1549 41.5208L39.4759 25.0939C39.7359 24.9273 39.7888 24.7028 39.7888 24.4136V21.4475C39.7865 21.4244 39.7842 21.4013 39.7796 21.3828ZM6.39299 9.13198V15.7698L12.1027 12.4498L6.39299 9.13198ZM6.72166 22.9965L18.1875 29.6541V16.339L6.72166 22.9965ZM6.38667 36.86V30.2222L12.0964 33.5399L6.38667 36.86ZM24.5689 26.3721L30.3279 23.0306L24.5689 19.6892V26.3721Z" fill="#3BD171"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M39.9327 20.9728C40.0043 21.0016 40.1187 21.131 40.1187 21.131C40.2411 21.2743 40.3252 21.4493 40.362 21.6342V24.6961C40.362 25.0123 40.3191 25.3717 39.9185 25.6303L4.0491 46.4311C4.00614 46.4599 3.97758 46.4741 3.93462 46.4885C3.92745 46.4957 3.90597 46.5029 3.88449 46.5101C3.86301 46.5173 3.84161 46.5244 3.83445 46.5316H3.76293H3.74861C3.70573 46.5604 3.63412 46.5604 3.59124 46.5604C3.55308 46.5604 3.5213 46.5539 3.50008 46.5497C3.48951 46.5476 3.48156 46.546 3.47676 46.546C3.45318 46.546 3.42951 46.5416 3.40829 46.5378C3.39092 46.5346 3.3752 46.5316 3.36227 46.5316H3.30507L3.27643 46.5173C3.2622 46.5173 3.2622 46.5029 3.24787 46.5029C3.23355 46.5029 3.19059 46.4885 3.19059 46.4885C3.17627 46.4741 3.13339 46.4455 3.13339 46.4455L0.4865 44.9073L0.414892 44.8641C0.128808 44.6486 0.0143217 44.3898 0.0143217 44.0448C0.0143217 44.0304 0 44.0016 0 44.0016V2.41485C0 2.40046 0.0143217 2.32851 0.0143217 2.32851C0.0286433 2.25674 0.042965 2.21358 0.0571993 2.15602C0.0571993 2.14163 0.100164 2.06986 0.100164 2.05547C0.114486 2.0267 0.157364 1.94036 0.228885 1.8542L0.314727 1.76787C0.314727 1.76787 0.318657 1.76383 0.326516 1.75804C0.333677 1.75278 0.344069 1.74593 0.357692 1.73909L0.429213 1.6961L3.03322 0.186653C3.04755 0.172264 3.07619 0.172264 3.09042 0.157875C3.11618 0.138397 3.16212 0.107338 3.21792 0.0790863C3.2863 0.0445175 3.36935 0.0141602 3.44812 0.0141602H3.53396H3.67709C3.79157 0.0285492 3.92029 0.0717163 3.99181 0.100494C4.00614 0.114708 4.03478 0.129097 4.03478 0.129097L39.9042 20.9442L39.9327 20.9728ZM25.1529 29.5978L39.1888 21.4617L21.7763 11.3561L19.4155 12.736L34.1954 21.3178C34.2607 21.3554 34.3017 21.4052 34.3223 21.4633C34.3333 21.4942 34.3385 21.5274 34.3385 21.5623C34.3385 21.6391 34.3192 21.7032 34.2766 21.7544C34.2555 21.7797 34.2286 21.802 34.1954 21.8211L25.1529 27.0678V29.5978ZM25.1529 20.4841V26.1336L30.0318 23.3016L25.1529 20.4841ZM3.39092 0.905403C3.37659 0.905403 3.36227 0.919792 3.36227 0.919792L1.21612 2.17041L15.996 10.7522C16.0383 10.7735 16.0738 10.8087 16.0988 10.8512C16.1244 10.8947 16.1391 10.9456 16.1391 10.9967C16.1391 11.0972 16.0818 11.198 15.996 11.2411L6.96784 16.5022V19.0323L20.975 10.896L3.63412 0.833458L3.54828 0.819244C3.51972 0.833458 3.46244 0.862236 3.39092 0.905403ZM6.96784 9.91856V15.5536L11.8182 12.736L6.96784 9.91856ZM14.8227 10.9967L0.815549 2.86038V23.0285L3.17627 24.4085V7.27361C3.17627 7.17288 3.23355 7.08672 3.3194 7.02917C3.40524 6.97161 3.51972 6.97161 3.60557 7.02917L12.648 12.2761L14.8227 10.9967ZM3.3194 28.1174C3.40524 28.0742 3.51972 28.0742 3.60557 28.1174L12.6337 33.3641L14.8227 32.0991L0.815549 23.9486V44.0016C0.801227 44.1597 0.815549 44.1741 0.901392 44.2173L3.14771 45.5255L3.17627 28.376C3.17627 28.2755 3.23355 28.1747 3.3194 28.1174ZM6.96784 36.6416L11.8325 33.8242L6.96784 31.0067V36.6416ZM3.94894 45.5828L21.3614 35.463V32.7173L6.56727 41.2991C6.48143 41.3567 6.38126 41.3567 6.2811 41.2991C6.19526 41.2417 6.13797 41.1554 6.13797 41.0549L6.16661 30.5466L3.97758 29.2673L3.94894 45.5828ZM21.3614 17.8392C21.3614 17.7385 21.4186 17.6379 21.5045 17.5948C21.5903 17.5372 21.7047 17.5372 21.7906 17.5948L25.0098 19.4492C25.0385 19.4636 25.0814 19.4924 25.0814 19.4924L30.8331 22.8417L33.0222 21.5623L18.6143 13.1961L6.59583 20.1823C6.50998 20.2255 6.3955 20.2255 6.30965 20.1823C6.22381 20.1248 6.16661 20.0386 6.16661 19.9235V9.44424L3.97758 8.17924V24.8686L15.996 31.8404C16.0818 31.8836 16.1391 31.9841 16.1391 32.0849C16.1391 32.1321 16.1265 32.1793 16.1042 32.2221C16.079 32.2703 16.0415 32.313 15.996 32.3435L12.7911 34.2123L6.95352 37.5904V40.1492L21.3614 31.7829V17.8392ZM39.5035 24.9404C39.5465 24.9116 39.5608 24.883 39.5608 24.6961V22.1805L24.7809 30.7335C24.6951 30.7911 24.5949 30.7911 24.4948 30.7335C24.4089 30.6904 24.3517 30.5898 24.3517 30.4891V19.9954L22.1626 18.7304V35.0029L39.5035 24.9404ZM18.5714 15.9704C18.6572 15.9128 18.7717 15.9128 18.8575 15.9704C18.9434 16.0278 19.0007 16.1141 19.0007 16.2146V30.3454C19.0007 30.4459 18.9434 30.5466 18.8575 30.5896C18.8146 30.6184 18.7574 30.6328 18.7145 30.6328C18.6572 30.6328 18.5714 30.5896 18.5714 30.5896L6.40982 23.5316C6.32398 23.4885 6.26678 23.3877 6.26678 23.3016V23.2728C6.26678 23.1723 6.32398 23.0859 6.40982 23.0284L18.5714 15.9704ZM18.1994 17.1203L7.58306 23.2872L18.1994 29.4397V17.1203Z" fill="#161815"/>
              </svg>
              <nav>
                <ul className={styles.navList}>
                  <li>How to buy</li>
                  <li>Whitepaper</li>
                  <li>Contact us</li>
                </ul>
              </nav>
            </div>
            <div className={styles.settings}>
              <ul className={styles.navList}>
                <li>Telegram</li>
                <li>Twitter</li>
                <li>Medium</li>
              </ul>
            </div>
          </div>
        </header>
        <main className={clsx(styles.main, "container")}>
          <div className={styles.buyERC223}>
            <div className={styles.mainInfo}>
              <h1>ERC-223: Empowering <span className={styles.purple}>Secure</span> and <span className={styles.green}>Seamless</span> Token Transfers!</h1>
              <p className={styles.subheading}>Unlocking the Future of Tokenomics with ERC-223: Enhanced Efficiency, Safety, and User Experience!</p>
              <div style={{width: 192, marginBottom: 40, marginTop: 24}}>
                <Button variant="outlined">
                  <span className={styles.externalButton}>
                    Whitepaper
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                      <path d="M18.2227 15.3799C18.2227 15.6201 18.1406 15.8193 17.9766 15.9775C17.8184 16.1357 17.6338 16.2148 17.4229 16.2148C17.2061 16.2148 17.0186 16.1328 16.8604 15.9688C16.708 15.8047 16.6318 15.6201 16.6318 15.415V12.1631L16.79 8.05859L15.3398 9.70215L6.6123 18.4209C6.4541 18.5791 6.26953 18.6582 6.05859 18.6582C5.91211 18.6582 5.77734 18.6201 5.6543 18.5439C5.53125 18.4678 5.43164 18.3682 5.35547 18.2451C5.2793 18.1162 5.24121 17.9814 5.24121 17.8408C5.24121 17.6357 5.32324 17.4512 5.4873 17.2871L14.1973 8.55957L15.832 7.12695L11.543 7.26758H8.48438C8.2793 7.26758 8.09473 7.19141 7.93066 7.03906C7.77246 6.88086 7.69336 6.69629 7.69336 6.48535C7.69336 6.27441 7.76953 6.08984 7.92188 5.93164C8.07422 5.76758 8.27344 5.68555 8.51953 5.68555H17.3613C17.625 5.68555 17.833 5.76465 17.9854 5.92285C18.1377 6.08105 18.2139 6.28613 18.2139 6.53809L18.2227 15.3799Z" fill="currentColor"/>
                    </svg>
                  </span>
                </Button>
              </div>
              <div className={styles.howToBuy}>
                <h2>How to buy?</h2>
                <p className={styles.paragraph}>To buy ICO coins, first, ensure you have a compatible wallet with ETH. Connect your wallet,
                  and purchase tokens by entering your desired ETH amount and confirming the transaction.
                  Once confirmed, your tokens will be available in your wallet. Read more detailed instructions here.</p>
              </div>

              <div className={styles.erc223Address}>
                <h2>Contract address:</h2>
                <p className={styles.subheading}>0x9e3549954138E52C230aCB92A9358C3842ABEb41</p>
              </div>

            </div>
            <div className={styles.formToBuy}>
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
              <div className={styles.raised}>USDT raised: $1,234,234 / $8,000,000</div>
              <div className={styles.ratio}>1 DEX223 = 0.023 {pickedToken.symbol}</div>

              <div className={styles.tokenCards}>
                {tokensToPayWith.map((token) => {
                  return <button key={token.id} onClick={() => setPickedTokenId(token.id)} className={clsx(styles.tokenPickButton, pickedTokenId === token.id && styles.active)}>
                    <Image width={24} height={24} src={token.image} alt="" />
                    {token.symbol}
                  </button>
                })}
              </div>
              <TokenCard type="pay" tokenName={pickedToken.symbol} tokenLogo={pickedToken.image} amount={amountToPay} handleChange={(e: ChangeEvent<HTMLInputElement>) => setAmountToPay(e.target.value)} />
              <div className={styles.spacer12} />
              <TokenCard type="receive" tokenName="DEX223" tokenLogo="/images/tokens/DEX.svg" amount={"10"} handleChange={null} readonly />
              <div className={styles.spacer20} />
              <Button onClick={open}>Connect wallet</Button>
              <div className={styles.spacer12} />
              <Button variant="outlined">How to buy?</Button>
            </div>
          </div>
        </main>
      </div>

      <AboutTheProject />
      <Spacer height={240} />
      <MainFeatures />
      <Spacer height={240} />
      <Tokenomics />
      <Spacer height={240} />
      <TokenInformation />
      <Spacer height={240} />
      <Competitors />
      <Spacer height={240} />
      <MeetTheTeam />
      <Spacer height={240} />
      <PastAchievement />
      <Spacer height={240} />
      <div className={clsx(styles.gradientBlocks, "container")}>
        <div className={styles.gradientBlock} />
        <div className={styles.bottomGradients}>
          <div className={styles.gradientBlock2}>
            <div className={styles.greenGradient} />
            <div className={styles.purpleGradient} />
            <div className={styles.greenGradient} />
            <div className={styles.purpleGradient} />
            <div className={styles.greenGradient} />
            <div className={styles.purpleGradient} />
          </div>
          <div className={styles.gradientBlock3} />
        </div>
      </div>
      <Spacer height={60} />
      <FAQ />
      <Spacer height={240} />
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerLinks}>
            <div className={styles.leftLinks}>
              <div className={styles.linkColumn}>
                <div className={styles.footerLinkGroupTitle}>Useful links</div>
                <div><a href="#" className={styles.footerLink}>How to buy</a></div>
                <div><a href="#" className={styles.footerLink}>Whitepapper</a></div>
                <div><a href="#" className={styles.footerLink}>Contact us</a></div>
              </div>
              <div className={styles.linkColumn}>
                <div className={styles.footerLinkGroupTitle}>Social media</div>
                <div><a href="#" className={styles.footerLink}>Telegram</a></div>
                <div><a href="#" className={styles.footerLink}>Twitter</a></div>
                <div><a href="#" className={styles.footerLink}>Medium</a></div>
              </div>
              <div className={styles.linkColumn}>
                <div className={styles.footerLinkGroupTitle}>Legal</div>
                <div><a href="#" className={styles.footerLink}>Terms and Conditions</a></div>
                <div><a href="#" className={styles.footerLink}>Privacy</a></div>
                <div><a href="#" className={styles.footerLink}>Cookies</a></div>
              </div>
            </div>
            <div className={styles.rightLinks}>
              <div className={styles.linkColumn}>
                <div className={styles.footerLinkGroupTitle}>Address</div>
                <div><a href="#" className={styles.address}>Av. Louise 152, 1021 Bruxelles, Belgium</a></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottomFooter}>
          <div className="container">
            <div className={styles.bottomFooterContent}>
              <div style={{maxWidth: 872}}><Text variant={16} color="secondary">Disclaimer: Cryptocurrency may be unregulated in your jurisdiction. The value of cryptocurrencies may go down as well as up. Profits may be subject to capital gains or other taxes applicable in your jurisdiction.</Text></div>
              <Text align="right" variant={16} color="secondary">Copyright © 2023 DEX223 <br /> All Rights Reserved</Text>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
