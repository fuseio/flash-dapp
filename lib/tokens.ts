import { mainnet } from "viem/chains";

import { ADDRESSES } from "./config";
import { TokenMap } from "./types";

export const TOKEN_MAP: TokenMap = {
  [mainnet.id]: [
    {
      name: "WETH",
      address: ADDRESSES.ethereum.weth,
      symbol: "WETH",
      decimals: 18,
      image: "/eth.svg",
      coingeckoId: "weth",
    },
    {
      name: "USDC",
      address: ADDRESSES.ethereum.usdc,
      symbol: "USDC",
      decimals: 6,
      image: "/usdc.svg",
      coingeckoId: "usd-coin",
      isComingSoon: true,
    },
    {
      name: "USDT",
      address: ADDRESSES.ethereum.usdt,
      symbol: "USDT",
      decimals: 6,
      image: "/usdt.svg",
      coingeckoId: "tether",
      isComingSoon: true,
    },
    {
      name: "USDS",
      address: ADDRESSES.ethereum.usds,
      symbol: "USDS",
      decimals: 18,
      image: "/usds.svg",
      coingeckoId: "usds",
      isComingSoon: true,
    }
  ],
}
