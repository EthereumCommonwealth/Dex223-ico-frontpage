import React from "react";
import styles from "./Footer.module.scss";
import Text from "../../atoms/Text";

export default function Footer() {
  return <footer className={styles.footer}>
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
  </footer>;
}
