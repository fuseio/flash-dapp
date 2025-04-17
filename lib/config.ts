import { Address } from "viem";
import { mainnet } from "viem/chains";

type ADDRESSES = {
  ethereum: {
    teller: Address;
    weth: Address;
  }
  fuse: {
    vault: Address;
  }
}

export const ADDRESSES: ADDRESSES = {
  ethereum: {
    teller: "0xc17Ee998335741D930D12F33581E0Ea42501Beec",
    weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
  fuse: {
    vault: "0x445395FB71f2Dc65F80F947995af271c25807d88"
  }
};

export const GENERATE_SOURCEMAP = process.env.GENERATE_SOURCEMAP ?? ""
export const NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ""
export const NEXT_PUBLIC_ETHEREUM_API_KEY = process.env.NEXT_PUBLIC_ETHEREUM_API_KEY ?? ""
export const NEXT_PUBLIC_COIN_GECKO_API_KEY = process.env.NEXT_PUBLIC_COIN_GECKO_API_KEY ?? ""
export const NEXT_PUBLIC_PIMLICO_API_KEY = process.env.NEXT_PUBLIC_PIMLICO_API_KEY ?? ""

export const USER = {
  storageKey: 'flash_user',
  passkeyStorageKey: 'flash_passkey_list',
  pimlicoUrl: `https://api.pimlico.io/v2/${mainnet.id}/rpc?apikey=${NEXT_PUBLIC_PIMLICO_API_KEY}`,
}
