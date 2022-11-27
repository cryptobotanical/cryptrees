import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import merge from 'lodash.merge';
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import {
  OPENSEA_URL,
  NETWORK_NAME,
  CRYPTREES_ADDRESS,
  ALCHEMY_API_KEY,
  INFURA_API_KEY,
  POCKET_API_KEY,
  ETHERSCAN_API_KEY,
} from '../config';

import PageChange from "../components/PageChange/PageChange.js";

import '../styles/globals.css'
import "@rainbow-me/rainbowkit/styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: 'rgb(51 65 85)',
    connectButtonBackground: 'rgb(51 65 85)',
    downloadBottomCardBackground: 'rgb(51 65 85)',
    modalBackground: 'rgb(51 65 85)',

  },
});

const { chains, provider } = configureChains(
  [
    chain.goerli,
  ],
  [
    infuraProvider({ apiKey: INFURA_API_KEY }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://${chain.name}.infura.io/v3/${INFURA_API_KEY}`,
      }),
    }),
    alchemyProvider({ alchemyId: ALCHEMY_API_KEY }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://eth-${chain.name}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
      }),
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "CrypTrees NFT",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>CrypTrees Open Mint</title>
        </Head>
        <Layout>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider theme={myTheme} chains={chains}>
              <Component {...pageProps} />
            </RainbowKitProvider>
          </WagmiConfig>
        </Layout>
      </React.Fragment>
    );
  }
}
