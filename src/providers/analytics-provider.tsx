import { createContext, useContext, useEffect } from "react"
import ReactGA from "react-ga4"

interface AnalyticsContextProps {
  trackEvent: (
    action: string,
    category: string,
    label: string,
    value?: number
  ) => void
}

const AnalyticsContext = createContext<AnalyticsContextProps>(null!)

export function useAnalyticsContext() {
  return useContext(AnalyticsContext) || {}
}

interface AnalyticsProviderProps extends React.PropsWithChildren {}

export default function AnalyticsProvider({
  children,
}: AnalyticsProviderProps) {
  useEffect(() => {
    ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID || "")
    ReactGA.send({ hitType: "pageview", page: "/", title: "Home" })
  }, [])

  function trackEvent(
    action: string,
    category: string,
    label: string,
    value?: number
  ) {
    ReactGA.event({ action, category, label, value })
  }

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  )
}
