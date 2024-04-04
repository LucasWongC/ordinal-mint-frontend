"use client";

import { DarkThemeToggle, Navbar } from "flowbite-react";
import dynamic from "next/dynamic";
import type { FC } from "react";

const ConnectButton = dynamic(() => import("./ConnectButton"), {
  ssr: false,
});

const AppNavbar: FC<Record<string, never>> = function () {
  return (
    <header>
      <Navbar
        fluid
        className="fixed top-0 z-30 h-16 w-full border-b border-slate-200 bg-white p-0 dark:border-slate-700 dark:bg-slate-800 sm:p-0"
      >
        <div className="w-full p-3 pr-4">
          <div className="flex h-full items-center justify-between">
            <div className="flex items-center">
              <Navbar.Brand href="/">
                <span className="self-center whitespace-nowrap px-3 text-xl font-semibold dark:text-white">
                  PixelMap
                </span>
              </Navbar.Brand>
            </div>
            <div className="flex justify-items-center gap-2">
              <ConnectButton />
              <DarkThemeToggle />
            </div>
          </div>
        </div>
      </Navbar>
    </header>
  );
};

export default AppNavbar;
