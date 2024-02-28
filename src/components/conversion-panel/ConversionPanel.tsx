import React from "react";
import { Currency, useConverter } from "../../contexts/Converter.context";

const CurrencyConverter: React.FC = () => {
  const {
    currencies,
    amount,
    fromCurrency,
    toCurrency,
    setAmount,
    setFromCurrency,
    setToCurrency,
    swapCurrencies,
  } = useConverter();

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmount(parseFloat(value));
  };

  const handleFromCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFromCurrency(event.target.value as Currency);
  };

  const handleToCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setToCurrency(event.target.value as Currency);
  };

  const handleCurrencySwap = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    swapCurrencies();
  };
  return (
    <>
      <form className="w-full max-w-lg mx-auto">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="label">Amount</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2 items-center">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="label">From</label>
            <div className="relative">
              <select
                className="select"
                value={fromCurrency}
                onChange={handleFromCurrencyChange}
              >
                {currencies.map((currency, i) => (
                  <option key={currency + i} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <button
              onClick={handleCurrencySwap}
              className="capitalize font-extrabold"
            >
              Swap
            </button>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="label">To</label>
            <div className="relative">
              <select
                className="select"
                value={toCurrency}
                onChange={handleToCurrencyChange}
              >
                {currencies.map((currency, i) => (
                  <option key={currency + i} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap my-5 items-center">
          <button className="w-full btn">Convert</button>
        </div>

        <div className="flex my-5 justify-between items-center">
          <p className="text-sm font-medium">1 EUR - 1 USD</p>
          <p className="mt-2 font-extrabold text-3xl">20.00 USD</p>
          <button className="font-medium text-blue-500 underline hover:text-blue-700">
            More details →
          </button>
        </div>
      </form>
    </>
  );
};

export default CurrencyConverter;
