import { SHOW_ERROR } from "./appActions";

export const initialState = {
  error: null
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
