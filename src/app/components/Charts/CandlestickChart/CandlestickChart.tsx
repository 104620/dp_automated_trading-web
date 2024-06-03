/* eslint-disable no-octal */
import React, { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { ApexOptions } from "apexcharts"
import numeral from "numeral"

import "./CandlestickChart.module.scss"
import { ICandlestickChart } from "./CandlestickChart.interface"
import { displayToast } from "app"
import { http } from "app/http"

export const CandlestickChart: React.FC<ICandlestickChart> = ({ height, activePage }) => {
  const [series, setSeries] = useState([
    {
      data: [],
    },
  ])
  const [pageCandlestickData, setPageCandletickData] = useState<string>("btcusd_tb1_asc_datas")

  const chartOptions: ApexOptions = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    grid: {
      row: {
        colors: ["#f3f4f5", "#fff"],
        opacity: 1,
      },
    },
    xaxis: {
      title: {
        text: "Date",
        style: {
          fontSize: "1rem",
          fontWeight: "bold",
          color: "#172B4D",
        },
      },
      type: "datetime",
    },
    yaxis: {
      title: {
        text: "Price [USD]",
        style: {
          fontSize: "1rem",
          fontWeight: "bold",
          color: "#172B4D",
        },
      },
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: function (value) {
          return numeral(value).format("0.0a")
        },
      },
    },
  }

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
      .get(`/data/${pageCandlestickData}`)
      .then((response) => {
        const chartData = response.data.map((data: any) => ({
          x: new Date(data.date),
          y: [data.open, data.high, data.low, data.close],
        }))
        setSeries([{ data: chartData }])
      })
      .catch((error) => {
        displayToast("error", "Fetch Error", "Failed to get trades.")
        console.error("Error:", error)
      })
  }, [pageCandlestickData])

  return (
    <>
      <div>
        <ReactApexChart
          options={chartOptions}
          series={series}
          type={"candlestick"}
          height={height}
        />
      </div>
    </>
  )
}
