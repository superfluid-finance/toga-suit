import { MockConnector } from "wagmi/connectors/mock";
import { NETWORK_LIST, findNetworkOrThrow } from "../../../constants/networks";
import { createWalletClient, custom } from "viem";

const mockConnector = ({ chains }) => ({
  id: "mock",
  name: "Mock",
  shortName: "Mock",
  iconUrl: "/icons/icon-96x96.png",
  iconBackground: "#000000",
  createConnector: () => {
    const mockBridge = (window).mockBridge;
    const mockWallet = (window).mockWallet;
    const chain = findNetworkOrThrow(NETWORK_LIST, mockWallet.chainId);

    return {
      connector: new MockConnector({
        chains,
        options: {
          walletClient: createWalletClient({
            chain,
            account: mockWallet.getAddress(),
            transport: custom(mockBridge),
          }),
        },
      }),
    };
  },
});

export default mockConnector;
