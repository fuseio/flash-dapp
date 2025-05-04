'use client'

import Image from "next/image"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza"
import { Button } from "@/components/ui/button"
import { TOKEN_MAP } from "@/lib/tokens"
import TokenSelector from "."
import { Token } from "@/lib/types"

const TokenSelectorModal = () => {
  const [open, setOpen] = useState(false)
  const [selectedToken, setSelectedToken] = useState<Token>(TOKEN_MAP[1][0]);

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button size="xl" className="gap-1 rounded-full">
          <Image src={selectedToken.image} alt={selectedToken.symbol} width={30} height={30} />
          <span className="text-lg font-bold">
            {selectedToken.symbol}
          </span>
          <ChevronDown />
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className="grid-rows-[auto_24rem_auto] md:gap-8 md:max-w-sm">
        <CredenzaHeader>
          <CredenzaTitle>Select token</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <TokenSelector tokens={TOKEN_MAP[1]} setSelectedToken={setSelectedToken} setOpen={setOpen} />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  )
}

export default TokenSelectorModal
