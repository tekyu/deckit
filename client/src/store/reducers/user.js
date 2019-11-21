import { userStore } from "store/initialStore";
import { UPDATE_USER, AUTH_USER } from "store/actions/actionCreators";
import simpleState from "store/utils";

const user = (state = userStore, action) => {
  // TODO: Change state default to only take in consideration parts than touch this reducer
  switch (action.type) {
    case UPDATE_USER:
      return simpleState(state, {
        user: action.payload
      });
    case AUTH_USER:
      return simpleState(state, {
        auth: action.payload
      });
    default:
      return state;
  }
};

export default user;
