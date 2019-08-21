import { appStore } from "store/initialStore";
import { SHOW_ERROR } from "store/actions/actionCreators";
import simpleState from "store/utils";

const app = (state = appStore, action) => {
	switch (action.type) {
		case SHOW_ERROR:
			return simpleState(state, {
				error: action.payload
			});
		default:
			return state;
	}
};

export default app;
