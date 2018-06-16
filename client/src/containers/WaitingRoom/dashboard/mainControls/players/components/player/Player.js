import React from "react";
import "./Player.css";

const Player = props => {
    return (
        <div className="waiting-player" player-id={props.key}>
            <div className="player-info">
                <label>{props.data.nickname}</label>
            </div>
        </div>
    );
};

export default Player;
