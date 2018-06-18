import React from "react";
import "./WaitingPlayers.css";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const WaitingPlayers = props => {
    let mapPlayers = props.players.map(player => {
        const iconStyle = {
            color: player.color
        };
        const indicatorClasses = ["waiting-player-indicator"];
        if (player.status) {
            indicatorClasses.push("indicator-true");
        } else {
            indicatorClasses.push("indicator-false");
        }
        return (
            <div className="waiting-player" key={player.id}>
                <FontAwesomeIcon icon="user-circle" style={iconStyle} />
                <div className={indicatorClasses.join(" ")} />
            </div>
        );
    });
    return <div className="waitingmodal-players">{mapPlayers}</div>;
};

export default WaitingPlayers;
