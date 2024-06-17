/* eslint-disable jsx-a11y/media-has-caption */
"use client";

import MintModal from "@/components/modal/MintModal";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NFTContentView from "./NFTContentView";
import Wefunder from "./Wefunder";
import { nftContents } from "./nftContents";

const HomeContent: NextPage = () => {
  const [mintOpen, setMintOpen] = useState<boolean>(false);
  const [wefunderOpen, setWefunderOpen] = useState<boolean>(false);

  const handleToTop = () => {
    if (typeof window != undefined) {
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-black to-[#071926] transition-all duration-200">
      <MintModal isOpen={mintOpen} setOpen={setMintOpen} />
      <section className="relative aspect-[96/80] w-full overflow-hidden bg-black md:h-screen">
        <Image
          objectFit="cover"
          layout="fill"
          className="mx-auto h-full w-full object-cover"
          src="/landing.gif"
          alt="landing"
        />
        <div className="absolute left-0 top-0 -translate-x-1/4 scale-50 md:left-0 md:top-[120px] md:translate-x-0 md:scale-100">
          <div className="flex items-center">
            <Image width={204} height={205} src="/logo.png" alt="logo" />
            <div className="flex flex-col items-center text-white">
              <p className="text-5xl font-semibold uppercase leading-[60px] tracking-[9px]">
                Quantum
              </p>
              <p className="text-5xl font-[200] uppercase leading-[60px] tracking-[1px]">
                Ex<span className="underline">pedition</span>s
              </p>
              <p className="mt-3 text-xl">STAY SAFE. STACK SATS. HODL.</p>
            </div>
          </div>
        </div>
        <div className="absolute right-12 top-36 scale-75 md:right-[25%] md:top-[50%] md:scale-100">
          <div className="flex flex-col items-center gap-9">
            <button
              type="button"
              onClick={() => setWefunderOpen(!wefunderOpen)}
              className="rounded-xl border-[3.5px] border-white bg-[#49939D36] p-[6px] text-[25px] font-semibold uppercase leading-[32px] -tracking-wide text-white shadow-[2px_4px_6px_2px_#49939DF5] [text-shadow:0px_4px_4px_0px_#00000040]"
            >
              Join whitelist
            </button>
            <button
              type="button"
              onClick={() => setMintOpen(true)}
              className="rounded-xl border-[3.5px] border-white bg-[#49939D36] px-8 py-3 text-[28px] font-semibold uppercase leading-[32px] tracking-widest text-white shadow-[2px_4px_6px_2px_#49939DF5] [text-shadow:0px_4px_4px_0px_#00000040]"
            >
              Mint
            </button>
          </div>
        </div>
      </section>

      <section className="grid h-1 w-full grid-cols-[1fr_auto_1fr] items-center overflow-visible">
        <div className="h-full bg-white" />
        <div className="relative w-[240px] md:w-[480px]">
          <Image
            width={131}
            height={104}
            src="/logo.gif"
            alt="logo"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3"
          />
        </div>
        <div className="h-full bg-white" />
      </section>

      <section className="mt-5 flex w-full flex-col items-center justify-center py-14 md:h-screen">
        <div className="flex h-full flex-col items-center justify-around gap-10 px-[10vw] text-white md:pb-10">
          <div className="text-center text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl">
            Our Ordinals are a gift to our community for their trust in us and
            our vision for joining the upper ranks of Bitcoin Mining.
          </div>
          <div className="h-1 w-[20vw] bg-white" />
          <div className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            To join our whitelist and gain access to our Exclusive collection we
            linked out WeFunder (link below) where each investment of $2,500
            secures an Ordinal.
          </div>
          <div className="h-1 w-[20vw] bg-white" />
          <Link
            href="https://wefunder.com/quantum.expeditions"
            target="_blank"
            className="my-0 rounded-xl border-[3.5px] border-white bg-[#49939D36] px-5 py-2 text-xl font-black uppercase tracking-widest text-white shadow-[2px_4px_6px_2px_#49939DF5] md:my-10 md:px-10 md:py-4 md:text-3xl"
          >
            wefunder
          </Link>
          <Wefunder isOpen={wefunderOpen} setIsOpen={setWefunderOpen} />
          <div className="py-2 text-center text-sm font-extrabold md:py-5 md:text-3xl lg:text-4xl xl:text-5xl">
            --- STAY SAFE. STACK SATS. HODL ---
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="mx-auto mb-5 h-1 w-[60vw] bg-white" />
        <div className="mx-auto mb-5 h-1 w-[80vw] bg-white" />
        <div className="grid w-full grid-cols-1 gap-10 px-10 lg:grid-cols-3">
          {nftContents.map((content) => (
            <NFTContentView data={content} key={content.title} />
          ))}
        </div>
      </section>

      <section className="relative h-80 w-full overflow-hidden pb-28 md:h-screen">
        <div className="relative h-full w-full overflow-visible">
          <Image
            objectFit="cover"
            layout="fill"
            src="/factory.png"
            alt="factory"
            className="overflow-visible"
          />
        </div>
        <div className="absolute bottom-[110px] left-0 grid h-1 w-full grid-cols-[1fr_auto_1fr] items-center overflow-visible">
          <div className="h-full bg-white" />
          <div className="relative w-[240px] md:w-[480px]">
            <Image
              width={131}
              height={104}
              src="/logo.gif"
              alt="logo"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3"
            />
          </div>
          <div className="h-full bg-white" />
        </div>
        <button
          type="button"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 p-5 text-sm font-semibold text-white underline"
          onClick={handleToTop}
        >
          Back To Top
        </button>
      </section>
    </div>
  );
};

export default HomeContent;
