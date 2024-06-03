/* eslint-disable no-octal */
import React, { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { ApexOptions } from "apexcharts"
import numeral from "numeral"
import Switch from "@mui/material/Switch"
import FormControlLabel from "@mui/material/FormControlLabel"

import styles from "./LineChart.module.scss"
import { ILineChart } from "./LineChart.interface"
import { useLocation } from "react-router-dom"

export const LineChart: React.FC<ILineChart> = ({ height, series, initialBalance }) => {
  const location = useLocation()
  const [markersEnabled, setMarkersEnabled] = useState<boolean>(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMarkersEnabled(event.target.checked)
  }

  const updatedSeries =
    series && series.length > 0
      ? [
          ...series,
          {
            name: "Initial Balance",
            data: [
              { x: series[0]?.data[0]?.x || new Date(), y: initialBalance },
              {
                x: series[0]?.data[series[0]?.data.length - 1]?.x || new Date(),
                y: initialBalance,
              },
            ],
          },
        ]
      : []

  const chartOptions: ApexOptions = {
    chart: {
      type: "line",
      height: 250,
    },
    stroke: {
      fill: {
        type: "solid",
        colors: ["#e3faef"],
      },
      curve: "smooth",
      dashArray: [0, 8],
    },
    colors: ["#00b746", "#feb219", "#ef403c", "#F9A825"],
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
        text: "Price [$]",
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
    markers: {
      size: markersEnabled ? 4 : 0,
      colors: "#feb219",
      strokeColors: "black",
      strokeWidth: 2,
      strokeOpacity: 0.6,
      shape: "circle",
      hover: {
        size: 5,
        sizeOffset: 3,
      },
    },
  }

  useEffect(() => {
    setMarkersEnabled(true)
  }, [location.pathname])

  return (
    <>
      <div>
        <FormControlLabel
          className={styles["show-hide-markers"]}
          control={
            <>
              {" "}
              <div className={styles["show-hide-markers-title"]}>Trades</div>{" "}
              <Switch checked={markersEnabled} onChange={handleChange} />
            </>
          }
          label={""}
        />
        <ReactApexChart
          options={chartOptions}
          series={updatedSeries}
          type={"line"}
          height={height}
        />
      </div>
    </>
  )
}
