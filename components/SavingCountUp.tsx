import { useState, useEffect, useRef } from 'react';
import { useCountUp } from 'react-countup';

const SavingCountUp = () => {
  const [saving, setSaving] = useState(10000.9462136);
  const wholeNumberRef = useRef<HTMLElement>(null!);
  const decimalRef = useRef<HTMLElement>(null!);
  const decimalCount = Number((saving % 1).toFixed(7).split('.')[1])

  const { start: startWhole } = useCountUp({
    ref: wholeNumberRef,
    start: Math.trunc(saving),
    end: Math.trunc(saving),
    duration: 0.1,
  });

  const { start: startDecimal } = useCountUp({
    ref: decimalRef,
    start: decimalCount,
    end: decimalCount,
    duration: 0.1,
    separator: '',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSaving(prev => Number((prev + 0.0000001).toFixed(7)));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    startWhole();
    startDecimal();
  }, [saving, startWhole, startDecimal]);

  return (
    <div>
      <span ref={wholeNumberRef} className="text-8xl font-medium" />
      <span className="text-h1 font-medium">.</span>
      <span ref={decimalRef} className="text-h1 font-medium" />
    </div>
  );
};

export default SavingCountUp;
