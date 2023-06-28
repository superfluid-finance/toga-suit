import { SafeConnector } from "@wagmi/connectors/safe";

const gnosisSafe = ({ chains }) => {
  return {
    id: "gnosis-safe",
    name: "Gnosis Safe",
    shortName: "Gnosis Safe",
    iconUrl: "/icons/ecosystem/gnosis_safe_2019_logo_rgb_sponsor_darkblue.svg",
    iconBackground: "#008168",
    createConnector: () => ({
      connector: new SafeConnector({
        chains,
        options: {
          allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
          debug: false,
        },
      }),
    }),
  };
};

export default gnosisSafe;
