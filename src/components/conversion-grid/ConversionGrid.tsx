import React from "react";
import { useConverter } from "../../contexts/Converter.context";

type CurrencyRatesObject = {
  currency: string;
  rate: number;
};

const CurrencyGrid: React.FC = () => {
  const { currencyRates, amount } = useConverter();

  const arrayOfCurrencyRates: CurrencyRatesObject[] = Object.entries(
    currencyRates || []
  ).map(([currency, rate]) => ({
    currency,
    rate,
  }));

  return (
    <div className="currency-grid">
      {arrayOfCurrencyRates.map(({ currency, rate }, i) => {
        return (
          <div
            key={currency + i}
            className="w-1/3 border-2 border-gray-200 rounded-lg bg-white p-5"
          >
            <h3 className="font-bold">{currency}</h3>
            <p>{rate * amount}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CurrencyGrid;
