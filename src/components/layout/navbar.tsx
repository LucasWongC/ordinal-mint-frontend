"use client";

import { Navbar } from "flowbite-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { FC } from "react";

const ConnectButton = dynamic(() => import("./ConnectButton"), {
  ssr: false,
});

const AppNavbar: FC<Record<string, never>> = function () {
  return (
    <header>
      <Navbar
        fluid
        className="fixed top-0 z-30 h-[68px] w-full bg-black p-0 sm:p-0"
      >
        <div className="w-full px-[10vw]">
          <div className="flex h-full items-center justify-between">
            <div className="flex items-center gap-10">
              <Navbar.Brand href="/">
                <Image
                  width={68}
                  height={68}
                  src="/logo.png"
                  alt="logo"
                  className="mx-5"
                />
              </Navbar.Brand>
              <Navbar.Collapse>
                <Navbar.Link
                  href="/mint"
                  className="mx-3 text-sm font-semibold text-white underline"
                >
                  Mint
                </Navbar.Link>
                {/* <Navbar.Link
                  href="/whitelist"
                  className="mx-3 text-sm font-semibold text-white underline"
                >
                  Whitelist
                </Navbar.Link>
                <Navbar.Link
                  href="/contact"
                  className="mx-3 text-sm font-semibold text-white underline"
                >
                  Contact
                </Navbar.Link> */}
              </Navbar.Collapse>
            </div>
            <div className="flex justify-items-center gap-2">
              <ConnectButton />
              {/* <DarkThemeToggle /> */}
            </div>
          </div>
        </div>
      </Navbar>
    </header>
  );
};

export default AppNavbar;
