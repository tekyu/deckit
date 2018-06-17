import React from "react";
import "./WaitingModal.css";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import WaitingState from "./WaitingState/WaitingState";
const WaitingModal = props => {
    let mapPlayers = props.players.map(player => {
        console.log("[WaitingModal.js] mapPlayer", player);
        let iconClass = "";
        if (player.status) {
            iconClass = "text-danger";
        } else {
            iconClass = "text-dark";
        }
        return (
            <div className="waiting-player">
                <FontAwesomeIcon icon="user-circle" className={iconClass} />
                {/* <i className={iconClasses.join(" ")} /> */}
                {/* <label>{player.nickname}</label> */}
            </div>
        );
    });

    return (
        <div className="gameboard">
            <div className="waitingmodal">
                <div className="waitingmodal-players">{mapPlayers}</div>
                {!props.allReady ? (
                    <div className="waitingmodal-status">
                        <button onClick={props.changeStatus}>
                            {props.status ? "I'm ready!" : "Get ready"}
                        </button>
                    </div>
                ) : null}
                {/* {spinner} */}
                <WaitingState />
                {props.allReady ? (
                    <label className="waitingmodal-status">
                        Game will start shortly
                    </label>
                ) : (
                    <label className="waitingmodal-status">
                        Waiting for others
                    </label>
                )}
            </div>
        </div>
    );
};

export default WaitingModal;
