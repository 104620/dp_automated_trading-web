import React from "react"

import { RouteObject } from "react-router-dom"
import { TradingView, LandingView, DocumentationView } from "pages"

export const Routess = (): RouteObject[] => [
  {
    path: "/",
    element: <LandingView />,
  },
  {
    path: "/app",
    children: [
      {
        path: "documentation",
        element: <DocumentationView />,
      },
      {
        path: "trading-bot-1",
        children: [
          {
            path: "bull",
            element: <TradingView />,
          },
          {
            path: "bear",
            element: <TradingView />,
          },
          {
            path: "stg",
            element: <TradingView />,
          },
          {
            path: "cross",
            element: <TradingView />,
          },
        ],
      },
      {
        path: "trading-bot-2",
        children: [
          {
            path: "bull",
            element: <TradingView />,
          },
          {
            path: "bear",
            element: <TradingView />,
          },
          {
            path: "stg",
            element: <TradingView />,
          },
          {
            path: "cross",
            element: <TradingView />,
          },
        ],
      },
      {
        path: "trading-bot-3",
        children: [
          {
            path: "bull",
            element: <TradingView />,
          },
          {
            path: "bear",
            element: <TradingView />,
          },
          {
            path: "stg",
            element: <TradingView />,
          },
          {
            path: "cross",
            element: <TradingView />,
          },
        ],
      },
      {
        path: "trading-bot-4",
        children: [
          {
            path: "bull",
            element: <TradingView />,
          },
          {
            path: "bear",
            element: <TradingView />,
          },
          {
            path: "stg",
            element: <TradingView />,
          },
          {
            path: "cross",
            element: <TradingView />,
          },
        ],
      },
    ],
  },
  {
    path: "/register",
    element: <></>,
  },
]
