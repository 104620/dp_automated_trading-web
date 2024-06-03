import React from "react"
import { useNavigate } from "react-router-dom"

import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primeicons/primeicons.css"
import { Button } from "primereact/button"

import { SignUpModal, useAppDispatch, setSignUpModal } from "app"

import styles from "./Landing.module.scss"

import { Container, Row, Col } from "react-grid-system"

const appInfo = {
  headline: "Welcome..",
  description: " to trading analytics!",
  firstSection: "Analytics",
  secondSection: "...",
}

const LandingView: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // TODO: use this as signing option --- Modals
  function dispatchSignUpModal(): void {
    dispatch(setSignUpModal(true))
  }

  return (
    <>
      <SignUpModal />

      <div className={styles["main-container"]}>
        <div className={styles["container-image"]}></div>
        <div className={styles["background-container"]}>
          <div className={styles["landing-panel-container"]}>
            <div className={styles["title-container"]}>
              <Container fluid className={styles["sidebar"]}>
                <Row className={styles.wrapper}>
                  <Col xs={12} className={styles["sidebar"]}>
                    <h1>{appInfo.headline}</h1>
                    <h3>{appInfo.description}</h3>
                  </Col>
                </Row>
              </Container>
            </div>
            <div className={styles["log-sign-container"]}>
              <Button
                onClick={() => navigate("/app/trading-bot-1/bull")}
                label={appInfo.firstSection}
                icon='pi pi-chart-line'
                text
                raised
              ></Button>
              <Button
                onClick={() => dispatchSignUpModal()}
                label={appInfo.secondSection}
                // icon='pi pi-user-edit'
                text
                raised
                disabled
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingView
