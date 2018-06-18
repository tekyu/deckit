import React from "react";
import "./header.css";

import Logo from "../ui/logo/logo";
const header = props => {
	let inputClasses = "choose-name";
	inputClasses = props.lengthError ? inputClasses + " error" : inputClasses;
	return (
		<div className="welcome-header">
			<Logo />
			<h2>Choose your name</h2>
			<input
				className={inputClasses}
				onChange={props.getNameHandler}
				value={props.name}
				placeholder="Enter your name"
			/>
			<button className="choose-name-btn" onClick={props.startGame}>
				Start
			</button>
		</div>
	);
};

export default header;
