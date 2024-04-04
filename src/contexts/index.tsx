import { FC, PropsWithChildren } from "react";
import CurrentTimeContextProvider from "./CurrentTimeContext";
import WalletConnectProviders from "./WalletConnectProvider";

const ContextProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <WalletConnectProviders>
      <CurrentTimeContextProvider>{children}</CurrentTimeContextProvider>
    </WalletConnectProviders>
  );
};

export default ContextProviders;
