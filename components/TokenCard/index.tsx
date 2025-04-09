import TokenSelector from "./TokenSelector";

const TokenCard = () => {
  return (
    <article className="flex flex-col gap-1 bg-card border border-border rounded-card p-10">
      <div className="text-lg font-medium opacity-40">
        Amount to deposit
      </div>
      <div className="flex justify-between items-center gap-12">
        <TokenSelector />
        <div className="flex flex-col w-full text-right">
          <input
            type="number"
            className="number-input w-full outline-none bg-transparent text-right text-5xl font-semibold leading-none"
            defaultValue={0}
          />
          <div className="text-sm font-medium opacity-40">
            $10.0
          </div>
        </div>
      </div>
      <div className="text-sm font-medium opacity-40">
        Balance 1.830 USDT (≈ $1,830.29)
      </div>
    </article>
  )
}

export default TokenCard;
