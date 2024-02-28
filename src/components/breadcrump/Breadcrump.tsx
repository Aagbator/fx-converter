import React from "react";
import { Link, useMatch } from "react-router-dom";

interface BreadcrumpProps {
  title: string;
}

const Breadcrump: React.FC<BreadcrumpProps> = ({ title }) => {
  const showBackBtn = !useMatch("/");

  return (
    <nav className="flex justify-between p-2">
      <Link className="text-xl items-center capitalize font-bold" to="/">
        {title}
      </Link>
      {showBackBtn && (
        <Link className="btn" to="/">
          Back to Home
        </Link>
      )}
    </nav>
  );
};

export default Breadcrump;
