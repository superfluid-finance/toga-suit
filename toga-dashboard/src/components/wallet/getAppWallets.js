import {
    connectorsForWallets,
  } from "@rainbow-me/rainbowkit";
  import {
    metaMaskWallet,
    braveWallet,
    walletConnectWallet,
    coinbaseWallet,
    rainbowWallet,
  } from "@rainbow-me/rainbowkit/wallets";
  import gnosisSafe from "./gnosisSafeWalletConnector/gnosisSafe";
  import mockConnector from "./mockConnector/mockConnector";
  import { namedInjectedWallet } from "./namedInjectedWallet/namedInjectedWallet";
import bitkeep from "./bitkeep/bitkeep";
  
  // Inspired by: https://github.com/rainbow-me/rainbowkit/blob/main/packages/rainbowkit/src/wallets/getDefaultWallets.ts
  export const getAppWallets = ({
    appName,
    chains,
    projectId,
  }) => {
    const needsMock =
      typeof window !== "undefined" &&
      typeof (window).mockSigner !== "undefined";
  
    const wallets = [
      {
        groupName: "Popular",
        wallets: [
          namedInjectedWallet({ chains, shimDisconnect: true }),
          gnosisSafe({ chains, projectId}),
          braveWallet({ chains, shimDisconnect: true }),
          metaMaskWallet({
            chains,
            shimDisconnect: true,
            projectId: projectId
          }),
          walletConnectWallet({ chains, projectId, showQrModal: true }),
          coinbaseWallet({ appName, chains }),
          bitkeep({ chains, shimDisconnect: true }),
          rainbowWallet( { chains, projectId }),
          ...(needsMock ? [mockConnector({ chains })] : []),
        ],
      },
    ];
  
    return {
      connectors: connectorsForWallets(wallets),
      wallets,
    };
  };
  