/* eslint-disable no-octal */
import React from "react"
import ReactApexChart from "react-apexcharts"
import { ApexOptions } from "apexcharts"
import moment from "moment"

import "./TimelineChart.module.scss"
import { ITimelineChart } from "./TimelineChart.interface"

export const TimelineChart: React.FC<ITimelineChart> = ({ height, series }) => {
  const options: ApexOptions = {
    chart: {
      height: height,
      type: "rangeBar",
    },
    title: {
      text: "Longest positions duration",
      align: "left",
      margin: 40,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#172B4D",
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "30%",
        distributed: true,
        borderRadius: 6,
        dataLabels: {
          hideOverflowingLabels: false,
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: any, opts) {
        const label = opts.w.globals.labels[opts.dataPointIndex]
        const a = moment(val[0])
        const b = moment(val[1])
        const diff = b.diff(a, "days")
        return label + ": " + diff + (diff > 1 ? " days" : " day")
      },
      style: {
        colors: ["#000", "#000"],
        fontSize: "14px",
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      show: false,
    },
    grid: {
      row: {
        colors: ["#f3f4f5", "#fff"],
        opacity: 1,
      },
    },
  }

  return (
    <>
      <div>
        <ReactApexChart options={options} series={series} type={"rangeBar"} height={height} />
      </div>
    </>
  )
}
