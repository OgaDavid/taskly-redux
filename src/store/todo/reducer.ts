import { ADD_TODO, UPDATE_TODO, DELETE_TODO, PREVIEW_TODO } from "./constants";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface TodoActions {
  type: string;
  payload: any;
}

const initialState = {
  todoList: [],
};

const todo = (state = initialState, action: TodoActions) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
      };
    case UPDATE_TODO:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          // @ts-expect-error err
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        // @ts-expect-error err
        todoList: state.todoList.filter((todo) => todo.id !== action.payload),
      };
    case PREVIEW_TODO:
      return {
        ...state,
        // @ts-expect-error err
        todoList: state.todoList.find((todo) => todo.id === action.payload),
      };
    default:
      return state;
  }
};

export default todo;
