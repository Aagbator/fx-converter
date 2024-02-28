import React, { createContext, useContext, useEffect, useState } from "react";

type Currency =
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
  currencyRates: CurrencyRates;
  setAmount: (newAmount: number) => void;
  setFromCurrency: (newFromCurrency: Currency) => void;
  setToCurrency: (newToCurrency: Currency) => void;
  swapCurrencies: () => void;
  getFromCurrencyText: () => string;
}

const ConverterContext = createContext<ConverterContextType>({
  currencies: [],
  amount: 1,
  fromCurrency: "EUR",
  toCurrency: "USD",
  currencyRates: {} as CurrencyRates,
  setAmount: () => {},
  setFromCurrency: () => {},
  setToCurrency: () => {},
  swapCurrencies: () => {},
  getFromCurrencyText: () => "",
});

export const useConverter = () =>
  useContext<ConverterContextType>(ConverterContext);

export const ConverterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currencyRates, setCurrencyRates] = useState<CurrencyRates>({
    USD: 1.081625,
    CAD: 1.469036,
    GBP: 0.855143,
    JPY: 162.968416,
    EUR: 1,
    AUD: 234,
    CHF: 102,
    CNY: 192,
    HKD: 200,
    NZD: 345,
  });
  const [currencySymbols, setCurrencySymbols] = useState<CurrencySymbol>({
    AUD: "Australian Dollar",
    CAD: "Canadian Dollar",
    CHF: "Swiss Franc",
    CNY: "Chinese Yuan",
    EUR: "Euro",
    GBP: "British Pound Sterling",
    HKD: "Hong Kong Dollar",
    JPY: "Japanese Yen",
    NZD: "New Zealand Dollar",
    USD: "United States Dollar",
  });
  const [amount, setAmount] = useState<number>(1);
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
    "CNH",
    "HKD",
    "NZD",
  ];

  const baseUrl = "http://data.fixer.io/api/";

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

    //fetchCurrencySymbols();
  }, []);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const ratesResponse = await fetch(
          `${baseUrl}latest?access_key=${process.env.REACT_APP_FIXER_ACCESS_KEY}&symbols=USD,CAD,GBP,JPY,EUR&from=EUR&to=USD,JPY,GBP,AUD,CAD,CHF,CNH,HKD,NZD&amount=1`
        );
        const ratesJson: { rates: CurrencyRates } = await ratesResponse.json();
        setCurrencyRates(ratesJson.rates);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    // fetchCurrencies();
  }, []);

  const swapCurrencies = (): void => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getFromCurrencyText = (): string => {
    return currencySymbols ? currencySymbols[fromCurrency] : "";
  };

  return (
    <ConverterContext.Provider
      value={{
        currencies,
        currencyRates,
        amount,
        fromCurrency,
        toCurrency,
        setAmount,
        setFromCurrency,
        setToCurrency,
        swapCurrencies,
        getFromCurrencyText,
      }}
    >
      {children}
    </ConverterContext.Provider>
  );
};

export default ConverterContext;
