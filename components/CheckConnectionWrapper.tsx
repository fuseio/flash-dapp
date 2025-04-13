import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useAccount, useSwitchChain } from 'wagmi';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CheckConnectionWrapperProps = {
  children: React.ReactNode;
  chainId?: number;
  className?: string;
  props?: React.ComponentProps<"button"> | any;
}

export const CheckConnectionWrapper = ({ children, chainId, className, props }: CheckConnectionWrapperProps) => {
  const { sdkHasLoaded, setShowAuthFlow } = useDynamicContext();
  const { chain, isConnected } = useAccount();
  const { chains, switchChain } = useSwitchChain()
  const selectedChain = chains.find((c) => c.id === chainId)

  if (!sdkHasLoaded) {
    return (
      <Button className={cn("animate-pulse", className)} disabled {...props} />
    );
  }

  if (!isConnected) {
    return (
      <Button className={className} onClick={() => setShowAuthFlow(true)} {...props}>
        Connect Wallet
      </Button>
    );
  }

  if (isConnected && chainId && (!chain || chain.id !== chainId)) {
    return (
      <Button className={className} onClick={() => switchChain({ chainId })} {...props}>
        Switch to {selectedChain?.name}
      </Button>
    );
  }

  return children;
};
