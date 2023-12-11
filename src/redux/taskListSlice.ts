import { createSlice } from "@reduxjs/toolkit";
import { TaskGroupType, TaskType } from "../Types";

export const defaultTaskList: TaskGroupType = {
  title: "Default task group title",
};
export const defaultTask: TaskType = {
  title: "Default task title",
  description: "Default task description",
};
type taskListSliceType = {
  currentTaskGroups: TaskGroupType[];
  orderTaskGroups: string[];
};

const parseData = () => {
  let strData = localStorage.getItem("data");
  if (strData) {
    return JSON.parse(strData);
  } else {
    return { currentTaskGroups: [], orderTaskGroups: [] };
  }
};
const initialState: taskListSliceType = parseData();

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    addTaskGroup: (state, action) => {
      const newTaskGroup = action.payload;
      newTaskGroup.editMode = true;
      newTaskGroup.tasks = [];
      newTaskGroup.tasksOrder = [];

      state.currentTaskGroups.unshift(newTaskGroup);
      localStorage.setItem("data", JSON.stringify(state));
    },
    saveOrderTaskGroups: (state, action) => {
      state.orderTaskGroups = action.payload;
      localStorage.setItem("data", JSON.stringify(state));
    },
    saveOrderTasks: (state, action) => {
      const { listId, orderedTasks } = action.payload;

      state.currentTaskGroups = state.currentTaskGroups.map((tL) => {
        if (tL.id === listId) {
          tL.tasksOrder = orderedTasks;
        }
        return tL;
      });
      localStorage.setItem("data", JSON.stringify(state));
    },
    saveTaskGroupTitle: (state, action) => {
      const { id, title } = action.payload;
      state.currentTaskGroups = state.currentTaskGroups.map((tL) => {
        if (tL.id === id) {
          tL.title = title;
          tL.editMode = false;
        }
        return tL;
      });
      localStorage.setItem("data", JSON.stringify(state));
    },

    saveTaskStatus: (state, action) => {
      // update task
     

      const { listId, id, status } = action.payload;

      const updatedTaskList = state.currentTaskGroups.map((tL) => {
        if (tL.id === listId) {
          const updatedTask = tL.tasks?.map((t) => {
            if (t.id === id) {
              t = { ...t, editMode: false, status };
            }
            return t;
          });
          tL.tasks = updatedTask;
        }
        return tL;
      });

      state.currentTaskGroups = updatedTaskList;
      localStorage.setItem("data", JSON.stringify(state));
    },
    taskGroupSwitchEditMode: (state, action) => {
      const { id, value } = action.payload;
      state.currentTaskGroups = state.currentTaskGroups.map((tL) => {
        if (tL.id === id) {
          tL.editMode = value !== undefined ? value : true;
        }
        return tL;
      });
    },
    deleteTaskGroup: (state, action) => {
      const { listId } = action.payload;

      state.currentTaskGroups = state.currentTaskGroups.filter(
        (tL) => tL.id !== listId
      );

      localStorage.setItem("data", JSON.stringify(state));
    },
    addTask: (state, action) => {
      const { listId, newTask } = action.payload;

      const updatedList = state.currentTaskGroups.map((tL) => {
        if (tL.id === listId) {
          // switch current task list edit mode to false if it's true
          tL.editMode = false;

          // switch of edit mode of all other tasks and collapse them
          let tasks = tL?.tasks!.map((t) => {
            t.editMode = false;
            t.collapsed = true;
            return t;
          });

          // push new task in edit mode
          tasks.push({
            ...newTask,
            editMode: true,
            collapsed: false,
            status: "Doing",
          });

          tL.tasks = tasks;
        }
        return tL;
      });

      state.currentTaskGroups = updatedList;

      localStorage.setItem("data", JSON.stringify(state));
    },

    collapseTask: (state, action) => {
      const { listId, id } = action.payload;
      const taskList = state.currentTaskGroups.find((tL) => tL.id === listId);
      const listIdx = state.currentTaskGroups.findIndex(
        (tL) => tL.id === listId
      );

      // collapse and uncollapse task
      taskList?.tasks?.map((t) => {
        if (t.id === id) {
          t.collapsed = !t.collapsed;
        }
      });

      if (taskList) state.currentTaskGroups[listIdx] = taskList;
    },

    collapseAllTask: (state, action) => {
      const { listId, value } = action.payload;
      const taskList = state.currentTaskGroups.find((tL) => tL.id === listId);
      const listIdx = state.currentTaskGroups.findIndex(
        (tL) => tL.id === listId
      );

      // collapse all and turn off editmode for all tasks
      taskList?.tasks?.map((t) => {
        t.collapsed = value !== undefined ? value : true;
        t.editMode = false;
        return t;
      });

      if (taskList) state.currentTaskGroups[listIdx] = taskList;
    },
    taskSwitchEditMode: (state, action) => {
      const { listId, id, value } = action.payload;

      const updateTaskList = state.currentTaskGroups.map((tL) => {
        if (tL.id === listId) {
          const updatedT = tL.tasks?.map((t) => {
            if (t.id === id) {
              t.editMode = value !== undefined ? value : true;
            }
            return t;
          });
          tL.tasks = updatedT;
        }

        return tL;
      });

      state.currentTaskGroups = updateTaskList;
    },
    saveTask: (state, action) => {
      // update task
  

      const { listId, id, title, description } = action.payload;

      const updatedTaskList = state.currentTaskGroups.map((tL) => {
        if (tL.id === listId) {
          const updatedTask = tL.tasks?.map((t) => {
            if (t.id === id) {
              t = { ...t, title, description, editMode: false };
            }
            return t;
          });
          tL.tasks = updatedTask;
        }
        return tL;
      });

      state.currentTaskGroups = updatedTaskList;
      localStorage.setItem("data", JSON.stringify(state));
    },
    saveTaskDueTime: (state, action) => {
      // update task
      

      const { listId, id, due } = action.payload;

      const updatedTaskList = state.currentTaskGroups.map((tL) => {
        if (tL.id === listId) {
          const updatedTask = tL.tasks?.map((t) => {
            if (t.id === id) {
              t = { ...t, editMode: false, due };
            }
            return t;
          });
          tL.tasks = updatedTask;
        }
        return tL;
      });

      state.currentTaskGroups = updatedTaskList;
      localStorage.setItem("data", JSON.stringify(state));
    },

    deleteTask: (state, action) => {
      const { listId, id } = action.payload;

      const updatedTaskList = state.currentTaskGroups.map((tL) => {
        if (tL.id === listId) {
          tL.tasks = tL.tasks?.filter((t) => t.id !== id);
        }

        return tL;
      });

      state.currentTaskGroups = updatedTaskList as TaskGroupType[];
      localStorage.setItem("data", JSON.stringify(state));
    },
  },
});

export const {
  addTaskGroup,
  saveOrderTaskGroups,
  saveOrderTasks,
  saveTaskGroupTitle,
  taskGroupSwitchEditMode,
  deleteTaskGroup,
  addTask,
  collapseTask,
  taskSwitchEditMode,
  saveTask,
  saveTaskStatus,
  saveTaskDueTime,
  deleteTask,
  collapseAllTask,
} = taskListSlice.actions;

export default taskListSlice.reducer;
