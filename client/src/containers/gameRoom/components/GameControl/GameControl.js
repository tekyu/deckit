import React from "react";
import Chat from "./components/Chat/Chat";
import Players from "./components/Players/Players";
import "./GameControl.css";
import RoomInfo from "./components/RoomInfo/RoomInfo";
const GameControl = props => {
	return (
		<div className="gameroom-controls">
			<RoomInfo roomId={props.roomId} round={props.round} />
			<Players socket={props.socket} />
			<Chat socket={props.socket} />
		</div>
	);
};

export default GameControl;
