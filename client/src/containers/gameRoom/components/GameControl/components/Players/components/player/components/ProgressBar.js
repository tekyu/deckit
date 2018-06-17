import React from "react";
import "./ProgressBar.css";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const ProgressBar = props => {
	console.log(
		"ptopd",
		props,
		props.score / props.maxPoints,
		parseInt((props.score / props.maxPoints) * 100) + "%"
	);
	const barStyle = {
		width: parseInt((props.score / props.maxPoints) * 100) + "%"
	};
	return (
		<label class="progressbar-wrapper">
			<FontAwesomeIcon icon="trophy" />
			<div className="progressbar-container">
				<div className="progressbar-bar" style={barStyle} />
			</div>
			{props.score}
		</label>
	);
};

export default ProgressBar;
