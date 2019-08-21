import { OPEN_SOCKET } from "store/actions/actionCreators";

export const initializeSocket = socket => {
	console.log("initializeSocket", socket);
	return {
		type: OPEN_SOCKET,
		payload: { socket }
	};
};
