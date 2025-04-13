import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

const TokenSelector = () => {
  return (
    <Button size="xl" className="gap-1 rounded-full">
      <Image src="/eth.svg" alt="WETH" width={30} height={30} />
      <span className="text-lg font-bold">
        WETH
      </span>
      <ChevronDown />
    </Button>
  )
}

export default TokenSelector;
