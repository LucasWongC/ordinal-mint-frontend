"use client";

import { Navbar } from "flowbite-react";
import type { FC } from "react";

// const ConnectButton = dynamic(() => import("./ConnectButton"), {
//   ssr: false,
// });

const AppNavbar: FC<Record<string, never>> = function () {
  return (
    <header>
      <Navbar fluid className="bg-black md:px-[10vw]">
        <Navbar.Brand />
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            href="/"
            className="mx-3 text-sm font-semibold text-white hover:bg-transparent md:py-4 md:underline"
          >
            Home
          </Navbar.Link>
          <Navbar.Link
            href="https://quantumexpeditions.com/about"
            target="_blank"
            className="mx-3 text-sm font-semibold text-white hover:bg-transparent md:py-4 md:underline"
          >
            About
          </Navbar.Link>
          <Navbar.Link
            href="https://quantumexpeditions.com/contact"
            target="_blank"
            className="mx-3 text-sm font-semibold text-white hover:bg-transparent md:py-4 md:underline"
          >
            Contact
          </Navbar.Link>
          <Navbar.Link
            href="https://wefunder.com/quantum.expeditions"
            className="mx-3 text-sm font-semibold text-white hover:bg-transparent md:py-4 md:underline"
          >
            Whitelist
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default AppNavbar;
