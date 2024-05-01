import axios from "../axios";

export const getUserData = async (address: string) => {
  const { data } = await axios.get(`/user/${address}`);

  return data;
};

export const getEstimateData = async (count: number) => {
  const { data } = await axios.get(`/estimate?count=${count}`);

  return data;
};

export const getMintData = async (receiver: string, count: number) => {
  const { data } = await axios.post(
    `/mint?receiver=${receiver}&count=${count}`,
  );

  return data;
};

export const getRevealData = async (revealAddress: string) => {
  const { data } = await axios.get(`/tx?address=${revealAddress}`);

  return data;
};

export const cancelTx = async (addresses: string[]) => {
  const { data } = await axios.delete("/tx", {
    params: {
      addresses,
    },
  });

  return data;
};
