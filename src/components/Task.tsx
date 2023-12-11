import React, { forwardRef, useState, useEffect } from "react";
import Icon from "./Icon";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import { TaskType } from "../Types";
import { useDispatch, useSelector } from "react-redux";

import { LuTimer } from "react-icons/lu";
import {
  addTask,
  collapseTask,
  deleteTask,
  saveTask,
  saveTaskStatus,
  taskSwitchEditMode,
} from "../redux/taskListSlice";
import modalSlice, { setModalData, setModalIsShow } from "../redux/modalSlice";
import { RootState } from "../redux/store";
import Dropdown from "./Dropdown";
import { validateTask } from "../utils/validate";
import { toast } from "react-toastify";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TaskType = {
  task: TaskType;
  listId: string;
};

const Task = ({ task, listId }: TaskType) => {
  const { id, title, description, editMode, collapsed, due } = task;
  const [homeTitle, setHomeTitle] = useState(title);
  const [homeDescription, setHomeDescription] = useState(description);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSave = () => {
    const taskData: TaskType = {
      id,
      title: homeTitle,
      description: homeDescription,
    };

    const errorArray = validateTask({
      title: homeTitle,
      description: homeDescription,
    });
    if (errorArray.length > 0) {
      return toast.error(errorArray.join("\n"));
    }
    dispatch(
      saveTask({
        listId,
        ...taskData,
      })
    );
    // save func
  };

  const handleDelete = () => {
    dispatch(deleteTask({ listId, id }));
  };

  const [dueTime, setDueTime] = useState<Date | undefined>(task.due);

  useEffect(() => {
    setDueTime(task.due);
  }, [task.due]);
  const modalStore = useSelector((state: RootState) => state.modal);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task?.id!, data: { ...task } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={{ ...style, zIndex: 1 }}
      {...attributes}
      {...listeners}
      className="task relative  p-2 mb-2 bg-white rounded-md drop-shadow-sm hover:bg-gray-300  "
    >
      <div>
        {editMode ? (
          <div className="flex justify-between items-center">
            <input
              value={homeTitle}
              onChange={(e) => setHomeTitle(e.target.value)}
              className="inline-block w-2/4 border-2 px-2 border-myBlue rounded-sm mb-1"
              placeholder="Task title"
            />

            <Dropdown
              list={[
                { text: "Pending", id: "Pending" },
                { text: "Doing", id: "Doing" },
                { text: "Completed", id: "Completed" },
              ]}
              value={task.status ? task.status : "Doing"}
              handleOnSelect={(value: string) =>
                dispatch(saveTaskStatus({ listId, id, status: value }))
              }
            />
            {dueTime ? (
              <span
                className="inline-block w-1/4 text-[10px] cursor-pointer rounded-full hover:bg-blue-200"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setModalIsShow(!modalStore.isShow));
                  dispatch(setModalData({ listId, id, dueTime: dueTime }));
                }}
              >
                {dueTime?.toLocaleString()}
              </span>
            ) : (
              <div className="w-1/4 items-center flex justify-end">
                {" "}
                <button
                  className="bg-myBlue text-white p-1 rounded-full mb-1 "
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setModalIsShow(!modalStore.isShow));
                    dispatch(setModalData({ listId, id, dueTime: dueTime }));
                  }}
                >
                  <LuTimer />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div
            className="cursor-pointer  flex justify-between items-center"
            onClick={() => dispatch(collapseTask({ listId, id }))}
          >
            <span className=" hover:bg-blue-200 rounded px-1 py-1 block w-2/4">
              {title}
            </span>
            <Dropdown
              list={[
                { text: "Pending", id: "Pending" },
                { text: "Doing", id: "Doing" },
                { text: "Completed", id: "Completed" },
              ]}
              value={task.status ? task.status : "Doing"}
              handleOnSelect={(value: string) =>
                dispatch(saveTaskStatus({ listId, id, status: value }))
              }
            />
            {dueTime ? (
              <span
                className="border-2 block w-1/4 text-[10px] cursor-pointer rounded-full hover:bg-blue-200"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setModalIsShow(!modalStore.isShow));
                  dispatch(setModalData({ listId, id, dueTime: dueTime }));
                }}
              >
                {dueTime?.toLocaleString()}
              </span>
            ) : (
              <div className="w-1/4 items-center flex justify-end">
                {" "}
                <button
                  className="bg-myBlue text-white p-1 rounded-full mb-1 "
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setModalIsShow(!modalStore.isShow));
                    dispatch(setModalData({ listId, id, dueTime: dueTime }));
                  }}
                >
                  <LuTimer />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {!collapsed && (
        // thu lai ==false thi se mo ra
        <div className="mt-1">
          <hr />
          <div className=" flex justify-between">
            {editMode ? (
              <textarea
                onChange={(e) => setHomeDescription(e.target.value)}
                value={homeDescription}
                placeholder="Task Description"
                className="w-full px-3 border-2 border-myBlue rounded-md mt-2"
              />
            ) : (
              <p className="p-2 text-justify">{description}</p>
            )}

            <div className="flex justify-end items-start">
              <Icon
                onClick={() =>
                  editMode
                    ? handleSave()
                    : dispatch(taskSwitchEditMode({ listId, id }))
                }
                IconName={editMode ? MdSave : MdEdit}
                loading={editMode && saveLoading}
                size={16}
              />
              <Icon
                onClick={handleDelete}
                IconName={MdDelete}
                loading={deleteLoading}
                size={16}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
