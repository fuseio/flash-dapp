import Image from "next/image";

import TokenCard from "@/components/TokenCard";
import TokenDetail from "@/components/TokenCard/TokenDetail";
import TokenDetails from "@/components/TokenCard/TokenDetails";
import TokenDivider from "@/components/TokenCard/TokenDivider";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col gap-20 max-w-2xl mx-auto px-4 py-16">
      <header className="flex flex-col gap-4">
        <h1 className="text-h1 font-semibold">
          Deposit to your saving account
        </h1>
        <p className="max-w-md text-xl font-medium opacity-50">
          Earn yield on your Earn yield on your Earn yield on your Earn yield on your Earn yield on your
        </p>
      </header>
      <section className="flex flex-col gap-10">
        <div className="flex flex-col gap-1">
        <TokenCard />
        <TokenDivider />
        <TokenDetails>
          <TokenDetail className="grid grid-cols-[0.4fr_1fr] items-center gap-4">
            <div className="text-lg font-medium opacity-40">
              You will receive
            </div>
            <div className="flex items-center gap-3">
              <Image src="/usdc.svg" alt="USDC" width={34} height={34} />
              <span className="text-2xl font-semibold">
                9.56
              </span>
              <span className="text-lg font-medium opacity-40">
                $10
              </span>
            </div>
          </TokenDetail>
          <TokenDetail className="grid grid-cols-[0.4fr_1fr] items-center gap-4">
            <div className="text-lg font-medium opacity-40">
              APY
            </div>
            <div className="flex items-baseline gap-6">
              <span className="text-2xl font-semibold">
                4.50%
              </span>
              <span className="text-lg font-medium opacity-40">
                Earn ~0.45 USDC/year
              </span>
            </div>
          </TokenDetail>
        </TokenDetails>
        </div>
        <Button size="xl">
          Deposit
        </Button>
      </section>
    </main>
  );
}
