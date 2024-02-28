import { useLocation } from "react-router-dom";
import Breadcrump from "../../components/breadcrump/Breadcrump";
import CurrencyConverter from "../../components/conversion-panel/ConversionPanel";
import { Currency, useConverter } from "../../contexts/Converter.context";

export default function Details() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { setFromCurrency, setToCurrency, fromCurrency, getFromCurrencyText } =
    useConverter();

  const title = `${fromCurrency} - ${getFromCurrencyText()}`;
  const fromVal = queryParams.get("from");
  const toVal = queryParams.get("to");

  if (fromVal && toVal) {
    setFromCurrency(fromVal as Currency);
    setToCurrency(toVal as Currency);
  }

  return (
    <div>
      <Breadcrump title={title} />
      <CurrencyConverter isViewMode={true} />
      <div className="w-full max-w-lg mx-auto mt-5 p-20  border-2">
        <h2 className="text-2xl text-gray-400">Currency chart History</h2>
      </div>
    </div>
  );
}
