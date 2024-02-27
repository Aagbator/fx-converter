import React from "react";
import { Link } from "react-router-dom";

const NavigationBar: React.FC = () => {
  return (
    <nav className="flex justify-between p-2">
      <Link className="text-xl items-center capitalize font-bold" to="/">
        FX Converter
      </Link>
      <ul className="flex space-x-2">
        <li className="border-gray-900 border-2 p-2 font-semibold">
          <Link to="/euro-usd-details">EUR - USD details</Link>
        </li>
        <li className="border-gray-900 border-2 p-2 font-semibold">
          <Link to="/euro-gbp-details">EUR - GBP details</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
