type User = {
  ordinals: string;
  payments: string;
  total: number;
  minted: number;
  pending: number;
  txs: Transaction[];
};

type Ordinal = {
  id: number;
  inscriptionId: string;
  sat: string;
  owner: string;

  txid?: number;
  tx?: Transaction;
};

type TransactionStatus =
  | "Issued"
  | "Funded"
  | "Finished"
  | "Canceled"
  | "Expired";

type Transaction = {
  id: number;
  status: TransactionStatus;
  address: string;
  creatorId: string;
  txid?: string;

  ordinals: Ordinal[];
  creator: User;
};

type ConfirmStep = {
  title: string;
  description: string;
};
