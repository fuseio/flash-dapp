"use client";

import {MercuryoWidget} from "@/components/MercuryoWidget/MercuryoWidget";

export default function Home() {
  return (
    <main className="flex flex-col gap-20 max-w-2xl mx-auto px-4 pt-8 pb-20 md:py-16">
      <header className="flex flex-col gap-4">
        <h1 className="text-h1 leading-tight font-semibold">
          Buy Crypto Instantly
        </h1>
        <p className="max-w-md text-xl font-medium opacity-50">
          Purchase crypto using your credit card, Apple Pay, or Google Pay.
          Fast, secure, and deposited straight to your account.
        </p>
      </header>
      <section className="flex flex-col gap-4 md:gap-10 h-[700px] sm:h-[500px] w-full">
        <MercuryoWidget />
      </section>
    </main>
  );
}
