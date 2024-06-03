import React from "react"
import { useNavigate } from "react-router-dom"
import { Container } from "react-grid-system"
import styles from "./DocumentationView.module.scss"
import { Button } from "primereact/button"

const DocumentationView: React.FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className={styles["main-container"]}>
        <Container className={styles["main-context-container"]} fluid>
          <div className={styles["back-button-container"]}>
            <Button
              onClick={() => navigate("/app/trading-bot-1/bull")}
              label='Back'
              icon='pi pi-arrow-left'
              severity='secondary'
              text
              color='rgb(85, 111, 124)'
            />
          </div>
          <div className={styles["data-section"]}>
            <h2>Data file structure</h2>
            <p>
              <h5>
                To ensure compatibility and accurate representation of charts, data files must
                observe to the following CSV format:
              </h5>
              <ul>
                <li>Data rows with corresponding values in the same order as the header row.</li>
                <li>Date format: MM-DD-YY.</li>
                <li>Time format: HH:MM (24-hour clock).</li>
                <li>
                  Numeric fields: open, high, low, close, volume, initial_balance, profit should be
                  in decimal format.
                </li>
                <li>
                  `initial_balance` is the starting point of balance set before trading process.
                </li>
                <li>
                  `profit` is the value representing expected profit of a trade that is also set
                  before trading.
                </li>
              </ul>
              <div className={styles["file-structure-example"]}>
                <h4>Example:</h4>
                <p className={styles["file-structure"]}>
                  date/\time/\open/\high/\low/\close/\volume/\initial_balance/\profit
                </p>
                <p>01-10-20/\00:00/\10795.25/\10933.62/\10472.36/\10619.45/\40023134100/\100/\2</p>
              </div>
            </p>
          </div>
          <div className={styles["trade-section"]}>
            <h2>Trades file structure</h2>
            <p>
              <h5>
                To ensure compatibility and accurate representation of charts, trade files must
                observe to the following CSV format:
              </h5>
              <ul>
                <li>unix: Unix timestamp (integer)</li>
                <li>date: Date and time combined in MM-DD-YY HH:MM format (string)</li>
                <li>trade: Trade action, such as BUY or SELL (string)</li>
                <li>price: Execution price (decimal)</li>
                <li>
                  open, high, low, close: Price values at open, high, low, and close (decimal)
                </li>
                <li>position_size: Size of the position (decimal)</li>
                <li>balance: Account balance after the trade (integer)</li>
              </ul>
              <div className={styles["file-structure-example"]}>
                <h4>Example:</h4>
                <p className={styles["file-structure"]}>
                  unix/\date/\trade/\price/\open/\high/\low/\close/\position_size/\balance
                </p>
                <p>
                  1601503200/\01-10-20/\00:00/\BUY/\10795.25/\10795.25/\10933.62/\10472.36/\10619.45/\0.0091707/\99
                </p>
              </div>
            </p>
          </div>
        </Container>
      </div>
    </>
  )
}

export default DocumentationView
