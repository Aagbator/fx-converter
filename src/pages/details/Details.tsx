import React from "react";
import Breadcrump from "../../components/breadcrump/Breadcrump";
import CurrencyConverter from "../../components/conversion-panel/ConversionPanel";
import CurrencyGrid from "../../components/conversion-grid/ConversionGrid";
import { useConverter } from "../../contexts/Converter.context";

export default function Details() {
  const { toCurrency, getFromCurrencyText } = useConverter();

  const title = `${toCurrency} - ${getFromCurrencyText()}`;

  return (
    <div>
      <Breadcrump title={title} />
      <CurrencyConverter />
      <CurrencyGrid />
    </div>
  );
}
