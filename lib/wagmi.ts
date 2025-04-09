import { createClient } from 'viem';
import {
  createConfig,
  http,
} from 'wagmi'
import { Chain, fuse } from 'wagmi/chains'

const chains: readonly [Chain, ...Chain[]] = [
  fuse,
]

const transports: Record<number, ReturnType<typeof http>> = {
  [fuse.id]: http(),
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
