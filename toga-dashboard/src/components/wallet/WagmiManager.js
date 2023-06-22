import {
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { createConfig as createWagmiConfig, WagmiConfig } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { getAppWallets } from "./getAppWallets";
import { configureChains } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { NETWORK_LIST, findNetworkOrThrow } from "../../constants/networks";
import { useContext } from "react";
import { NetworkContext } from "../context";
import AddressAvatar from "./AddressAvatar";

export const { chains: wagmiChains, publicClient: wagmiRpcProvider } =
  configureChains(NETWORK_LIST, [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: findNetworkOrThrow(NETWORK_LIST, chain.chainId).rpcUrls["superfluid"],
      }),
    }),
  ]);

const { connectors } = getAppWallets({
  appName: "Toga Dashboard",
  projectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID,
  chains: wagmiChains,
});

export const wagmiConfig = createWagmiConfig(
  {
  autoConnect: false, // Disable because of special Gnosis Safe handling in useAutoConnect.
  connectors,
  publicClient: wagmiRpcProvider,
});

const WagmiManager = ({ children }) => {
  
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
};

export default WagmiManager;

const Disclaimer = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you accept our{" "}
    <Link href="https://www.superfluid.finance/termsofuse/">Terms of Use</Link>
    {" and "}
    <Link href="https://www.iubenda.com/privacy-policy/34415583/legal">
      Privacy Policy
    </Link>
  </Text>
);

export const RainbowKitManager = ({ children }) => {
  const { selectedNetwork: network } = useContext(NetworkContext);

  const initialChainId =  network?.chainId || wagmiChains[0].chainId; // RainbowKit either uses the wallet's chain if it's supported by our app OR switches to the first support chain.

  return (
    <RainbowKitProvider 
      chains={wagmiChains}
      initialChain={initialChainId}
      avatar={AddressAvatar}
      appInfo={{ disclaimer: Disclaimer }}
      theme={
        lightTheme({
          borderRadius: "medium",
        })
      }
    >
      {children}
    </RainbowKitProvider>
  );
};
