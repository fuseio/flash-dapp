'use client'

import Image from "next/image";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useAccount } from "wagmi";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { eclipseAddress } from "@/lib/utils";

const ConnectWallet = () => {
  const { sdkHasLoaded, setShowAuthFlow, setShowDynamicUserProfile } = useDynamicContext();
  const { address } = useAccount();

  if (address) {
    return (
      <Button
        className="w-full rounded-full flex items-center justify-between"
        onClick={() => setShowDynamicUserProfile(true)}
      >
        <Image src="/metamask.svg" alt="MetaMask" width={20} height={20} />
        {eclipseAddress(address, 4)}
        <ChevronDown />
      </Button>
    )
  }

  if (sdkHasLoaded) {
    return (
      <Button
        className="w-full rounded-full"
        onClick={() => setShowAuthFlow(true)}
      >
        Connect Wallet
      </Button>
    )
  }

  return (
    <Button className="w-full rounded-full animate-pulse"></Button>
  )
}

export default ConnectWallet;
