import { Address } from "viem";
import { mainnet } from "viem/chains";

type ADDRESSES = {
  ethereum: {
    teller: Address;
    weth: Address;
    usdc: Address;
    usdt: Address;
    usds: Address;
    nativeFeeToken: Address;
    vault: Address;
  }
  fuse: {
    vault: Address;
  }
}

export const ADDRESSES: ADDRESSES = {
  ethereum: {
    teller: "0xf2bFC2C7c36560279b97F553a2480B59965e9eC0",
    weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    usdt: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    usds: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    nativeFeeToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    vault: "0x3e2cD0AeF639CD72Aff864b85acD5c07E2c5e3FA",
  },
  fuse: {
    vault: "0x740636B7e6E6F6a4FD80A8781CfD3AA993821C1D"
  }
};

export const GENERATE_SOURCEMAP = process.env.GENERATE_SOURCEMAP ?? ""
export const NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ""
export const NEXT_PUBLIC_ETHEREUM_API_KEY = process.env.NEXT_PUBLIC_ETHEREUM_API_KEY ?? ""
export const NEXT_PUBLIC_COIN_GECKO_API_KEY = process.env.NEXT_PUBLIC_COIN_GECKO_API_KEY ?? ""
export const NEXT_PUBLIC_PIMLICO_API_KEY = process.env.NEXT_PUBLIC_PIMLICO_API_KEY ?? ""
export const NEXT_PUBLIC_FLASH_API_BASE_URL = process.env.NEXT_PUBLIC_FLASH_API_BASE_URL ?? ""
export const NEXT_PUBLIC_FLASH_ANALYTICS_API_BASE_URL = process.env.NEXT_PUBLIC_FLASH_ANALYTICS_API_BASE_URL ?? ""

export const USER = {
  storageKey: 'flash_user',
  passkeyStorageKey: 'flash_passkey_list',
  pimlicoUrl: `https://api.pimlico.io/v2/${mainnet.id}/rpc?apikey=${NEXT_PUBLIC_PIMLICO_API_KEY}`,
}
