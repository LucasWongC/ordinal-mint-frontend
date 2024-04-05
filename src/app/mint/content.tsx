"use client";

import ConfirmModal from "@/components/modal/ConfirmModal";
import { useConnect } from "@/contexts/WalletConnectProvider";
import {
  cancelTx,
  getEstimateData,
  getMintData,
  getUserData,
} from "@/helpers/api";
import { waitForTx } from "@/helpers/ordinals/waitForTx";
import { useFeeRecommended, useSend } from "@/hooks";
import { Button, Card, Label } from "flowbite-react";
import { NextPage } from "next";
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
  const feesRecommended = useFeeRecommended();

  const [userData, setUserData] = useState<User>();
  const [count, setCount] = useState<number>(1);
  const [feeRate, setFeeRate] = useState<number>(1);
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

  const handleMint = useCallback(async () => {
    if (!address?.ordinals || error) {
      return;
    }

    setConfirmOpen(true);
    setErrorStep(undefined);
    setErrorMessage(undefined);
    let revealData;
    //generate mint param
    setActiveStep(0);
    try {
      revealData = await getMintData(address.ordinals, count, feeRate);
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

    let tx;
    try {
      tx = await sendMulti(
        revealData.map((item: any) => ({
          address: item.address,
          value: item.revealFee,
        })),
        feeRate,
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
      const addresses = revealData.map((item: any) => item.address);
      await cancelTx(addresses);
      return undefined;
    }
    setActiveStep(2);

    try {
      await waitForTx(tx as string);
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
  }, [address.ordinals, count, error, feeRate, sendMulti]);

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

  useEffect(() => {
    if (feesRecommended) {
      setFeeRate(feesRecommended.hourFee);
    }
  }, [feesRecommended]);

  return (
    <div className="relative h-full overflow-auto transition-all duration-200">
      <div className="m-auto flex h-full w-fit max-w-full items-center justify-center overflow-auto">
        <Card className="w-max max-w-2xl">
          You available amount is {availableAmount}
          {!availableAmount && (
            <Label value="You don't have permission to mint" color="error" />
          )}
          <div className="flex flex-col gap-2">
            <Label value="count" className="text-lg" />
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
          <div className="flex flex-col gap-2">
            <Label value="fee rate" className="text-lg" />
            <div className="relative flex w-full items-center">
              <button
                type="button"
                className="h-11 rounded-s-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                onClick={() => setFeeRate(feeRate > 1 ? feeRate - 1 : 1)}
              >
                <FaMinus className="h-3 w-3 text-gray-900 dark:text-white" />
              </button>
              <input
                type="text"
                aria-describedby="helper-text-explanation"
                className="block h-11 w-full border-x-0 border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                min={1}
                step={1}
                value={feeRate}
                onChange={(e) => setFeeRate(parseInt(e.target.value) ?? 1)}
                required
              />
              <button
                type="button"
                className="h-11 rounded-e-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                onClick={() => setFeeRate(feeRate + 1)}
              >
                <FaPlus className="h-3 w-3 text-gray-900 dark:text-white" />
              </button>
            </div>
          </div>
          {estimateData && (
            <Label
              value={`${estimateData.vsize}*${feeRate} + ${estimateData.postage} = ${estimateData.vsize * feeRate + estimateData.postage}`}
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
  );
};

export default HomeContent;
