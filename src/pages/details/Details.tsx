import Breadcrump from "../../components/breadcrump/Breadcrump";
import CurrencyConverter from "../../components/conversion-panel/ConversionPanel";
import { useConverter } from "../../contexts/Converter.context";

export default function Details() {
  const { toCurrency, getFromCurrencyText } = useConverter();

  const title = `${toCurrency} - ${getFromCurrencyText()}`;

  return (
    <div>
      <Breadcrump title={title} />
      <CurrencyConverter />
      <div className="w-full max-w-lg mx-auto mt-5 p-20  border-2">
        <h2 className="text-2xl text-gray-400">Currency chart History</h2>
      </div>
    </div>
  );
}
