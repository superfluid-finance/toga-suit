import { InjectedConnector } from "wagmi/connectors/injected";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";

export const namedInjectedWallet = ({
  chains,
  shimDisconnect,
}) => {
  const injectedConnector = new InjectedConnector({
    chains,
    options: { shimDisconnect },
  });
  const defaultInjectedWallet = injectedWallet({ chains });

  return {
    id: defaultInjectedWallet.id,
    name: injectedConnector.name,
    iconUrl: defaultInjectedWallet.iconUrl,
    iconBackground: defaultInjectedWallet.iconBackground,
    hidden: ({ wallets }) =>
      wallets.some(
        ({ installed, connector }) =>
          installed &&
          (connector instanceof InjectedConnector ||
            connector.name.toLowerCase() ===
              injectedConnector.name.toLowerCase())
      ),
    createConnector: () => ({
      connector: injectedConnector,
    }),
  };
};
