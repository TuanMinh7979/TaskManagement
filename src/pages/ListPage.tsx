import React, { useState, useEffect } from "react";
import GroupTask from "../components/GroupTask";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import FlipMove from "react-flip-move";
import Modal from "../components/Modal";
import { setModalData, setModalIsShow } from "../redux/modalSlice";
import { saveOrderTaskGroups, saveTaskDueTime } from "../redux/taskListSlice";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import Button from "../components/Button";

import {
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { mapOrder } from "../utils/funcs";
import { TaskGroupType, TaskType } from "../Types";
type Props = {};

function ListPage({}: Props) {
  const dispatch = useDispatch();
  const initTaskGroups: any = useSelector(
    (state: RootState) => state.taskList.currentTaskGroups
  );
  const initTaskGroupsOrder: any = useSelector(
    (state: RootState) => state.taskList.orderTaskGroups
  );

  const modalStore = useSelector((state: RootState) => state.modal);
  const [dueTimeState, setDueTimeState] = useState(modalStore.data.dueTime);
  const applyDateTimeChange = () => {
    dispatch(setModalIsShow(false));
    dispatch(
      saveTaskDueTime({
        listId: modalStore.data.listId,
        id: modalStore.data.id,
        due: dueTimeState,
      })
    );
  };


  const handleDragEnd = (e: any) => {
    console.log(e);
    const { active, over } = e;
    if (active.id != over.id) {
      const oldIdx = sortedTaskGroups.findIndex((c: any) => c.id == active.id);
      const newIdx = sortedTaskGroups.findIndex((c: any) => c.id == over.id);
      const rs = arrayMove([...sortedTaskGroups], oldIdx, newIdx);
      setSortedTaskGroups(rs as unknown as []);
    }
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor);



  const [sortedTaskGroups, setSortedTaskGroups] = useState<TaskGroupType[]>([]);
  useEffect(() => {
    if (sortedTaskGroups.length > 0) {
      dispatch(saveOrderTaskGroups(sortedTaskGroups.map((el) => el.id)));
    }
  }, [sortedTaskGroups]);

  useEffect(() => {
    setSortedTaskGroups([
      ...mapOrder(initTaskGroups, initTaskGroupsOrder, "id"),
    ]);
  }, [initTaskGroups]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      {modalStore.isShow && (
        <Modal
          height={450}
          title="Choose Due Time"
          width={360}
          onClose={() => dispatch(setModalIsShow(false))}
          children={
            <div className="flex items-center justify-start ">
              <DatePicker
                className="custom-calendar"
                showTimeSelect
                timeFormat="p"
                timeIntervals={60}
                dateFormat="Pp"
                selected={dueTimeState}
                onChange={(val) => {
                  setDueTimeState(val);
                }}
                open={true}
              />
              <Button
                className="w-[70px] h-[30px] px-1 py-1"
                text="UnSet"
                onClick={() => {
                  setDueTimeState("");
                }}
              ></Button>
              <Button
                className="w-[70px] h-[30px] px-1 py-1"
                text="Apply"
                onClick={applyDateTimeChange}
              ></Button>
            </div>
          }
        />
      )}{" "}
      <div className="p-10">
        {sortedTaskGroups &&
          initTaskGroups.length === 0 &&
          sortedTaskGroups.length === 0 && (
            <h1 className="text-3xl text-center text-gray-500 mt-10">
              No group task added, add some!
            </h1>
          )}
        {sortedTaskGroups && sortedTaskGroups.length > 0 && (
          <SortableContext
            items={sortedTaskGroups.map((t: any) => t.id)}
            strategy={horizontalListSortingStrategy}
          >
            {/* <FlipMove className="flex flex-wrap justify-center gap-10"> */}
            <div className="flex flex-wrap justify-center gap-10">
              {" "}
              {sortedTaskGroups &&
                sortedTaskGroups.map((t: any) => (
                  <GroupTask key={t.id} singleTaskList={t} />
                ))}
            </div>

            {/* </FlipMove> */}
          </SortableContext>
        )}
      </div>
    </DndContext>
  );
}

export default ListPage;
