import React from "react";
import Chat from "./components/Chat/Chat";
import Players from "./components/Players/Players";
import "./GameControl.css";
const GameControl = props => {
    return (
        <div className="gameroom-controls">
            <Players socket={props.socket} />
            <div className="gameroom-controls-wrapper" />
            <Chat socket={props.socket} />
        </div>
    );
};

export default GameControl;
