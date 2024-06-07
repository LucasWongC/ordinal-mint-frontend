/* eslint-disable jsx-a11y/media-has-caption */
"use client";

import MintModal from "@/components/modal/MintModal";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NFTContentView from "./NFTContentView";
import { nftContents } from "./nftContents";

const HomeContent: NextPage = () => {
  const [mintOpen, setMintOpen] = useState<boolean>(false);

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
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <video
          className="z-10 mx-auto h-full w-full object-cover"
          autoPlay
          loop
          muted
          id="landing-video"
        >
          <source src="/landing.mp4" type="video/mp4" />
        </video>
        <div className="absolute left-0 top-[calc(68px+0px)]">
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
        <div className="absolute right-[25%] top-[50%]">
          <button
            type="button"
            onClick={() => setMintOpen(true)}
            className="rounded-xl border-[3.5px] border-white bg-[#49939D36] px-8 py-3 font-semibold uppercase tracking-widest text-white shadow-[2px_4px_6px_2px_#49939DF5]"
          >
            Mint
          </button>
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

      <section className="mt-5 flex h-screen w-full flex-col items-center justify-center py-14">
        <div className="flex h-full flex-col items-center justify-around gap-10 px-[10vw] pb-10 text-white">
          <div className="text-center text-5xl font-bold">
            Our Ordinals are a gift to our community for their trust in us and
            our vision for joining the upper ranks of Bitcoin Mining.
          </div>
          <div className="h-1 w-[20vw] bg-white" />
          <div className="text-center text-4xl">
            To join our whitelist and gain access to our Exclusive collection we
            linked out WeFunder (link below) where each investment of $2,500
            secures an Ordinal.
          </div>
          <div className="h-1 w-[20vw] bg-white" />
          <Link
            href="https://wefunder.com/quantum.expeditions"
            className="my-10 rounded-xl border-[3.5px] border-white bg-[#49939D36] px-10 py-4 text-3xl font-semibold uppercase tracking-widest text-white shadow-[2px_4px_6px_2px_#49939DF5]"
          >
            Join Whitelist
          </Link>
          <div className="py-5 text-center text-5xl font-extrabold">
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

      <section className="relative h-screen w-full overflow-hidden pb-28">
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
