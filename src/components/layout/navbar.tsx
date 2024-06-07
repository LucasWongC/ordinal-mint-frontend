"use client";

import { Navbar } from "flowbite-react";
import type { FC } from "react";

// const ConnectButton = dynamic(() => import("./ConnectButton"), {
//   ssr: false,
// });

const AppNavbar: FC<Record<string, never>> = function () {
  return (
    <header>
      <Navbar
        fluid
        className="fixed top-0 z-30 flex h-[68px] w-full items-center bg-black p-0 sm:p-0"
      >
        <div className="w-screen px-[10vw]">
          <div className="flex h-full items-center justify-end">
            <div className="flex items-center gap-10">
              {/* <Navbar.Brand href="/">
                <Image
                  width={68}
                  height={68}
                  src="/logo.png"
                  alt="logo"
                  className="mx-5"
                />
              </Navbar.Brand> */}
              <Navbar.Collapse>
                <Navbar.Link
                  href="/"
                  className="mx-3 text-sm font-semibold text-white underline"
                >
                  Home
                </Navbar.Link>
                <Navbar.Link
                  href="https://quantumexpeditions.com/about"
                  target="_blank"
                  className="mx-3 text-sm font-semibold text-white underline"
                >
                  About
                </Navbar.Link>
                <Navbar.Link
                  href="https://quantumexpeditions.com/contact"
                  target="_blank"
                  className="mx-3 text-sm font-semibold text-white underline"
                >
                  Contact
                </Navbar.Link>
                <Navbar.Link
                  href="https://wefunder.com/quantum.expeditions"
                  className="mx-3 text-sm font-semibold text-white underline"
                >
                  Whitelist
                </Navbar.Link>
              </Navbar.Collapse>
            </div>
            {/* <div className="flex justify-items-center gap-2">
              <ConnectButton />
              <DarkThemeToggle />
            </div> */}
          </div>
        </div>
      </Navbar>
    </header>
  );
};

export default AppNavbar;
