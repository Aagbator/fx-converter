import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../../components/navigation-bar/NavigationBar";

export const Layout: React.FC = () => {
  return (
    <div className="relative flex flex-col grow min-w-0 min-h-screen h-screen">
      <NavigationBar />
      <Outlet />
    </div>
  );
};
