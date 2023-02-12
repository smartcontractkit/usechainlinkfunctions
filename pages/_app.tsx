import { AppProps } from 'next/app'
import { GoogleAnalytics } from "nextjs-google-analytics";

import '../styles/index.css'

const MyApp = ({ Component, pageProps }:AppProps) => {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;