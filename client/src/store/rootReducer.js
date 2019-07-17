import initialStore from "@store/initialStore";
import * as actionCreators from "@store/actions/actionCreators";
import { simpleState } from "@store/utils";

const reducer = (state = initialStore, action) => {
	switch (action.type) {
		case actionCreators.CLOSE_MODAL:
			return simpleState(state, {
				showModal: false,
				modalType: null
			});
		case actionCreators.OPEN_MODAL:
			return simpleState(state, {
				showModal: true,
				modalType: action.payload.modalType
			});
		case actionCreators.UPDATE_USER:
			console.log("update", action.payload);
			return simpleState(state, {
				user: action.payload
			});
		case actionCreators.AUTH_USER:
			return simpleState(state, {
				auth: action.payload
			});
		default:
			return state;
	}
};

export default reducer;
