import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

const TokenSelector = () => {
  return (
    <Button size="xl" className="gap-1 rounded-full">
      <Image src="/usdc.svg" alt="USDC" width={30} height={30} />
      <span className="text-lg font-bold">
        USDC
      </span>
      <ChevronDown />
    </Button>
  )
}

export default TokenSelector;
