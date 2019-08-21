import { OPEN_SOCKET } from "store/actions/actionCreators";
import simpleState from "store/utils";

const socket = (state = null, action) => {
	switch (action.type) {
		case OPEN_SOCKET:
			console.log("OPEN SOCKET", action.payload.socket);
			return simpleState(state, action.payload.socket);
		default:
			return state;
	}
};

export default socket;
