import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  PREVIEW_TASK,
  GET_ALL_TASKS,
  SET_ALL_TASKS,
} from "./constants";

export interface Task {
  id: string;
  taskTitle: string;
  taskDescription: string;
  dueDate: string;
  isCompleted: boolean;
}

export const getAllTasks = () => {
  return {
    type: GET_ALL_TASKS,
  };
};

export const setAllTasks = (tasks: Task[]) => {
  return {
    type: SET_ALL_TASKS,
    payload: tasks,
  };
};

export const addTask = (task: Task) => {
  return {
    type: ADD_TASK,
    payload: task,
  };
};

export const editTask = (task: Task) => {
  return {
    type: EDIT_TASK,
    payload: task,
  };
};

export const deleteTask = (id: number) => {
  return {
    type: DELETE_TASK,
    payload: id,
  };
};

export const previewTask = (id: number) => {
  return {
    type: PREVIEW_TASK,
    payload: id,
  };
};
