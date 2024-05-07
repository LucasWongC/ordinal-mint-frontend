"use client";

import ConfirmModal from "@/components/modal/ConfirmModal";
import { useConnect } from "@/contexts/WalletConnectProvider";
import {
  cancelTx,
  getEstimateData,
  getMintData,
  getUserData,
} from "@/helpers/api";
import waitForRevealTx from "@/helpers/ordinals/waitForRevealTx";
import { useSend } from "@/hooks";
import { Button, Card, Label } from "flowbite-react";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const confirmSteps = [
  {
    title: "Get reveal data",
    description: "Need to wait for a while",
  },
  {
    title: "Fund for reveal",
    description: "Need to sign for transfer transaction",
  },
  {
    title: "Wait for fund transaction to be confirmed",
    description: "Need to wait for fund transaction to be confirmed",
  },
];

const HomeContent: NextPage = () => {
  const router = useRouter();
  const { address, openModal } = useConnect();
  const { sendMulti } = useSend();

  const [userData, setUserData] = useState<User>();
  const [count, setCount] = useState<number>(1);
  const [estimateData, setEstimateData] = useState<any>();
  const [error, setError] = useState<string>();

  // confirm modal
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [errorStep, setErrorStep] = useState<number>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const availableAmount = useMemo(
    () => (userData ? userData.total - userData.minted - userData.pending : 0),
    [userData],
  );

  const handleToTop = () => {
    if (typeof window != undefined) {
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleMint = useCallback(async () => {
    if (!address?.ordinals || error) {
      return;
    }

    setConfirmOpen(true);
    setErrorStep(undefined);
    setErrorMessage(undefined);
    let res;
    //generate mint param
    setActiveStep(0);
    try {
      res = await getMintData(address.ordinals, count);
    } catch (error: unknown) {
      console.log(error);
      setErrorStep(0);
      setErrorMessage(
        (error as any).response?.data?.reason ??
          "Something went wrong on server side.",
      );
      return undefined;
    }
    setActiveStep(1);

    const addresses = res.revealData.map((item: any) => item.address);

    let tx;
    try {
      tx = await sendMulti(
        res.revealData.map((item: any) => ({
          address: item.address,
          value: item.revealFee,
        })),
        res.feeRate,
        true,
      );
      console.log(tx);
    } catch (error: unknown) {
      console.log(error);
      setErrorStep(1);
      setErrorMessage(
        (error as any)?.message ??
          error ??
          "Something went wrong when send funds",
      );

      await cancelTx(addresses);
      return undefined;
    }
    setActiveStep(2);

    try {
      for (const revealAddress of addresses) {
        await waitForRevealTx(revealAddress);
      }
    } catch (error: any) {
      console.log(error);
      setErrorStep(2);
      setErrorMessage(
        error?.message ??
          error?.response?.data?.reason ??
          "Something went wrong.",
      );
      return undefined;
    }
    setActiveStep(3);
  }, [address.ordinals, count, error, sendMulti]);

  useEffect(() => {
    if (address?.ordinals) {
      getUserData(address?.ordinals)
        .then(setUserData)
        .catch((err) => setError(err?.response?.data?.reason));
    }
  }, [address?.ordinals]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count) {
        getEstimateData(count)
          .then((data) => {
            setEstimateData(data);
            setError(undefined);
          })
          .catch((err) => {
            setError(err?.response?.data?.reason);
            setEstimateData(undefined);
          });
      } else {
        setEstimateData(undefined);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div className="relative bg-gradient-to-b from-black to-[#071926] transition-all duration-200">
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
        <div className="absolute left-5 top-[20%]">
          <h2 className="text-5xl font-bold text-white underline">
            Quantum Expeditions
          </h2>
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

      <section className="mt-40 w-full">
        <div className="relative h-full overflow-auto transition-all duration-200">
          <div className="m-auto flex h-full w-fit max-w-full items-center justify-center overflow-auto">
            <Card className="w-full max-w-4xl bg-[#49939D36] text-white">
              {address?.ordinals ? (
                <div>
                  You available amount is {availableAmount}
                  {!availableAmount && (
                    <Label
                      value="You don't have permission to mint"
                      color="error"
                    />
                  )}
                </div>
              ) : (
                <div>Please connect your bitcoin wallet</div>
              )}
              <div className="flex flex-col gap-2">
                <Label value="count" className="text-lg text-white" />
                <div className="relative flex w-full items-center">
                  <button
                    type="button"
                    className="h-11 rounded-s-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    onClick={() => setCount(count > 1 ? count - 1 : 1)}
                  >
                    <FaMinus className="h-3 w-3 text-gray-900 dark:text-white" />
                  </button>
                  <input
                    type="text"
                    aria-describedby="helper-text-explanation"
                    className="block h-11 w-full border-x-0 border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    min={1}
                    max={availableAmount}
                    step={1}
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value) ?? 1)}
                    required
                  />
                  <button
                    type="button"
                    className="h-11 rounded-e-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    onClick={() =>
                      count <= availableAmount - 1
                        ? setCount(count + 1)
                        : setCount(count)
                    }
                  >
                    <FaPlus className="h-3 w-3 text-gray-900 dark:text-white" />
                  </button>
                </div>
              </div>
              {estimateData && (
                <Label
                  value={`${estimateData.fee} + ${estimateData.postage} = ${estimateData.fee + estimateData.postage} sats (${(estimateData.fee + estimateData.postage) / 100_000_000} BTC)`}
                  color="info"
                />
              )}
              {error && <Label value={error} color="error" />}
              {address?.ordinals ? (
                <Button color="gray" onClick={handleMint}>
                  Mint
                </Button>
              ) : (
                <Button color="gray" onClick={() => openModal()}>
                  Connect Wallet
                </Button>
              )}
            </Card>
          </div>
          <ConfirmModal
            isOpen={confirmOpen}
            setOpen={setConfirmOpen}
            title="Mint Ordinal"
            steps={confirmSteps}
            activeStep={activeStep}
            errorStep={errorStep}
            errorMessage={errorMessage}
            handleRetry={() => handleMint()}
            handleContinue={() => router.push("/success")}
            successMessage="Ordinals minted successfully! You can see your ordinals on your wallet after some minutes"
          />
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
