import { getRevealData } from "../api";
import { delay } from "../time";

const waitForRevealTx = async (address: string) => {
  while (true) {
    const data = await getRevealData(address);

    if (data.status == "Finished") {
      break;
    }

    await delay(2000);
  }
};

export default waitForRevealTx;
