import { useState } from "react";
import { useBalance, useReadContract } from "wagmi";
import {
  encodeFunctionData,
  Hash,
  parseEther,
  parseUnits,
  encodeAbiParameters,
  type Address,
  parseAbiParameters,
  formatEther,
} from "viem";
import { mainnet } from "viem/chains";

import ERC20_ABI from "@/lib/abis/ERC20";
import ETHEREUM_TELLER_ABI from "@/lib/abis/EthereumTeller";
import { ADDRESSES } from "@/lib/config";
import { Status } from "@/lib/types";
import useUser from "./useUser";
import { publicClient } from "@/lib/wagmi";
import { BaseSafeOperation } from "@safe-global/relay-kit";

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
  const { user, safeAA, userOpReceipt } = useUser();
  const [approveStatus, setApproveStatus] = useState<Status>(Status.IDLE);
  const [depositStatus, setDepositStatus] = useState<Status>(Status.IDLE);
  const [error, setError] = useState<string | null>(null);

  const { data: balance } = useReadContract({
    abi: ERC20_ABI,
    address: ADDRESSES.ethereum.usdc,
    functionName: "balanceOf",
    args: [user?.safeAddress as Address],
    chainId: mainnet.id,
    query: {
      enabled: !!user?.safeAddress,
    },
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: ERC20_ABI,
    address: ADDRESSES.ethereum.usdc,
    functionName: "allowance",
    args: [user?.safeAddress as Address, ADDRESSES.ethereum.vault],
    chainId: mainnet.id,
    query: {
      enabled: !!user?.safeAddress,
    },
  });

  const { data: fee, refetch: refetchFee } = useReadContract({
    abi: ETHEREUM_TELLER_ABI,
    address: ADDRESSES.ethereum.teller,
    functionName: "previewFee",
    args: [
      BigInt(0),
      user?.safeAddress as Address,
      encodeAbiParameters(parseAbiParameters("uint32"), [30138]),
      ADDRESSES.ethereum.nativeFeeToken,
    ],
    chainId: mainnet.id,
  });

  const approve = async (amount: string) => {
    try {
      if (!user?.passkey) {
        throw new Error("Passkey not found");
      }

      setApproveStatus(Status.PENDING);
      setError(null);

      const amountWei = parseUnits(amount, 6);
      if (balance && balance < amountWei) {
        throw new Error("Insufficient USDC balance");
      }

      const safe4337Pack = await safeAA(user.passkey);
      const approveTransaction = {
        to: ADDRESSES.ethereum.usdc,
        data: encodeFunctionData({
          abi: ERC20_ABI,
          functionName: "approve",
          args: [ADDRESSES.ethereum.vault, amountWei],
        }),
        value: "0",
      };

      const safeOperation = await safe4337Pack.createTransaction({
        transactions: [approveTransaction],
      });
      const signedSafeOperation = await safe4337Pack.signSafeOperation(
        safeOperation
      );

      const userOperationHash = await safe4337Pack.executeTransaction({
        executable: signedSafeOperation,
      });
      const userOperationReceipt = await userOpReceipt(
        safe4337Pack,
        userOperationHash
      );
      if (!userOperationReceipt.success) {
        throw new Error("User operation failed");
      }

      const transactionHash = userOperationReceipt.receipt
        .transactionHash as Hash;
      const transaction = await publicClient(
        mainnet.id
      ).waitForTransactionReceipt({ hash: transactionHash });

      await refetchAllowance();
      if (transaction.status === "success") {
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
      if (!user?.passkey) {
        throw new Error("Passkey not found");
      }

      setDepositStatus(Status.PENDING);
      setError(null);

      const amountWei = parseUnits(amount, 6);
      if (balance && balance < amountWei) {
        throw new Error("Insufficient USDC balance");
      }

      let safeOperation: BaseSafeOperation;
      let transactions: any[] = [];
      const safe4337Pack = await safeAA(user.passkey);
      if (allowance && allowance < amountWei) {
        const approveTransaction = {
          to: ADDRESSES.ethereum.usdc,
          data: encodeFunctionData({
            abi: ERC20_ABI,
            functionName: "approve",
            args: [ADDRESSES.ethereum.vault, amountWei],
          }),
          value: "0",
        };

        const depositTransaction = {
          to: ADDRESSES.ethereum.teller,
          data: encodeFunctionData({
            abi: ETHEREUM_TELLER_ABI,
            functionName: "depositAndBridge",
            args: [
              ADDRESSES.ethereum.usdc,
              amountWei,
              BigInt(0),
              user.safeAddress,
              encodeAbiParameters(parseAbiParameters("uint32"), [30138]),
              ADDRESSES.ethereum.nativeFeeToken,
              fee ? (fee * BigInt(12)) / BigInt(10) : BigInt(0),
            ],
          }),
          value: fee?.toString() || "0",
        };

        transactions.push(approveTransaction, depositTransaction);
      } else {
        const depositTransaction = {
          to: ADDRESSES.ethereum.teller,
          data: encodeFunctionData({
            abi: ETHEREUM_TELLER_ABI,
            functionName: "depositAndBridge",
            args: [
              ADDRESSES.ethereum.usdc,
              amountWei,
              BigInt(0),
              user.safeAddress,
              encodeAbiParameters(parseAbiParameters("uint32"), [30138]),
              ADDRESSES.ethereum.nativeFeeToken,
              fee ? (fee * BigInt(12)) / BigInt(10) : BigInt(0),
            ],
          }),
          value: fee?.toString() || "0",
        };

        transactions.push(depositTransaction);
      }

      safeOperation = await safe4337Pack.createTransaction({
        transactions,
      });
      const signedSafeOperation = await safe4337Pack.signSafeOperation(
        safeOperation
      );

      const userOperationHash = await safe4337Pack.executeTransaction({
        executable: signedSafeOperation,
      });
      const userOperationReceipt = await userOpReceipt(
        safe4337Pack,
        userOperationHash
      );
      if (!userOperationReceipt.success) {
        throw new Error("User operation failed");
      }

      const transactionHash = userOperationReceipt.receipt
        .transactionHash as Hash;
      const transaction = await publicClient(
        mainnet.id
      ).waitForTransactionReceipt({ hash: transactionHash });
      if (transaction.status === "success") {
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
