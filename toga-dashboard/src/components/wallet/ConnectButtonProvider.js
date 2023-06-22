import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  createContext,
  useContext,
} from "react";

const ConnectButtonContext = createContext(null);

const ConnectButtonProvider = ({ children }) => {
  return (
    <ConnectButton.Custom>
      {(connectButtonContext) => (
        <ConnectButtonContext.Provider
          value={{
            ...connectButtonContext,
          }}
        >
          {children}
        </ConnectButtonContext.Provider>
      )}
    </ConnectButton.Custom>
  );
};

export const useConnectButton = () => useContext(ConnectButtonContext);

export default ConnectButtonProvider;
