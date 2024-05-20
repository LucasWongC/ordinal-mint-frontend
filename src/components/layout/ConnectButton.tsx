"use client";

import { useConnect } from "@/contexts/WalletConnectProvider";
import { shortenString } from "@/helpers";
import { emojiAvatarForAddress } from "@/helpers/emojiAvatarForAddress";
import { useBalance } from "@/hooks";
import { Avatar, Dropdown } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";
import { FaBitcoin, FaCopy, FaSignOutAlt } from "react-icons/fa";

const ConnectButton = () => {
  const { address, openModal, disconnectWallet } = useConnect();
  const { getBalance } = useBalance();

  const [balance, setBalance] = useState<number>();

  const defaultAvatar = useMemo(
    () =>
      address?.ordinals ? emojiAvatarForAddress(address.ordinals) : undefined,
    [address?.ordinals],
  );

  useEffect(() => {
    if (getBalance) {
      getBalance().then(setBalance);
    }
  }, [getBalance]);

  return (
    <div>
      {(() => {
        if (!address?.ordinals) {
          return (
            <button
              className="mr-1 flex items-center rounded-xl bg-[#00000040] px-4 py-3 text-sm text-slate-200 hover:bg-[#00000080]"
              onClick={() => openModal()}
            >
              Connect Wallet
            </button>
          );
        }

        return (
          <div className="text-slate-200">
            <Dropdown
              inline
              label={
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {(balance ?? 0) / 100_000_000}
                    <FaBitcoin className="h-6 w-6" />
                  </div>
                  <Avatar rounded placeholderInitials={defaultAvatar?.emoji} />
                </div>
              }
            >
              <Dropdown.Header>
                <span className="block truncate text-sm font-medium">
                  <div className="inline-flex items-center gap-2">
                    {shortenString(address?.ordinals)}
                    <button type="button">
                      <FaCopy className="h-4 w-4" />
                    </button>
                  </div>
                </span>
              </Dropdown.Header>
              <Dropdown.Item icon={FaSignOutAlt} onClick={disconnectWallet}>
                Disconnect
              </Dropdown.Item>
            </Dropdown>
          </div>
        );
      })()}
    </div>
  );
};

export default ConnectButton;
