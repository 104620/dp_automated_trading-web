import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter, useRoutes } from "react-router-dom"
import { Routess, store, Toast } from "app"
import "index.css"
import "@atlaskit/css-reset"
import "react-credit-cards-2/dist/es/styles-compiled.css"

const App: React.FC = () => {
  const routing = useRoutes(Routess())
  return <>{routing}</>
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById("root")!)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL + "/"}>
        <Toast />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
