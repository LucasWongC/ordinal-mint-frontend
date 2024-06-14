import { FC } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const Wefunder: FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    isOpen && (
      <div className="fixed left-1/2 top-1/2 z-20 flex h-full max-h-[291px] w-[calc(100%-32px)] max-w-[576px] -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-gradient-to-b from-[#071926BA] via-[#103A58A1] to-[#071926BA] px-5 py-5">
        <p className="w-full text-center text-xl font-medium leading-8 text-white md:text-[28px]">
          For every $2,500 invested in our crowdfund campaign you will receive 1
          whitelist spot. Please select the WeFunder button below to join. Once
          the investment is finished, we will contact you to get your wallet ID.
        </p>
        <button
          type="button"
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center border border-[#00000080] bg-[#07192680] text-2xl font-black leading-none text-white"
          onClick={() => setIsOpen(false)}
        >
          X
        </button>
      </div>
    )
  );
};

export default Wefunder;
