declare global {
  interface Window {
    env: any
  }
}

interface EnvType {
  REACT_APP_BFF_API: string
}

export const env: EnvType = { ...process.env, ...window.env }
