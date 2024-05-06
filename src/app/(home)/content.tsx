/* eslint-disable jsx-a11y/media-has-caption */
"use client";

import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import NFTContentView from "./NFTContentView";
import { nftContents } from "./nftContents";

const HomeContent: NextPage = () => {
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
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <video
          className="z-10 mx-auto h-full w-full object-fill"
          autoPlay
          loop
          muted
          id="landing-video"
        >
          <source src="/landing.mp4" type="video/mp4" />
        </video>
        <div className="absolute left-5 top-[20%]">
          <h2 className="text-5xl font-bold text-white underline">
            Quantum Expeditions
          </h2>
        </div>
        <div className="absolute right-[25%] top-[50%]">
          <Link
            href="/mint"
            className="rounded-xl border bg-[#49939D36] p-4 text-base font-semibold text-white underline"
          >
            Mint Here
          </Link>
        </div>
      </section>

      <section className="mt-10 grid h-1 w-full grid-cols-[1fr_auto_1fr] items-center overflow-visible">
        <div className="h-full bg-white" />
        <div className="relative w-[240px] md:w-[370px]">
          <Image
            width={370}
            height={394}
            src="/logo.gif"
            alt="logo"
            className="absolute left-1/2 top-1/2 h-[250px] w-[240px] -translate-x-1/2 -translate-y-2/3 md:h-[375px] md:w-[360px]"
          />
        </div>
        <div className="h-full bg-white" />
      </section>

      <section className="-mt-10 flex h-screen w-full flex-col items-center justify-center pt-28">
        <div className="flex flex-col gap-10 text-white">
          <div className="text-center text-5xl font-bold">
            555 unique Ordinals
          </div>
          <div className="text-center text-4xl font-bold">
            3 distinct badgers
          </div>
          <div className="text-center text-2xl font-bold">-</div>
          <div className="text-center text-2xl font-bold">Stay Safe</div>
          <div className="text-center text-2xl font-bold">Stack Sats</div>
          <div className="text-center text-2xl font-bold">HODL</div>
          <div className="text-center text-2xl font-bold">-</div>
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

      <section className="relative h-screen w-full overflow-hidden py-28">
        <div className="relative h-full w-full overflow-visible">
          <Image
            objectFit="cover"
            layout="fill"
            src="/factory.png"
            alt="factory"
            className="overflow-visible"
          />
          <div className="absolute left-1/2 top-0 -translate-x-1/2">
            <Link
              href="/mint"
              className="rounded-xl border border-white bg-[#49939DBF] px-10 py-4 text-lg font-semibold text-white"
            >
              Mint Here
            </Link>
          </div>
        </div>
        <div className="absolute bottom-[110px] left-0 grid h-1 w-full grid-cols-[1fr_auto_1fr] items-center overflow-visible">
          <div className="h-full bg-white" />
          <div className="relative w-[240px] md:w-[480px]">
            <Image
              width={131}
              height={104}
              src="/logo.gif"
              alt="logo"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
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
