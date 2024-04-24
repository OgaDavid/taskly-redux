import { ADD_TODO, UPDATE_TODO, DELETE_TODO, PREVIEW_TODO } from "./constants";

export interface Todo {
  id: string;
  todoTitle: string;
  todoDescription: string;
  dueDate: string;
  isCompleted: boolean;
}

export const addTodo = (todo: Todo) => {
  return {
    type: ADD_TODO,
    payload: todo,
  };
};

export const updateTodo = (todo: Todo) => {
  return {
    type: UPDATE_TODO,
    payload: todo,
  };
};

export const deleteTodo = (id: number) => {
  return {
    type: DELETE_TODO,
    payload: id,
  };
};

export const previewTodo = (id: number) => {
  return {
    type: PREVIEW_TODO,
    payload: id,
  };
};
