import React from "react";
import Breadcrump from "../../components/breadcrump/Breadcrump";
import CurrencyConverter from "../../components/conversion-panel/ConversionPanel";
import CurrencyGrid from "../../components/conversion-grid/ConversionGrid";

export default function Home() {
  return (
    <div>
      <Breadcrump title="Currency Exchanger" />
      <CurrencyConverter />
      <CurrencyGrid />
    </div>
  );
}
