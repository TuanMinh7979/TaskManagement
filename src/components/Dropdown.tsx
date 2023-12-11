import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import useDetectOutsideClick from "../customHooks/useDetectOutsideClick";
import DropDownContent from "./DropDownContent";
type ListItem = {
  id: string;
  text: string;
};
type Props = {
  value: string;
  handleOnSelect: Function;
  list: ListItem[];
  contentStyleClass?: string;
  chooseButtonStyleClass?: string;
};



const Dropdown = ({
  value,
  list,
  handleOnSelect,
  contentStyleClass,
  chooseButtonStyleClass, 
  
}: Props) => {
  const inputRef = useRef<any>();
  // const [valueState, setValueState] = useState(value);
  const [isActive, setIsActive] = useDetectOutsideClick(
    inputRef,
    false,
    "dropdown-item"
  );
  return (
    <>
      <div
        ref={inputRef}
        className="relative w-1/6  top-0 z-[1000]  block text-left"
      >
        <button
        className={`inline-flex w-full justify-center mr-2 gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 ${chooseButtonStyleClass}`}
          onClick={(event) => {
            event.stopPropagation();
            setIsActive(!isActive);
          }}
          type="button"
     
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {value || "Doing"}
        </button>
        
      </div>
      {isActive && (
        <DropDownContent
          contentStyleClass={contentStyleClass}
     
          list={list}
          onSelect={(el: any) => {
            // setValueState(el);
            handleOnSelect(el);
          }}
        />
      )}
    </>
  );
};

export default Dropdown;
