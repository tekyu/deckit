import { CLOSE_MODAL, OPEN_MODAL } from "./modalActions";

export const initialState = {
  showModal: false,
  modalType: null
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
        modalType: null
      };
    case OPEN_MODAL:
      return {
        ...state,
        showModal: true,
        modalType: action.modalType
      };
    default:
      return state;
  }
};
