import initialStore from "@store/initialStore";
import { simpleState } from "@store/utils";

const reducer = (state = initialStore, action) => {
	switch (action.type) {
		case "actionTypes.SELECTED_CARD":
			return state;
		default:
			return state;
	}
};

export default reducer;
