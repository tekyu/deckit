import http from "http";
import socketIo from "socket.io";
import chalk from "chalk";

import roomEvents from "./events/Room";
import gameEvents from "./events/Game";
import shortId from "shortid";

const ioEvents = io => {
	io.on("connection", socket => {
		console.log(
			chalk.black.bgBlue(
				`Connection with socket established for ${socket.id}`
			)
		);
		roomEvents(socket);
		gameEvents(socket);
	});
};

const SocketIo = () => {
	const port = process.env.SOCKET_PORT || 3012;
	const server = http.createServer();
	const io = socketIo(server);

	ioEvents(io);
	server.listen(port, () =>
		console.log(
			chalk.black.bgGreen(`Socket server listening on port ${port}`)
		)
	);
};

export default SocketIo;
