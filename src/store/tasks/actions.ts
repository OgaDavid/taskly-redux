import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  PREVIEW_TASK,
  SET_ALL_TASKS,
  SET_CURRENT_TASK_ID,
} from "./constants";

export interface Task {
  id: string;
  taskTitle: string;
  taskDescription: string;
  dueDate: string;
  isCompleted: boolean;
}

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

export const deleteTask = (id: string) => {
  return {
    type: DELETE_TASK,
    payload: id,
  };
};

export const previewTask = (id: string) => {
  return {
    type: PREVIEW_TASK,
    payload: id,
  };
};

export const setCurrentTaskId = (id: string) => {
  return {
    type: SET_CURRENT_TASK_ID,
    payload: id,
  };
};
