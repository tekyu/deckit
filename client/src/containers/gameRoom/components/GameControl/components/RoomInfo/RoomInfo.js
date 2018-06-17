import React from "react";
import "./RoomInfo.css";

const RoomInfo = props => {
	return (
		<div className="gameroom-controls-info">
			<label className="gameroom-controls-info-id">
				Room <p>{props.roomId}</p>
			</label>
			<label className="gameroom-controls-info-round">
				Round <p>{props.round}</p>
			</label>
		</div>
	);
};

export default RoomInfo;
