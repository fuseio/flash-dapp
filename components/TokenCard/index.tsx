import { Skeleton } from "@/components/ui/skeleton";
import TokenSelectorModal from "../TokenSelector/TokenSelectorModal";
import { compactNumberFormat } from "@/lib/utils";

interface TokenCardProps {
  amount: string;
  onAmountChange: (value: string) => void;
  balance: string;
  price: number | undefined;
}

const TokenCard = ({ amount, onAmountChange, balance, price }: TokenCardProps) => {
  return (
    <article className="flex flex-col gap-2 md:gap-1 bg-card border rounded-twice p-6 md:p-10">
      <div className="text-lg font-medium opacity-40">
        Amount to deposit
      </div>
      <div className="flex justify-between items-center gap-4 md:gap-12">
        <TokenSelectorModal />
        <div className="flex flex-col w-full text-right">
          <input
            type="number"
            className="number-input w-full outline-none bg-transparent text-right text-2xl md:text-5xl font-semibold leading-none"
            value={amount}
            placeholder="0"
            onChange={(e) => onAmountChange(e.target.value)}
          />
          <div className="flex self-end text-sm font-medium opacity-40">
            {price ?
              `$${compactNumberFormat(Number(amount) * price)}` :
              <Skeleton className="w-20 h-5 rounded-sm" />
            }
          </div>
        </div>
      </div>
      <div className="text-sm font-medium opacity-40">
        {price ?
          `Balance ${balance} USDC (≈ $${compactNumberFormat(Number(balance) * price)})` :
          <Skeleton className="w-40 h-5 rounded-sm" />
        }
      </div>
    </article>
  )
}

export default TokenCard;
