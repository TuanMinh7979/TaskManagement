import React from "react";
import AddListBoard from "./AddListBoard";
import Button from "./Button";

type Props = {};

function Header({}: Props) {
  return (
    <div className="flex flex-wrap z-10 sm:flex-row gap-5 items-center justify-between drop-shadow-md bg-gradient-to-r from-myBlue to-myPink px-5 py-5 md:py-2 text-white">
      <h1>TODO APP</h1>
     
      <AddListBoard />
    </div>
  );
}

export default Header;
