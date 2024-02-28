import React, { createContext, useContext, useEffect, useState } from "react";

export type Currency =
  | "USD"
  | "EUR"
  | "JPY"
  | "GBP"
  | "AUD"
  | "CAD"
  | "CHF"
  | "CNY"
  | "HKD"
  | "NZD";

type CurrencyRates = {
  [currencyCode in Currency]: number;
};

type CurrencySymbol = {
  [currencyCode in Currency]: string;
};

interface ConverterContextType {
  currencies: string[];
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  currencyRates: CurrencyRates | undefined;
  convertedAmount: number | undefined;
  setAmount: (newAmount: number) => void;
  setFromCurrency: (newFromCurrency: Currency) => void;
  setToCurrency: (newToCurrency: Currency) => void;
  swapCurrencies: () => void;
  getFromCurrencyText: () => string;
  getToCurrencyExchangeRate: () => number | undefined;
  convertCurrency: () => void;
}

const ConverterContext = createContext<ConverterContextType>({
  currencies: [],
  amount: 1,
  fromCurrency: "EUR",
  toCurrency: "USD",
  currencyRates: undefined,
  convertedAmount: undefined,
  setAmount: () => {},
  setFromCurrency: () => {},
  setToCurrency: () => {},
  swapCurrencies: () => {},
  getFromCurrencyText: () => "",
  getToCurrencyExchangeRate: () => undefined,
  convertCurrency: () => {},
});

export const useConverter = () =>
  useContext<ConverterContextType>(ConverterContext);

export const ConverterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currencyRates, setCurrencyRates] = useState<CurrencyRates>();
  const [currencySymbols, setCurrencySymbols] = useState<CurrencySymbol>();
  const [amount, setAmount] = useState<number>(1);
  const [convertedAmount, setConvertedAmount] = useState<number>();
  const [fromCurrency, setFromCurrency] = useState<Currency>("EUR");
  const [toCurrency, setToCurrency] = useState<Currency>("USD");

  const currencies: Currency[] = [
    "EUR",
    "USD",
    "JPY",
    "GBP",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "HKD",
    "NZD",
  ];

  const baseUrl = "http://data.fixer.io/api/";
  const currencyStr = currencies.join(",");

  useEffect(() => {
    const fetchCurrencySymbols = async () => {
      try {
        const currencyParams = currencies.join(",");
        const symbolResponse = await fetch(
          `${baseUrl}symbols?access_key=${process.env.REACT_APP_FIXER_ACCESS_KEY}&symbols=${currencyParams}`
        );
        const symbolJson = await symbolResponse.json();
        setCurrencySymbols(symbolJson.symbols);
      } catch (error) {
        console.error("Error fetching currency symbols:", error);
      }
    };

    fetchCurrencySymbols();
  }, []);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const ratesResponse = await fetch(
          `${baseUrl}latest?access_key=${process.env.REACT_APP_FIXER_ACCESS_KEY}&base=${fromCurrency}&symbols=${currencyStr}`
        );
        const ratesJson: { rates: CurrencyRates } = await ratesResponse.json();
        console.log(ratesJson.rates);
        setCurrencyRates(ratesJson.rates);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, [fromCurrency]);

  const swapCurrencies = (): void => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getFromCurrencyText = (): string => {
    return currencySymbols ? currencySymbols[fromCurrency] : "";
  };

  const getToCurrencyExchangeRate = (): number | undefined => {
    return currencyRates ? currencyRates[toCurrency] : undefined;
  };

  const convertCurrency = (): void => {
    if (!!getToCurrencyExchangeRate()) {
      const convertedAmount = amount * getToCurrencyExchangeRate()!;
      setConvertedAmount(convertedAmount);
    }
  }

  return (
    <ConverterContext.Provider
      value={{
        currencies,
        currencyRates,
        amount,
        fromCurrency,
        toCurrency,
        convertedAmount,
        setAmount,
        setFromCurrency,
        setToCurrency,
        swapCurrencies,
        getFromCurrencyText,
        getToCurrencyExchangeRate,
        convertCurrency,
      }}
    >
      {children}
    </ConverterContext.Provider>
  );
};

export default ConverterContext;
