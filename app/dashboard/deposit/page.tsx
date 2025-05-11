'use client'

import Image from "next/image";
import { useState } from "react";
import { parseUnits, formatUnits } from "viem";
import { Fuel, Loader2 } from "lucide-react";

import TokenCard from "@/components/TokenCard";
import TokenDetail from "@/components/TokenCard/TokenDetail";
import TokenDetails from "@/components/TokenCard/TokenDetails";
import TokenDivider from "@/components/TokenCard/TokenDivider";
import { Button } from "@/components/ui/button";
import { CheckConnectionWrapper } from "@/components/CheckConnectionWrapper";
import useDeposit from "@/hooks/useDeposit";
import { useTokenPriceUsd } from "@/hooks/useToken";
import { Status } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { compactNumberFormat } from "@/lib/utils";
import { useTotalAPY } from "@/hooks/useAnalytics";

export default function Home() {
  const [amount, setAmount] = useState<string>("");
  const {
    balance,
    deposit,
    depositStatus
  } = useDeposit();
  const { data: price } = useTokenPriceUsd("usdc");
  const isLoading = depositStatus === Status.PENDING;
  const { data: totalAPY } = useTotalAPY()

  const amountWei = parseUnits(amount, 6);
  const formattedBalance = balance ? formatUnits(balance, 6) : "0";

  const getButtonText = () => {
    if (!amount) return "Enter an amount";
    if (!balance || balance < amountWei) return "Insufficient balance";
    if (depositStatus === Status.PENDING) return "Depositing";
    if (depositStatus === Status.ERROR) return "Error while depositing";
    if (depositStatus === Status.SUCCESS) return "Successfully deposited";
    return "Deposit";
  };

  const handleClick = async () => {
    if (!amount) return;
    if (!balance || balance < amountWei) return;
    await deposit(amount);
  };

  return (
    <main className="flex flex-col gap-20 max-w-2xl mx-auto px-4 pt-8 pb-20 md:py-16">
      <header className="flex flex-col gap-4">
        <h1 className="text-h1 leading-tight font-semibold">
          Deposit to your saving account
        </h1>
        <p className="max-w-md text-xl font-medium opacity-50">
          Earn yield on your Earn yield on your Earn yield on your Earn yield on your Earn yield on your
        </p>
      </header>
      <section className="flex flex-col gap-4 md:gap-10">
        <div className="flex flex-col gap-1">
          <TokenCard
            amount={amount}
            onAmountChange={setAmount}
            balance={formattedBalance}
            price={1}
          />
          <TokenDivider />
          <TokenDetails>
            <TokenDetail className="grid grid-cols-1 md:grid-cols-[0.4fr_1fr] items-center gap-4">
              <div className="text-lg font-medium opacity-40">
                You will receive
              </div>
              <div className="flex items-center gap-3">
                <Image src="/usdc.svg" alt="WETH" width={34} height={34} />
                <span className="text-2xl font-semibold">
                  {compactNumberFormat(Number(amount))} fUSDC
                </span>
                <span className="text-lg font-medium opacity-40">
                  {price ?
                    `$${compactNumberFormat(Number(amount) * price)}` :
                    <Skeleton className="w-20 h-5 rounded-sm" />
                  }
                </span>
              </div>
            </TokenDetail>
            <TokenDetail className="grid grid-cols-1 md:grid-cols-[0.4fr_1fr] items-center gap-4">
              <div className="text-lg font-medium opacity-40">
                APY
              </div>
              <div className="flex items-baseline gap-2 md:gap-6">
                <span className="text-2xl font-semibold">
                  {totalAPY ?
                    `${totalAPY.toFixed(2)}%` :
                    <Skeleton className="w-20 h-8 rounded-sm" />
                  }
                </span>
                <span className="text-sm md:text-lg font-medium opacity-40">
                  {totalAPY ?
                    `Earn ~${compactNumberFormat(Number(amount) * (totalAPY / 100))} USDC/year` :
                    <Skeleton className="w-20 h-6 rounded-sm" />
                  }
                </span>
              </div>
            </TokenDetail>
          </TokenDetails>
        </div>
        <div className="flex flex-col gap-2">
          <CheckConnectionWrapper props={{ size: "xl" }}>
            <Button
              size="xl"
              onClick={handleClick}
              disabled={
                !amount ||
                !balance ||
                balance < amountWei ||
                isLoading
              }
            >
              {getButtonText()}
              {isLoading && <Loader2 className="animate-spin" />}
            </Button>
          </CheckConnectionWrapper>
          <div className="flex items-center self-end gap-1 text-sm text-muted-foreground">
            <Fuel size={14} />
            <span>Gasless Transaction</span>
          </div>
        </div>
      </section>
    </main>
  );
}
