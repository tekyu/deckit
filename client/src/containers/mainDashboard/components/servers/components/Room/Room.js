import React from "react";
import "./Room.css";

const Room = props => {
    let buttonClasses = ["server-join"];
    let serverClasses = ["server"];
    if (props.roomInfo.playersConnected.length === props.roomInfo.size) {
        serverClasses.push("room-full");
        buttonClasses.push("nonvisible");
    }
    return (
        <div className={serverClasses.join(" ")}>
            <div className="server-info">
                <label>#{props.id}</label>
                <p>{props.name}</p>
            </div>
            <div className="server-players">
                {props.connected}/{props.size}
            </div>
            <div className="server-button-container">
                <button
                    onClick={() => props.joinPublicServer(props.id)}
                    className={buttonClasses.join(" ")}>
                    Join
                </button>
            </div>
        </div>
    );
};

export default Room;
