import { FC, PropsWithChildren } from "react";
import AppNavbar from "./navbar";
import ContentWrapper from "./wrapper";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppNavbar />
      <div className="flex h-screen items-start pt-16 text-slate-900 dark:text-white">
        <ContentWrapper>{children}</ContentWrapper>
      </div>
    </>
  );
};

export default AppLayout;
