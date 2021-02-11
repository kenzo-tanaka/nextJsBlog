import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import { AppProps } from "next/app";
import { useEffect } from "react";
import "../styles/global.css";
import "tailwindcss/tailwind.css";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  if (process.env.NODE_ENV === "production") {
    useEffect(() => {
      const handleRouteChange = (url: URL) => {
        gtag.pageView(url);
      };
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }, [router.events]);
  }

  return <Component {...pageProps} />;
};

export default App;
