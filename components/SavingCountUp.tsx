import { useState, useEffect } from 'react';

interface SavingCountUpProps {
  balance: number;
  apy: number;
  lastTimestamp: number;
}

const SECONDS_PER_YEAR = 31_557_600;

const SavingCountUp = ({ balance, apy, lastTimestamp }: SavingCountUpProps) => {
  const [liveYield, setLiveYield] = useState<number>(0);

  const calculateLiveYield = (currentTime: number) => {
    const deltaTime = currentTime - lastTimestamp;
    const yieldEarned = balance * (apy / SECONDS_PER_YEAR) * deltaTime;
    return yieldEarned;
  };

  useEffect(() => {
    const updateYield = () => {
      const now = Math.floor(Date.now() / 1000);
      setLiveYield(calculateLiveYield(now));
    };

    updateYield();

    const interval = setInterval(updateYield, 1000);
    return () => clearInterval(interval);
  }, [balance, apy, lastTimestamp]);

  const wholeNumber = Math.floor(liveYield);
  const decimalPart = (liveYield - wholeNumber).toFixed(7).slice(1);

  return (
    <div>
      <span className="text-4xl md:text-8xl font-medium">{wholeNumber}</span>
      <span className="text-2xl md:text-h1 font-medium">{decimalPart}</span>
    </div>
  );
};

export default SavingCountUp;
