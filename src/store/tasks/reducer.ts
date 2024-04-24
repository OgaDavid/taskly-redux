import { Task } from "@/types";
import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  PREVIEW_TASK,
  SET_ALL_TASKS,
  SET_CURRENT_TASK_ID,
} from "./constants";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface TaskActions {
  type: string;
  payload: any;
}

interface TaskStore {
  taskList: Task[];
  currentTaskId: string;
}

const initialState: TaskStore = {
  taskList: [] as Task[],
  currentTaskId: "",
};

const task = (state = initialState, action: TaskActions) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        taskList: [...state.taskList, action.payload],
      };
    case SET_ALL_TASKS:
      return {
        ...state,
        taskList: action.payload,
      };
    case EDIT_TASK:
      return {
        ...state,
        setEditTaskId: action.payload,
      };
    case DELETE_TASK:
      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.payload),
      };
    case PREVIEW_TASK:
      return {
        ...state,
        previewTaskId: action.payload,
      };
    case SET_CURRENT_TASK_ID:
      return {
        ...state,
        currentTaskId: action.payload,
      };
    default:
      return state;
  }
};

export default task;
