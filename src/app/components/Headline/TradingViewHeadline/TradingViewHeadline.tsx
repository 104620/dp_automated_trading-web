/* eslint-disable no-octal */
import React, { useEffect, useState } from "react"

import styles from "./TradingViewHeadline.module.scss"
import { IHeadlineType, ITradingViewHeadline } from "./TradingViewHeadline.interface"
import { displayToast } from "app"
import { http } from "app/http"

export const TradingViewHeadline: React.FC<ITradingViewHeadline> = ({ activePage }) => {
  const [pageCandlestickData, setPageCandletickData] = useState<string>("btcusd_tb1_asc_datas")
  const [datesetDateRange, setDatesetDateRange] = useState<IHeadlineType>({
    from: "",
    to: "",
  })

  useEffect(() => {
    switch (activePage) {
      case "bull":
        setPageCandletickData("btcusd_tb1_asc_datas")
        break
      case "bear":
        setPageCandletickData("btcusd_tb1_dsc_datas")
        break
      case "stg":
        setPageCandletickData("btcusd_tb1_stg_datas")
        break
      case "cross":
        setPageCandletickData("btcusd_tb1_com_datas")
    }
  }, [activePage])

  useEffect(() => {
    http
      .get(`/data/${pageCandlestickData}/period`)
      .then((response) => {
        setDatesetDateRange(response.data)
      })
      .catch((error) => {
        displayToast("error", "Fetch Error", "Failed to get dataset date range.")
        console.error("Error:", error)
      })
  }, [pageCandlestickData])

  return (
    <>
      <h1 className={styles["main-title"]}>
        Trading Over Different Periods
        <h2 className={styles["main-title-date"]}>
          {datesetDateRange.from} to {datesetDateRange.to}
        </h2>
      </h1>
    </>
  )
}
