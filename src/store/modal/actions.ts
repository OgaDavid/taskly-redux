import { OPEN_MODAL, CLOSE_MODAL } from "./constants";

export const openModal = (view: string) => {
  return {
    type: OPEN_MODAL,
    view: view,
  };
};

export const closeModal = (view: string) => {
  return {
    type: CLOSE_MODAL,
    view: view,
  };
};
