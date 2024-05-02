"use client";

import { FC, PropsWithChildren } from "react";

const ContentWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      id="main-content"
      className="h-full min-h-[100vh-68px] w-full overflow-y-auto bg-slate-50 dark:bg-slate-900"
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
