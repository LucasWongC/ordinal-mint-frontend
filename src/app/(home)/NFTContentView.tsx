import Image from "next/image";
import { FC } from "react";

type Props = {
  data: NFTContent;
};

const NFTContentView: FC<Props> = ({ data }) => {
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

      <div className="group py-8">
        <p className="text-3xl font-bold text-white underline">{data.title}s</p>
        <div className="fixed left-1/2 top-1/2 hidden w-full max-w-xl -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-[#1A1A1AB2] to-[#071926B2] p-5 group-hover:block">
          <div className="mb-10 text-center text-3xl font-semibold text-white underline md:text-4xl">
            The {data.title}:
          </div>
          <p className="w-full text-center text-xl font-semibold leading-relaxed text-white md:text-2xl">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NFTContentView;
