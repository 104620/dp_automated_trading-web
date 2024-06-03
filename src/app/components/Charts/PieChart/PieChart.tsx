/* eslint-disable no-octal */
import React from "react"
import { Doughnut } from "react-chartjs-2"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)
import "./PieChart.module.scss"
import { ILineChart } from "./PieChart.interface"

export const PieChart: React.FC<ILineChart> = ({ height, series, labels }) => {
  const chartData = {
    // TODO: when having more trade options needed to add more colors otherwise they will cycle same.
    labels: labels,
    datasets: [
      {
        label: "Line Chart",
        data: series,
        backgroundColor: ["#00b746", "#ef403c", "#775dd0", "#feb019", "#008ffb"],
        borderColor: ["rgba(0, 0, 0, 0.1"],
      },
    ],
  }
  const options = {
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: "#fff",
        formatter: (value: any, ctx: any) => {
          let sum = 0
          const dataArr = ctx.chart.data.datasets[0].data
          dataArr.map((data: any) => {
            sum += data
          })
          const percentage = ((value * 100) / sum).toFixed(2) + "%"
          return percentage
        },
        anchor: "end",
        align: "start",
        offset: 10,
      },
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          boxWidth: 10,
        },
      },
    },
  }

  return (
    <>
      <div>
        <Doughnut data={chartData} width={350} height={height} options={options} />
      </div>
    </>
  )
}
