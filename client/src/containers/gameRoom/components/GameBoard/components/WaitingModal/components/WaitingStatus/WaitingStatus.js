import React from "react";
import "./WaitingStatus.css";
const WaitingStatus = props => {
	return (
		<div className="waitingmodal-status">
			<button onClick={props.changeStatus}>
				{props.status ? "I'm ready!" : "Get ready"}
			</button>
		</div>
	);
};

export default WaitingStatus;
