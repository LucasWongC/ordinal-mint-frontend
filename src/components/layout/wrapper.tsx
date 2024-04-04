"use client";

import { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

const ContentWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      id="main-content"
      className={twMerge(
        "h-full min-h-[100vh-64px] w-full overflow-y-auto bg-slate-50 dark:bg-slate-900 lg:ml-[4.5rem]",
      )}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
