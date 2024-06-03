import React from "react"

import { ICardGains } from "./CardGains.interface"
import styles from "./CardGains.module.scss"

export const CardGains: React.FC<ICardGains> = ({
  headerIcon,
  footerIcon,
  footerText,
  headerTitle,
  headerSubtitle,
  footerTitle,
}) => {
  return (
    <>
      <div className={styles["trading-card"]}>
        <div className={styles["header-wrapper"]}>
          {headerIcon && <i className={`pi ${headerIcon} ${styles["custom-header-icon"]}`}></i>}
          <div className={styles["header-text"]}>
            <div className={styles["header-title"]}>{headerTitle}</div>
            <div className={styles["header-subtitle"]}>{headerSubtitle}</div>
          </div>
        </div>

        <hr className={styles["sidebar-divider"]} />
        <div className={styles["footer-wrapper"]}>
          <div
            className={`${styles["footer-value"]} ${parseFloat(String(footerText)) >= 0 && headerTitle !== "MDD" ? styles["positive"] : styles["negative"]}`}
          >
            {footerIcon && <i className={`pi ${footerIcon} ${styles["custom-footer-icon"]}`}></i>}
            <div className={styles["footer-text"]}>
              {headerTitle !== "MDD" ? footerText + "%" : footerText}
            </div>
          </div>
          <div className={styles["footer-title"]}>{footerTitle}</div>
        </div>
      </div>
    </>
  )
}
