import { OPEN_SOCKET, SOCKET_EMIT } from "store/actions/actionCreators";

export const initializeSocket = socket => {
	console.log("initializeSocket", socket);
	return {
		type: OPEN_SOCKET,
		payload: { socket }
	};
};

export const createRoom = options => {
	console.log("createRoom", options);
	return {
		type: SOCKET_EMIT,
		payload: { options },
		event: "createRoom"
	};
};
