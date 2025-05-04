import { Address, formatEther } from "viem";
import { mainnet } from "viem/chains";
import { useReadContract } from "wagmi";
import { useQuery } from "@tanstack/react-query";

import { Token } from "@/lib/types";
import ERC20_ABI from "@/lib/abis/ERC20";
import { fetchTokenPriceUsd } from "@/lib/api";

type TokenSelectorProps = {
  tokens: Token[];
  safeAddress?: Address;
}

export const useTokenPriceUsd = (tokenId: string) => {
  return useQuery({
    queryKey: ["tokenPriceUsd", tokenId],
    queryFn: () => fetchTokenPriceUsd(tokenId),
    enabled: !!tokenId
  });
};

export const useTokenSelector = ({ tokens, safeAddress }: TokenSelectorProps) => {
  const tokensWithBalance = tokens.map(token => {
    const { data: balance } = useReadContract({
      abi: ERC20_ABI,
      address: token.address,
      functionName: "balanceOf",
      args: [safeAddress as Address],
      chainId: mainnet.id,
      query: {
        enabled: !!safeAddress,
      },
    });

    const { data: price } = useTokenPriceUsd(token.coingeckoId);

    return {
      ...token,
      balance: balance ? Number(formatEther(balance)) : 0,
      balanceUSD: balance && price ? Number(formatEther(balance)) * price : 0
    };
  });

  return {
    tokensWithBalance
  };
};
