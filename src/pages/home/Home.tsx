import React from "react";
import Breadcrump from "../../components/breadcrump/Breadcrump";
import CurrencyConverter from "../../components/conversion-panel/ConversionPanel";

export default function Home() {
  return (
    <div>
      <Breadcrump title="Currency Exchanger" />
      <CurrencyConverter />
    </div>
  );
}
