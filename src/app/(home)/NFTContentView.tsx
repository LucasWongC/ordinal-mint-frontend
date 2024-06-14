import Image from "next/image";
import { FC, useState } from "react";

type Props = {
  data: NFTContent;
};

const NFTContentView: FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex h-auto w-full flex-col items-center">
      <div className="w-full">
        <Image
          width={345}
          height={372}
          src={data.image}
          alt={data.title}
          className="h-auto w-full"
        />
      </div>

      <div
        className="py-8"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <p className="text-3xl font-bold text-white underline">{data.title}s</p>
        {isOpen && (
          <div className="fixed left-1/2 top-1/2 z-20 mx-4 w-[calc(100%-32px)] max-w-[556px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-[#1A1A1AB2] to-[#071926B2] px-5 py-5">
            <div className="mb-10 text-center text-3xl font-semibold text-white md:text-4xl">
              <span className="underline">The {data.title}</span>:
            </div>
            <p className="w-full text-center text-xl font-semibold leading-relaxed text-white md:text-2xl">
              {data.description}
            </p>
            <button
              type="button"
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center border border-[#00000080] bg-[#07192680] text-2xl font-black leading-none text-white"
              onClick={() => setIsOpen(false)}
            >
              X
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTContentView;
