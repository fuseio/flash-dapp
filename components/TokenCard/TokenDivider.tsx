import { ArrowDown } from "lucide-react";

const TokenDivider = () => {
  return (
    <div className="relative">
      <div className="flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2.5 bg-background border rounded-full">
        <div className="flex items-center justify-center bg-border w-8 h-8 rounded-full">
          <ArrowDown />
        </div>
      </div>
    </div>
  )
}

export default TokenDivider;
