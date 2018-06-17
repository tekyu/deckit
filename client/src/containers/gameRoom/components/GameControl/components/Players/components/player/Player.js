import React from "react";
import "./Player.css";
import ProgressBar from "./components/ProgressBar";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const Player = props => {
	let style = {
		background: props.data.color
	};
	let hinter = null;
	if (props.hinter) {
		hinter = (
			<div className="hinter">
				<FontAwesomeIcon icon="chess-queen" />
			</div>
		);
	}
	return (
		<div className="player" player-id={props.key}>
			<div className="player-img" style={style}>
				{hinter}
			</div>
			<div className="player-info">
				<label>{props.data.nickname}</label>
				<ProgressBar
					score={props.data.score}
					maxPoints={props.maxPoints}
				/>
			</div>
		</div>
	);
};

export default Player;
