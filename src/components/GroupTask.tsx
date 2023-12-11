import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Icon from "./Icon";

import {
  collapseAllTask,
  defaultTask,
  taskGroupSwitchEditMode,
} from "../redux/taskListSlice";
import { RxDotsVertical } from "react-icons/rx";
import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdKeyboardArrowDown,
  MdSave,
} from "react-icons/md";

import Tasks from "./Tasks";
import taskListSlice, {
  addTask,
  deleteTaskGroup,
  saveTaskGroupTitle,
} from "../redux/taskListSlice";
import Dropdown from "./Dropdown";
import DropDownContent from "./DropDownContent";
import MoreOptionWrapper from "./MoreOptionWrapper";
import { TaskType } from "../Types";
import { generateId } from "../utils/generates";
import { validateGroupTask } from "../utils/validate";
import { toast } from "react-toastify";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
type SingleTaskListPropTypes = {
  singleTaskList: any;
};

const GroupTask = ({ singleTaskList }: SingleTaskListPropTypes) => {
  const { id, editMode, tasks = [], title } = singleTaskList;
  const [homeTitle, setHomeTitle] = useState(title);
  const [allCollapsed, setAllCollapsed] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [moreOptions, setMoreOptions] = useState({
    showFilter: false,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    const checkAllCollapsed = () => {
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (!task.collapsed) return setAllCollapsed(false);
      }
      return setAllCollapsed(true);
    };
    checkAllCollapsed();
  }, [tasks]);

  const handleSaveTaskListTitle = () => {
    const errorArray = validateGroupTask({ title: homeTitle });
    if (errorArray.length > 0) {
      return toast.error(errorArray.join("\n"));
    }

    dispatch(saveTaskGroupTitle({ id, title: homeTitle }));
  };

  const handleDelete = () => {
    dispatch(deleteTaskGroup({ listId: id }));
  };

  const handleAddTask = () => {
    let newId = generateId();
    dispatch(addTask({ listId: id, newTask: { id: newId, ...defaultTask } }));
  };

  const handleCollapseClick = () => {
    if (allCollapsed) {
      // if they're all collpased then uncollapse them
      return dispatch(collapseAllTask({ listId: id, value: false }));
    }

    return dispatch(collapseAllTask({ listId: id }));
  };

  const [filteredTasks, setFilteredTask] = useState([...tasks]);
  // more options
  const [filterStatusValue, setFilterStatusValue] = useState("All");
  // -- more options

  useEffect(() => {
    if (filteredTasks && filterStatusValue !== "All") {
      setFilteredTask(
        tasks.filter((el: TaskType) => el.status === filterStatusValue)
      );
    } else {
      setFilteredTask([...tasks]);
    }
  }, [filterStatusValue, tasks]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: singleTaskList.id, data: { ...singleTaskList } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className=" group-task" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="task-list">
        <div className="bg-[#d3f0f9] w-full md:w-[500px] drop-shadow-md rounded-md min-h-[150px] overflow-hidden">
          <div className="flex flex-wrap items-center justify-center md:gap-5 sm:gap-10 bg-gradient-to-tr from-myBlue to-myPink bg-opacity-70 p-3 text-white text-center">
            {editMode ? (
              <>
                {" "}
                <input
                  value={homeTitle}
                  onChange={(e) => setHomeTitle(e.target.value)}
                  className="flex-1 bg-transparent placeholder-gray-300 px-3 py-1 border-[1px] border-white rounded-md"
                  placeholder="Enter task group title"
                />
              </>
            ) : (
              <p className="flex-1 text-left md:text-center">{title}</p>
            )}

            <div>
              <Icon
                id={id}
                IconName={editMode ? MdSave : MdEdit}
                onClick={() => {
                  return editMode
                    ? handleSaveTaskListTitle()
                    : dispatch(taskGroupSwitchEditMode({ id }));
                }}
                loading={false}
              />
              <Icon
                onClick={handleDelete}
                IconName={MdDelete}
                loading={false}
              />
              <Icon
                onClick={handleCollapseClick}
                IconName={MdKeyboardArrowDown}
                className={`${allCollapsed ? "rotate-180" : "rotate-0"}`}
              />
              <Icon
                onClick={() => setShowMoreOptions(!showMoreOptions)}
                IconName={RxDotsVertical}
              />

              {showMoreOptions && (
                <DropDownContent
                  contentStyleClass="right-[0px] w-[100px]"
                  list={[{ text: "Show filter", id: "showFilter" }]}
                  onSelect={(value: string) => {
                    setMoreOptions({ ...moreOptions, [value]: true });
                    setShowMoreOptions(false);
                  }}
                />
              )}
            </div>
          </div>

          {moreOptions?.showFilter && (
            <MoreOptionWrapper
              onClose={() => {
                setMoreOptions({ ...moreOptions, showFilter: false });
                setFilterStatusValue("All");
              }}
            >
              <Dropdown
                contentStyleClass="mr-[6%] mt-[50px]"
                chooseButtonStyleClass="w-[200px]"
                list={[
                  { text: "All", id: "All" },
                  { text: "Pending", id: "Pending" },
                  { text: "Doing", id: "Doing" },
                  { text: "Completed", id: "Completed" },
                ]}
                value={filterStatusValue}
                handleOnSelect={(value: string) => {
                  setFilterStatusValue(value);
                }}
              />
            </MoreOptionWrapper>
          )}
          {id && <Tasks tasks={filteredTasks || []} listId={id} />}
        </div>
        <Icon
          onClick={handleAddTask}
          IconName={MdAdd}
          className="absolute -mt-6 -ml-4 p-3 drop-shadow-lg"
          reduceOpacityOnHover={false}
          loading={false}
        />
      </div>
    </div>
  );
};

export default GroupTask;
