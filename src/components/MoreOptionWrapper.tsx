import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClose: Function;
};

const MoreOptionWrapper = ({ children, onClose }: Props) => {
  return (
    <div className="p-3 pb-5 flex justify-between mb-100">
      <div className="main flex gap-10 justify-start p-4 items-center w-3/4">
        {" "}
        <label>Filter by status</label>
        {children}
      </div>

      <div
        onClick={() => onClose()}
        id="close-btn"
        className="h-[34px] font-mono text-3xl font-semibold text-gray-400 p-1.5 hover:text-black-700 hover:bg-white rounded-lg text-center align-middle leading-4 cursor-pointer"
      >
        &times;
      </div>
    </div>
  );
};

export default MoreOptionWrapper;
