import React from "react";
import "./WaitingStatus.css";
const WaitingStatus = props => {
    const buttonHandlers = {};
    let buttonText = "Wait for other players";
    if (props.playersCount > 1) {
        buttonHandlers.onClick = props.changeStatus;
        buttonText = props.status ? "I'm ready!" : "Get ready";
    }
    return (
        <div className="waitingmodal-status">
            <button {...buttonHandlers}>{buttonText}</button>
        </div>
    );
};

export default WaitingStatus;
