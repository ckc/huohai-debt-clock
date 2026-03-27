import React, { useEffect, useState, useRef } from "react";

type Base = {
  principal: number;
  accrued: number;
  rate: number;
  lastUpdate: string;
};

export default function DebtClock() {
  const [base, setBase] = useState<Base>({
    principal: 10000,
    accrued: 0,
    rate: 0.12,
    lastUpdate: new Date().toISOString(),
  });

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setBase((b) => {
        const now = new Date().toISOString();
        const increment = (b.principal * b.rate) / 365 / 24 / 3600;
        return {
          ...b,
          accrued: b.accrued + increment,
          lastUpdate: now,
        };
      });
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Debt Clock</h2>
      <div>
        <strong>Principal:</strong> ${base.principal.toLocaleString()}
      </div>
      <div>
        <strong>Accrued:</strong> ${base.accrued.toFixed(2)}
      </div>
      <div>
        <strong>Rate:</strong> {(base.rate * 100).toFixed(2)}%
      </div>
      <div>
        <small>Last update: {new Date(base.lastUpdate).toLocaleString()}</small>
      </div>
    </div>
  );
}
