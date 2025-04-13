import { Address } from "viem";

type ADDRESSES = {
  ethereum: {
    teller: Address;
    weth: Address;
  }
}

export const ADDRESSES: ADDRESSES = {
  ethereum: {
    teller: "0xc17Ee998335741D930D12F33581E0Ea42501Beec",
    weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  }
};

export const GENERATE_SOURCEMAP = process.env.GENERATE_SOURCEMAP ?? ""
export const NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ""
export const NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID = process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID ?? ""
export const NEXT_PUBLIC_ETHEREUM_API_KEY = process.env.NEXT_PUBLIC_ETHEREUM_API_KEY ?? ""
export const NEXT_PUBLIC_COIN_GECKO_API_KEY = process.env.NEXT_PUBLIC_COIN_GECKO_API_KEY ?? ""
