import { modalStore } from "store/initialStore";
import { CLOSE_MODAL, OPEN_MODAL } from "store/actions/actionCreators";
import simpleState from "store/utils";

const modal = (state = modalStore, action) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return simpleState(state, {
        showModal: false,
        modalType: null
      });
    case OPEN_MODAL:
      return simpleState(state, {
        showModal: true,
        modalType: action.payload.modalType
      });
    default:
      return state;
  }
};

export default modal;
