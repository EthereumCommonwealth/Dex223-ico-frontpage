import React from "react";
import styles from "./BuildingTrust.module.scss";
import ArticleHeading from "../../ArticleHeading";
import Spacer from "../../atoms/Spacer";
import NeonBlock from "../../organisms/NeonBlock";
import Text from "../../atoms/Text";

export default function BuildingTrust() {
  return <NeonBlock
    icon={<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M27.9937 11.8227C27.7341 12.52 27.2319 13.5354 26.16 14.6202C24.5261 11.3608 24.7484 7.82058 26.6826 5.73828C27.6681 4.67753 28.8948 4.21339 29.7845 4C29.6388 4.2946 29.4111 4.78375 29.1913 5.40909C28.6742 6.87777 28.5871 7.99242 28.5064 9.02611C28.4337 9.95745 28.3661 10.8231 27.9937 11.8227ZM25.2189 14.5512C25.234 14.1679 25.201 13.6084 24.9286 13.0352C24.4432 12.0147 23.4532 11.4894 22.2143 10.8321L22.2143 10.8321L22.2143 10.8321L22.2139 10.8319C21.9859 10.7109 21.7727 10.6061 21.5715 10.5073L21.5715 10.5073L21.5714 10.5072L21.5714 10.5072C20.8472 10.1514 20.279 9.87227 19.7397 9.18932C19.5666 8.97037 19.4463 8.77273 19.3708 8.6378C19.2606 9.23378 19.1848 10.2161 19.6194 11.2457C20.1712 12.5519 21.5534 13.9539 22.9077 13.9789C22.958 13.9799 23.0163 13.9791 23.0816 13.9782L23.0818 13.9782H23.0819C23.4752 13.9729 24.1229 13.9641 24.8229 14.3146C24.9978 14.4023 25.1329 14.4909 25.2189 14.5512ZM30.0559 14.911C31.7404 15.2541 33.4833 15.6089 34.625 14.6609C36.0325 13.4917 35.6444 11.075 35.5938 10.7844C35.4142 10.8088 35.1461 10.8601 34.842 10.9805C34.3179 11.1876 34.0279 11.465 33.7352 11.7448C33.5103 11.9599 33.2838 12.1765 32.9485 12.3637C32.617 12.5486 32.176 12.6413 31.283 12.7568C30.7094 12.831 30.298 12.8675 29.9829 12.8955L29.9828 12.8955L29.9828 12.8955C29.389 12.9483 29.137 12.9707 28.7859 13.1573C28.268 13.4328 27.9409 13.85 27.7403 14.1764C28.2946 14.4191 29.0814 14.7128 30.0559 14.911ZM22.3628 25.3384C22.4775 25.9786 22.6624 27.5118 21.9565 29.2347C21.3936 30.6089 20.524 31.4685 20.0363 31.8864C20.0761 32.4898 20.0533 33.2955 19.8034 34.196C19.1964 36.3854 17.6611 37.6475 17.0442 38.1016C16.5152 37.6126 15.4223 36.4695 14.8686 34.6329C14.4111 33.1161 14.5296 31.8175 14.644 31.123C14.5185 30.8729 13.2781 28.3049 14.615 26.0085C15.1478 25.0938 15.8902 24.5642 16.3724 24.2855C16.2675 23.8939 15.356 20.2684 17.5834 17.7955L17.5839 17.7949C17.9264 17.4149 18.8908 16.3449 20.5283 16.1001C22.4359 15.8154 23.439 16.6503 24.0298 17.2152C24.1677 17.347 24.2913 17.4897 24.4015 17.6418C24.8612 16.8955 25.5488 16.1787 26.5697 15.8187C28.8293 15.0217 31.2834 16.4786 32.4304 18.3025C33.6287 20.2081 33.5375 22.7332 32.202 24.716C32.5596 25.1933 33.6177 26.7307 33.5822 28.9384C33.5529 30.7717 32.7855 32.0833 32.4368 32.6086C32.7915 33.696 32.8504 34.6319 32.8044 35.3672C32.463 40.8265 25.8026 43.7967 25.3301 44C24.6592 43.0112 23.7861 41.4634 23.279 39.4077C22.5254 36.3527 22.9756 33.784 23.309 32.4567C23.0299 31.91 22.7751 31.2431 22.6406 30.4646C22.0912 27.2844 23.9787 24.71 24.4997 24.0436C24.4238 23.9308 24.3061 23.7483 24.1771 23.5056C23.9522 23.8791 23.6928 24.2171 23.4053 24.5028C23.0423 24.9422 22.637 25.1973 22.3628 25.3384Z" fill="#F5FFF9"/>
    </svg>}
    color="purple"
    overlineText="BUILDING TRUST"
    leftContent={
      <>
        <ArticleHeading text={<span>Introducing our Past <br /> Achievement - <a className={styles.soyLink} href="#">Soy.Finance</a></span>} />
        <ul className={styles.list}>
          <li className={styles.option}>
            <Text tag="h4" variant={24} weight={600}>Proven Enterprise Experience</Text>
            <Text color="secondary" variant={20}>Our team&apos;s credibility shines through our collaboration with <a className={styles.soyLink} href="#">Callisto Enterprise</a>,
              where we developed a cutting-edge exchange that met their specific needs and standards.</Text>
          </li>
          <li className={styles.option}>
            <Text tag="h4" variant={24} weight={600}>Unblemished Security Record</Text>
            <Text color="secondary" variant={20}>Trust is paramount in the crypto world, and we&apos;re proud to share that our exchange has
              remained unhacked for three years, underlining our relentless commitment to security.</Text>
          </li>
          <li className={styles.option}>
            <Text tag="h4" variant={24} weight={600}>Next-Level Efficiency with ERC-223</Text>
            <Text color="secondary" variant={20}>Not only does ERC-223  offer the same reliability as ERC-20, but they also burn 40K
              less gas, translating to cost savings and a greener footprint. Here are ERC-20 transactions and here are ERC-223.</Text>
          </li>
        </ul>
      </>
    }
    rightContent={<div className={styles.rightContent}>
      <img className={styles.img1} src="/images/soy-screen-1.png" alt=""/>
      <img className={styles.img2} src="/images/soy-screen-2.png" alt=""/>
      <img className={styles.img3} src="/images/soy-screen-3.png" alt=""/>
      <img className={styles.img4} src="/images/soy-screen-4.png" alt=""/>
    </div>}
  />;
}
