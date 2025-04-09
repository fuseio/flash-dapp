'use client'

import { DynamicContextProvider, DynamicUserProfile, mergeNetworks } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'

import { config, evmNetworks } from '@/lib/wagmi'
import { NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID } from "@/lib/config";

type Props = {
  children: ReactNode,
}

export function Providers({ children }: Props) {
  const queryClient = new QueryClient();

  return (
    <DynamicContextProvider
      settings={{
        environmentId: NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID,
        walletConnectors: [EthereumWalletConnectors],
        overrides: {
          evmNetworks: (networks) => mergeNetworks(evmNetworks, networks)
        },
        initialAuthenticationMode: 'connect-only',
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <DynamicUserProfile />
            {children}
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  )
}
