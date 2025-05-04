'use client'

import Link from "next/link";
import Image from "next/image";
import { useReadContract } from "wagmi";
import { Address, formatEther } from "viem";
import { fuse } from "viem/chains";

import { buttonVariants } from "@/components/ui/button";
import { path } from "@/lib/utils";
import SavingCountUp from "@/components/SavingCountUp";
import { Skeleton } from "@/components/ui/skeleton";
import FuseVault from "@/lib/abis/FuseVault";
import { ADDRESSES } from "@/lib/config";
import useUser from "@/hooks/useUser";
import { useLatestTokenTransfer, useTotalAPY } from "@/hooks/useAnalytics";

import Deposit from "@/assets/deposit";

export default function Home() {
  const { user } = useUser();
  const { data: balance, isLoading: isBalanceLoading } = useReadContract({
    abi: FuseVault,
    address: ADDRESSES.fuse.vault,
    functionName: 'balanceOf',
    args: [user?.safeAddress as Address],
    chainId: fuse.id,
    query: {
      enabled: !!user?.safeAddress,
    },
  })
  const { data: totalAPY } = useTotalAPY()
  const { data: lastTimestamp } = useLatestTokenTransfer(user?.safeAddress ?? "", ADDRESSES.fuse.vault)

  return (
    <main className="flex flex-col gap-12 md:gap-20 px-4 pt-8 pb-20 md:py-16">
      <header className="flex flex-col md:flex-row justify-between md:items-center gap-y-4 w-full max-w-7xl mx-auto">
        <div className="flex flex-col gap-4">
          <h1 className="text-h1 leading-tight font-semibold">
            Your saving account
          </h1>
          <p className="max-w-md text-xl font-medium opacity-50">
            Earn yield on your Earn yield on your Earn yield on your Earn yield on your Earn yield on your
          </p>
        </div>
        <div className="flex items-center gap-5 h-20">
          <Link href={path.DEPOSIT} className={buttonVariants({ className: "flex flex-col items-center gap-3 w-28 h-full rounded-twice" })}>
            <Deposit className="size-6" />
            Deposit
          </Link>
        </div>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-4 w-full max-w-7xl mx-auto border rounded-twice overflow-hidden">
        <article className="md:col-span-3 md:row-span-3 flex flex-col justify-between gap-4 bg-card p-6 md:p-12 border-b md:border-b-0 md:border-r">
          <h2 className="text-3xl font-medium">WETH Savings</h2>
          <div className="flex items-center gap-2 md:gap-4">
            <Image src="/eth.svg" alt="WETH" width={76} height={76} className="hidden md:block" />
            <Image src="/eth.svg" alt="WETH" width={36} height={36} className="block md:hidden" />
            {(balance && totalAPY && lastTimestamp) ? (
              <SavingCountUp
                balance={Number(formatEther(balance))}
                apy={totalAPY}
                lastTimestamp={lastTimestamp / 1000}
              />
            ) : (
              <Skeleton className="w-48 h-10 md:w-96 md:h-24 rounded-sm" />
            )}
          </div>
        </article>
        <article className="flex flex-col gap-2.5 bg-card p-6 border-b">
          <h3 className="text-lg text-primary/50 font-medium">APY</h3>
          <div className="text-2xl font-semibold">
            {totalAPY ?
              `${totalAPY.toFixed(2)}%`
              : <Skeleton className="w-20 h-8 rounded-sm" />
            }
          </div>
        </article>
        <article className="flex flex-col gap-2.5 bg-card p-6 border-b">
          <h3 className="text-lg text-primary/50 font-medium">1-year Projection</h3>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 text-2xl font-semibold">+{
              (totalAPY && balance) ?
                `${(totalAPY * Number(formatEther(balance))).toFixed(2)}` :
                <Skeleton className="w-20 h-8 rounded-sm" />
            }
            </div>
            <Image src="/eth.svg" alt="WETH" width={16} height={16} />
          </div>
        </article>
        <article className="flex flex-col gap-2.5 bg-card p-6">
          <h3 className="text-lg text-primary/50 font-medium">Your fWETH Balance</h3>
          <div className="flex items-center gap-1">
            {isBalanceLoading ? (
              <Skeleton className="w-24 h-8 rounded-sm" />
            ) : (
              <span className="text-2xl font-semibold">
                {formatEther(balance ?? BigInt(0))}
              </span>
            )}
            <Image src="/eth.svg" alt="WETH" width={16} height={16} />
          </div>
        </article>
      </section>
    </main>
  );
}
