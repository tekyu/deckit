import React from "react";
import "./WaitingModal.css";
import WaitingState from "./components/WaitingState/WaitingState";
import WaitingStatus from "./components/WaitingStatus/WaitingStatus";
import WaitingPlayers from "./components/WaitingPlayers/WaitingPlayers";
const WaitingModal = props => {
	return (
		<div className="gameboard">
			<div className="waitingmodal">
				<WaitingPlayers players={props.players} />
				{!props.allReady ? (
					<WaitingStatus
						changeStatus={props.changeStatus}
						status={props.status}
					/>
				) : null}
				<WaitingState />
				{props.allReady ? (
					<label className="waitingmodal-status-label">
						Game will start shortly
					</label>
				) : (
					<label className="waitingmodal-status-label">
						Waiting for others
					</label>
				)}
			</div>
		</div>
	);
};

export default WaitingModal;
