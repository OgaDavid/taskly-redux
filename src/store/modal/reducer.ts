import { OPEN_MODAL, CLOSE_MODAL } from "./constants";

const initialState = {
  isOpen: false,
  view: "create-todo",
};

export interface ModalActions {
  type: string;
  view?: string;
}

const modal = (state = initialState, action: ModalActions) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        view: action.view,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
        view: action.view,
      };
    default:
      return state;
  }
};

export default modal;
