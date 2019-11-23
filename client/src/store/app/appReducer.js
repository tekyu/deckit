import { CLOSE_MODAL, OPEN_MODAL, SHOW_ERROR } from "./appActions";

export const initialState = {
  error: null,
  modalType: null
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return {
        ...state,
        modalType: null
      };
    case OPEN_MODAL:
      return {
        ...state,
        modalType: action.modalType
      };
    case SHOW_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
