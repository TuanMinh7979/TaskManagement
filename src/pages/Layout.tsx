import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";


type Props = {};

function Layout({}: Props) {
  return (
    <div className="h-[100vh] flex flex-col">
      <Header />
      <div className="bg-pattern bg-no-repeat w-full bg-cover flex-1 max-h-[100%] overflow-y-scroll">
        <Outlet />
      </div>

    </div>
  );
}

export default Layout;
