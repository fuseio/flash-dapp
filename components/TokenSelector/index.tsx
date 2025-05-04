import Image from "next/image";

import { Token } from "@/lib/types";
import { Button } from "../ui/button";
import { useTokenSelector } from "@/hooks/useToken";
import useUser from "@/hooks/useUser";
import { Skeleton } from "../ui/skeleton";

type TokenSelectorProps = {
  tokens: Token[];
  setSelectedToken: (token: Token) => void;
  setOpen?: (open: boolean) => void;
}

const TokenSelector = ({ tokens, setSelectedToken, setOpen }: TokenSelectorProps) => {
  const { user } = useUser();
  const { tokensWithBalance } = useTokenSelector({ tokens, safeAddress: user?.safeAddress });

  const handleTokenClick = (token: Token) => {
    setSelectedToken(token);
    setOpen?.(false);
  }

  return (
    <div className="flex flex-col gap-2.5">
      {tokensWithBalance.map((token) => (
        <Button
          key={token.address}
          className="bg-primary/10 border-primary/0 text-foreground w-full h-16 rounded-2xl justify-between hover:border-primary/10"
          disabled={token.isComingSoon}
          onClick={() => handleTokenClick(token)}
        >
          <div className="flex items-center gap-2">
            <Image src={token.image} alt={token.name} width={34} height={34} />
            <div className="flex flex-col items-start gap-0.5">
              <div className="text-lg leading-none font-bold">{token.name}</div>
              <div className="text-sm leading-none opacity-40">On ethereum</div>
            </div>
          </div>
          {token.isComingSoon ? (
            <div>Coming soon</div>
          ) : (
            <div className="flex flex-col items-end gap-0.5">
              {token.balanceUSD ?
                <div className="text-lg leading-none font-bold">${token.balanceUSD < 0.001 ? "<0.001" : token.balanceUSD.toFixed(3)}</div> :
                <Skeleton className="w-16 h-5" />
              }
              {token.balance ?
                <div className="text-sm leading-none opacity-40">{token.balance < 0.001 ? "<0.001" : token.balance.toFixed(3)}</div> :
                <Skeleton className="w-16 h-3.5" />
              }
            </div>
          )}
        </Button>
      ))}
    </div>
  )
}

export default TokenSelector;
