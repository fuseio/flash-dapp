import { useState } from "react";
import { useAccount, useReadContract, useWriteContract, useWalletClient } from "wagmi";
import { parseEther, type Address } from "viem";
import { waitForTransactionReceipt } from "viem/actions";

import ERC20_ABI from "@/lib/abis/ERC20";
import ETHEREUM_TELLER_ABI from "@/lib/abis/EthereumTeller";
import { ADDRESSES } from "@/lib/config";
import { Status } from "@/lib/types";

type DepositResult = {
  allowance: bigint | undefined;
  balance: bigint | undefined;
  approve: (amount: string) => Promise<void>;
  deposit: (amount: string) => Promise<void>;
  approveStatus: Status;
  depositStatus: Status;
  error: string | null;
};

const useDeposit = (): DepositResult => {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { data: walletClient } = useWalletClient()
  const [approveStatus, setApproveStatus] = useState<Status>(Status.IDLE);
  const [depositStatus, setDepositStatus] = useState<Status>(Status.IDLE);
  const [error, setError] = useState<string | null>(null);

  const { data: balance } = useReadContract({
    abi: ERC20_ABI,
    address: ADDRESSES.ethereum.weth,
    functionName: "balanceOf",
    args: [address as Address],
    query: {
      enabled: !!address,
    },
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: ERC20_ABI,
    address: ADDRESSES.ethereum.weth,
    functionName: "allowance",
    args: [address as Address, ADDRESSES.ethereum.teller],
    query: {
      enabled: !!address,
    },
  });

  const approve = async (amount: string) => {
    try {
      if (!walletClient) {
        throw new Error("Wallet client not found");
      }

      setApproveStatus(Status.PENDING);
      setError(null);

      const amountWei = parseEther(amount);
      if (balance && balance < amountWei) {
        throw new Error("Insufficient WETH balance");
      }

      const hash = await writeContractAsync({
        abi: ERC20_ABI,
        address: ADDRESSES.ethereum.weth,
        functionName: "approve",
        args: [ADDRESSES.ethereum.teller, amountWei],
      });

      const receipt = await waitForTransactionReceipt(walletClient, { hash });

      await refetchAllowance();
      if (receipt.status === "success") {
        setApproveStatus(Status.SUCCESS);
      } else {
        throw new Error("Approval failed");
      }
    } catch (error) {
      console.error(error);
      setApproveStatus(Status.ERROR);
      setError(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const deposit = async (amount: string) => {
    try {
      if (!walletClient) {
        throw new Error("Wallet client not found");
      }

      setDepositStatus(Status.PENDING);
      setError(null);

      const amountWei = parseEther(amount);
      if (balance && balance < amountWei) {
        throw new Error("Insufficient WETH balance");
      }

      if (allowance && allowance < amountWei) {
        throw new Error("Insufficient allowance. Please approve first.");
      }

      const hash = await writeContractAsync({
        abi: ETHEREUM_TELLER_ABI,
        address: ADDRESSES.ethereum.teller,
        functionName: "deposit",
        args: [amountWei],
      });

      const receipt = await waitForTransactionReceipt(walletClient, { hash });
      if (receipt.status === "success") {
        setDepositStatus(Status.SUCCESS);
      } else {
        throw new Error("Deposit failed");
      }
    } catch (error) {
      console.error(error);
      setDepositStatus(Status.ERROR);
      setError(error instanceof Error ? error.message : "Unknown error");
    }
  };

  return {
    allowance,
    balance,
    approve,
    deposit,
    approveStatus,
    depositStatus,
    error,
  };
};

export default useDeposit;
