import { createClient } from 'viem';
import {
  createConfig,
  http,
} from 'wagmi'
import { Chain, fuse, mainnet } from 'wagmi/chains'

import { NEXT_PUBLIC_ETHEREUM_API_KEY } from './config';

const chains: readonly [Chain, ...Chain[]] = [
  fuse,
  mainnet,
]

const transports: Record<number, ReturnType<typeof http>> = {
  [fuse.id]: http(),
  [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${NEXT_PUBLIC_ETHEREUM_API_KEY}`),
}

export const config = createConfig({
  chains,
  multiInjectedProviderDiscovery: false,
  ssr: true,
  client({ chain }) {
    return createClient({
      chain,
      transport: transports[chain.id],
    });
  },
});

export const evmNetworks = chains.map(chain => ({
  blockExplorerUrls: [chain.blockExplorers?.default?.apiUrl],
  chainId: chain.id,
  chainName: chain.name,
  iconUrls: ['/fuse.svg'],
  name: chain.name,
  nativeCurrency: {
    decimals: chain.nativeCurrency.decimals,
    name: chain.nativeCurrency.name,
    symbol: chain.nativeCurrency.symbol,
  },
  networkId: chain.id,
  rpcUrls: [...chain.rpcUrls.default.http],
  vanityName: chain.name,
})).map(network => ({
  ...network,
  blockExplorerUrls: network.blockExplorerUrls.filter((url): url is string => !!url)
}));
