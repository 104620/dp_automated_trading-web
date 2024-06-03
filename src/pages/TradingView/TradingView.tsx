import React, { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Container, Row, Col } from "react-grid-system"
import { Chart, ArcElement } from "chart.js"
Chart.register(ArcElement)
import { Box, Button, Tab, CircularProgress, circularProgressClasses } from "@mui/material"
import { TabContext, TabList } from "@mui/lab"
import {
  CardGains,
  CandlestickChart,
  LineChart,
  PieChart,
  http,
  displayToast,
  TradingViewHeadline,
  TimelineChart,
} from "app"

import FeiLogo from "app/assets/icons/fei_800-removebg-preview.svg"
import styles from "./TradingView.module.scss"
import { IEndpointMappings, IMaxDrawdown, IMaxGain, IMaxLoss } from "./TradingView.interface"

const sidebarTitle = {
  first: "Trading",
  second: "analytics",
}

const endpointMappings: IEndpointMappings = {
  "/trading-bot-1": {
    base: "/tb1/btcusd_buy_tb1",
    mappings: {
      bull: "_asc_trades",
      bear: "_dsc_trades",
      stg: "_stg_trades",
      cross: "_com_trades",
    },
  },
  "/trading-bot-2": {
    base: "/tb2/btcusd_trends_tb2",
    mappings: {
      bull: "_asc_trades",
      bear: "_dsc_trades",
      stg: "_stg_trades",
      cross: "_com_trades",
    },
  },
  "/trading-bot-3": {
    base: "/tb3/btcusd_emarsi_tb3",
    mappings: {
      bull: "_asc_trades",
      bear: "_dsc_trades",
      stg: "_stg_trades",
      cross: "_com_trades",
    },
  },
  "/trading-bot-4": {
    base: "/tb4/btcusd_emarsiobv_tb4",
    mappings: {
      bull: "_asc_trades",
      bear: "_dsc_trades",
      stg: "_stg_trades",
      cross: "_com_trades",
    },
  },
}

const TradingView: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState<boolean>(true)
  const [activePage, setActivePage] = useState<"bull" | "bear" | "stg" | "cross">("bull")
  const [balance, setBalance] = useState<string>("0")
  const [profit, setProfit] = useState<string | undefined>(undefined)
  const [initialBalance, setInitialBalance] = useState<string | undefined>(undefined)
  const [maximumGain, setMaximumGain] = useState<IMaxGain>({
    maxGain: "0",
    maxGainPercentage: "0",
  })
  const [maximumLoss, setMaximumLoss] = useState<IMaxLoss>({
    maxLoss: "0",
    maxLossPercentage: "0",
  })
  const [pieTypes, setPieTypes] = useState({
    series: [],
    labels: [],
  })
  const [lineChartData, setLineChartData] = useState([
    {
      name: "",
      data: [],
    },
  ])
  const [timelineChartData, setTimelineChartData] = useState([
    {
      data: [],
    },
  ])
  const [mdd, setMdd] = useState<IMaxDrawdown>({
    maxDrawdown: "0",
    maxMonetaryLoss: "0",
  })
  const [endpoint, setEndpoint] = useState<string>("/tb1/btcusd_buy_tb1_asc_trades")
  const lastFetchedEndpoint = useRef<string>("")

  const handleMarketBotNavigation = (tab: "bull" | "bear" | "stg" | "cross"): void => {
    const baseUrl = location.pathname.slice(0, location.pathname.lastIndexOf("/"))
    setLoading(true)
    setActivePage(tab)
    navigate(baseUrl + "/" + tab)
  }

  const hanglePageNavigation = (page: string): void => {
    setActivePage("bull")
    if ("/app" + page !== location.pathname) {
      setLoading(true)
      navigate("/app" + page)
    }
  }

  useEffect(() => {
    let baseEndpoint
    const key = location.pathname.match(/\/trading-bot-\d/)?.[0]
    if (key && endpointMappings[key]) {
      baseEndpoint = endpointMappings[key].base
      const endpointSuffix = endpointMappings[key].mappings[activePage]
      setEndpoint(`${baseEndpoint}${endpointSuffix}`)
    }
  }, [location.pathname, activePage])

  useEffect(() => {
    if (endpoint && endpoint !== lastFetchedEndpoint.current) {
      http
        .get(`${endpoint}/last-balance`)
        .then((response) => {
          setBalance(response.data.balance)
        })
        .catch((error) => {
          displayToast("error", "Fetch Error", "Failed to get final balance.")
          console.error("Error:", error)
        })
      http
        .get(`${endpoint}/profit`)
        .then((response) => {
          setProfit(response.data.profit)
        })
        .catch((error) => {
          displayToast("error", "Fetch Error", "Failed to get profit.")
          console.error("Error:", error)
        })
      http
        .get(`${endpoint}/unique-trades`)
        .then((response) => {
          const series = response.data.map((item: any) => item.count)
          const labels = response.data.map((item: any) => item.trade)
          setPieTypes({ series, labels })
        })
        .catch((error) => {
          displayToast("error", "Fetch Error", "Failed to get unique trades.")
          console.error("Error:", error)
        })
      http
        .get(`${endpoint}/maximum-gain`)
        .then((response) => {
          setMaximumGain(response.data)
        })
        .catch((error) => {
          displayToast("error", "Fetch Error", "Failed to get maximum gain.")
          console.error("Error:", error)
        })
      http
        .get(`${endpoint}/maximum-loss`)
        .then((response) => {
          setMaximumLoss(response.data)
          setLoading(false)
        })
        .catch((error) => {
          displayToast("error", "Fetch Error", "Failed to maximum loss.")
          console.error("Error:", error)
        })
      http
        .get(`${endpoint}/mdd`)
        .then((response) => {
          setMdd(response.data)
          setLoading(false)
        })
        .catch((error) => {
          displayToast("error", "Fetch Error", "Failed to MDD.")
          console.error("Error:", error)
        })
      http
        .get(`${endpoint}`)
        .then((response: any) => {
          const chartData = response.data.map((trade: any) => ({
            x: new Date(trade.date),
            y: trade.balance,
          }))
          setLineChartData([{ name: "Balance", data: chartData }])
        })
        .catch((error) => {
          displayToast("error", "Fetch Error", "Failed to get final balance values.")
          console.error("Error:", error)
        })
      http
        .get("/data/initial_balance")
        .then((response: any) => {
          setInitialBalance(response.data.initial_balance)
        })
        .catch((error) => {
          displayToast("error", "Fetch Error", "Failed to get initial balance.")
          console.error("Error:", error)
        })
      http
        .get(`${endpoint}/longest-trade`)
        .then((response: any) => {
          const chartData = response.data.map((trade: any) => ({
            x: trade.tradeType,
            y: [new Date(trade.start).getTime(), new Date(trade.end).getTime()],
          }))

          setTimelineChartData([{ data: chartData }])
          setLoading(false)
        })
        .catch((error) => {
          displayToast("error", "Fetch Error", "Failed to get longest trades.")
          console.error("Error:", error)
        })
      lastFetchedEndpoint.current = endpoint
    }
  }, [endpoint])

  return (
    <>
      <div className={styles["main-container"]}>
        <Container fluid>
          {loading && (
            <Box className={styles["progress-page"]} sx={{ display: "flex" }}>
              <CircularProgress
                variant='indeterminate'
                disableShrink
                size={70}
                thickness={5}
                sx={{
                  color: "rgb(85, 111, 124);",
                  animationDuration: "550ms",
                  [`& .${circularProgressClasses.circle}`]: {
                    strokeLinecap: "round",
                  },
                }}
              />
            </Box>
          )}
          <Row className={styles.wrapper}>
            <aside className={styles["sidebar-aside-wrapper"]}>
              <Col xs={12} md={3} className={styles["sidebar"]}>
                <div className={styles["sidebar-header"]}>
                  <div className={styles["logo-wrapper"]}>
                    <img src={FeiLogo} alt='fei-logo' />
                  </div>
                  <div onClick={() => navigate("/")} className={styles["sidebar-title-wrapper"]}>
                    <div className={styles["sidebar-title-button"]}>
                      <i className={`pi pi-home ${styles["home-icon"]}`}></i>
                      <h2 className={styles["brand-name"]}>{sidebarTitle.first}</h2>
                      <h2 className={styles["brand-name"]}>{sidebarTitle.second}</h2>
                    </div>
                  </div>
                  <hr className={styles["sidebar-divider"]} />
                </div>
                <div className={styles["sidebar-items-wrapper"]}>
                  <div
                    className={[
                      styles["sidebar-item"],
                      location.pathname.includes("documentation") ? styles.selected : "",
                    ].join(" ")}
                  >
                    <Button onClick={() => navigate("/app" + "/documentation")}>
                      Documentation
                    </Button>
                  </div>
                  <div
                    className={[
                      styles["sidebar-item"],
                      location.pathname.includes("trading-bot-1") ? styles.selected : "",
                    ].join(" ")}
                  >
                    <Button onClick={() => hanglePageNavigation("/trading-bot-1/bull")}>
                      Trading Bot 1
                    </Button>
                  </div>
                  <div
                    className={[
                      styles["sidebar-item"],
                      location.pathname.includes("trading-bot-2") ? styles.selected : "",
                    ].join(" ")}
                  >
                    <Button onClick={() => hanglePageNavigation("/trading-bot-2/bull")}>
                      Trading Bot 2
                    </Button>
                  </div>
                  <div
                    className={[
                      styles["sidebar-item"],
                      location.pathname.includes("trading-bot-3") ? styles.selected : "",
                    ].join(" ")}
                  >
                    <Button onClick={() => hanglePageNavigation("/trading-bot-3/bull")}>
                      Trading Bot 3
                    </Button>
                  </div>
                  <div
                    className={[
                      styles["sidebar-item"],
                      location.pathname.includes("trading-bot-4") ? styles.selected : "",
                    ].join(" ")}
                  >
                    <Button onClick={() => hanglePageNavigation("/trading-bot-4/bull")}>
                      Trading Bot 4
                    </Button>
                  </div>
                </div>
              </Col>
            </aside>

            <Col className={styles["wrapper-content"]} xs={12} md={9}>
              <div className={styles["content-header"]}>
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={activePage}>
                    <TradingViewHeadline activePage={activePage} />
                    <Box
                      className={styles["dashboard-buttons"]}
                      sx={{ borderBottom: 1, borderColor: "divider" }}
                    >
                      <TabList
                        onChange={(e, value) => handleMarketBotNavigation(value)}
                        aria-label='lab API tabs example'
                      >
                        <Tab value='bull' label='Bull Market' />
                        <Tab value='bear' label='Bear Market' />
                        <Tab value='stg' label='Stagnation' />
                        <Tab value='cross' label='Range-Bound' />
                      </TabList>
                    </Box>
                  </TabContext>
                </Box>
              </div>
              <Row>
                <Col xs={12} md={6} lg={3}>
                  <div className={styles.card}>
                    <CardGains
                      headerTitle={"Final Balance"}
                      headerSubtitle={balance}
                      headerIcon={"pi-wallet"}
                      footerIcon={
                        profit && parseFloat(profit) >= 0
                          ? "pi-arrow-circle-up"
                          : "pi-arrow-circle-down"
                      }
                      footerText={profit ? profit : ""}
                      footerTitle={"Profit to Initial Balance"}
                    />
                  </div>
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <div className={styles.card}>
                    <CardGains
                      headerTitle={"Maximum Gain"}
                      headerSubtitle={maximumGain.maxGain}
                      headerIcon={"pi-arrow-up-right"}
                      footerIcon={
                        parseFloat(maximumGain.maxGainPercentage) >= 0
                          ? "pi-arrow-circle-up"
                          : "pi-arrow-circle-down"
                      }
                      footerText={maximumGain.maxGainPercentage}
                      footerTitle={"Return on Investment"}
                    />
                  </div>
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <div className={styles.card}>
                    <CardGains
                      headerTitle={"Maximum Loss"}
                      headerSubtitle={maximumLoss.maxLoss}
                      headerIcon={"pi-arrow-down-right"}
                      footerIcon={
                        parseFloat(maximumLoss.maxLossPercentage) >= 0
                          ? "pi-arrow-circle-up"
                          : "pi-arrow-circle-down"
                      }
                      footerText={maximumLoss.maxLossPercentage}
                      footerTitle={"Return on Investment"}
                    />
                  </div>
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <div className={styles.card}>
                    <CardGains
                      headerTitle={"MDD"}
                      headerSubtitle={mdd.maxDrawdown}
                      headerIcon={"pi-percentage"}
                      footerIcon={
                        mdd.maxMonetaryLoss && parseFloat(mdd.maxMonetaryLoss) >= 0
                          ? "pi-arrow-circle-down"
                          : "pi-arrow-circle-up"
                      }
                      footerText={mdd.maxMonetaryLoss}
                      footerTitle={"Monetary Loss"}
                    />
                  </div>
                </Col>
              </Row>
              <Row className={styles["first-row-charts"]}>
                <Col xs={12}>
                  <div className={styles["chart-wrapper"]}>
                    <CandlestickChart height={450} activePage={activePage} />
                  </div>
                </Col>
                <Col xs={12}>
                  <div className={styles["chart-wrapper"]}>
                    <TimelineChart height={450} series={timelineChartData} />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6} lg={4}>
                  <div className={`${styles["chart-wrapper"]} ${styles["custom-pie-chart"]}`}>
                    <PieChart height={260} series={pieTypes.series} labels={pieTypes.labels} />
                  </div>
                </Col>
                <Col xs={12} md={6} lg={8}>
                  <div className={styles["chart-wrapper"]}>
                    <LineChart
                      height={260}
                      series={lineChartData}
                      initialBalance={initialBalance}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default TradingView
