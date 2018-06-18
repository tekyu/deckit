import React from "react";
import "./ProgressBar.css";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const ProgressBar = props => {
    const barStyle = {
        width: parseInt((props.score / props.maxPoints) * 100, 10) + "%"
    };
    return (
        <label className="progressbar-wrapper">
            <FontAwesomeIcon icon="trophy" className="progressbar-trophy" />
            <div className="progressbar-container">
                <div className="progressbar-bar" style={barStyle} />
            </div>
            <span>{props.score}</span>
        </label>
    );
};

export default ProgressBar;
