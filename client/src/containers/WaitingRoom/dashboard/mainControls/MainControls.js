import React from "react";
import Players from "./players/Players";
import Chat from "./Chat/Chat";
import "./MainControls.css";
const MainControls = props => {
    return (
        <div className="waiting-maincontrol">
            <Players socket={props.socket} />
            <Chat socket={props.socket} />
        </div>
    );
};

export default MainControls;
