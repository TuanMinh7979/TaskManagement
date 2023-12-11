import React, { useState, useEffect } from "react";
import FlipMove from "react-flip-move";
import Task from "./Task";
import { taskType } from "../Types";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { mapOrder } from "../utils/funcs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { saveOrderTasks } from "../redux/taskListSlice";

type TasksType = {
  tasks: taskType[];
  listId: string;
};

function Tasks({ tasks, listId }: TasksType) {
  const dispatch = useDispatch();
  const initTasksOrder: any = useSelector(
    (state: RootState) =>
      state.taskList.currentTaskGroups.find((el: any) => el.id == listId)
        ?.tasksOrder
  );
  const [sortedTasks, setSortedTasks] = useState<taskType[]>([]);
  useEffect(() => {
    if (sortedTasks.length > 0) {
      dispatch(
        saveOrderTasks({ listId, orderedTasks: sortedTasks.map((el) => el.id) })
      );
    }
  }, [sortedTasks]);
  useEffect(() => {
  
      setSortedTasks([...mapOrder(tasks, initTasksOrder, "id")]);
    
  }, [tasks]);
  const handleDragEnd = (e: any) => {
    console.log(e);
    const { active, over } = e;
    if (active.id != over.id) {
      const oldIdx = sortedTasks.findIndex((c: any) => c.id == active.id);
      const newIdx = sortedTasks.findIndex((c: any) => c.id == over.id);
      const rs = arrayMove([...sortedTasks], oldIdx, newIdx);
      setSortedTasks(rs as unknown as []);
    }
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor);
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="p-3 pb-5">
        <SortableContext
          items={sortedTasks.map((t: any) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {sortedTasks?.map((t) => (
            <Task key={t.id} task={t} listId={listId} />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <p className="text-center">No task added yet!</p>
        )}
      </div>
    </DndContext>
  );
}

export default Tasks;
