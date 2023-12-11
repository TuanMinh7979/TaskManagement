import React from "react";

type Props = {
  list: ListItem[];
  onSelect: Function;
  contentStyleClass?:string

};

type ListItem = {
  id: string;
  text: string;
 
};

const DropDownContent = ({ list, onSelect , contentStyleClass }: Props) => {
  return (
    <div
      className={`right-[-85px] w-56  absolute z-[1001]   mb-20    rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${contentStyleClass}`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
    >
      <div className="py-1" role="none">
        {list.length &&
          list.map((el: any) => (
            <button
              onClick={(event) => {
                event.stopPropagation();
                onSelect(el.id);
              }}
              className={`dropdown-item rounded  text-start  w-full  hover:bg-blue-200 text-gray-700 block px-4 py-2 text-sm }`}
              id="menu-item-0"
            >
              {el.text}
            </button>
          ))}
      </div>
    </div>
  );
};

export default DropDownContent;
