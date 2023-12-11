import React, { useState } from "react";
import Button from "./Button";
import Icon from "./Icon";
import { MdAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addTaskGroup } from "../redux/taskListSlice";
import { generateId } from "../utils/generates";

const AddListBoard = () => {
  const [addLoading, setAddLoading] = useState(false);
  const dispatch = useDispatch();

  const handleAddTaskList = () => {
    setAddLoading(true);
    let newId= generateId()
    dispatch(
      addTaskGroup({
        id: newId, 
        editMode: false,
        tasks: [],
        title: '',
      })
    );
    setAddLoading(false);
  };

  return (
    <>
      <Button
        text="Add New Task Group"
        onClick={handleAddTaskList}
        className="hidden md:flex"
        loading={addLoading}
        
      />
      <Icon
        onClick={handleAddTaskList}
        IconName={MdAdd}
        className="block md:hidden"
        loading={addLoading}
        reduceOpacityOnHover={false}
      />
    </>
  );
};

export default AddListBoard;
