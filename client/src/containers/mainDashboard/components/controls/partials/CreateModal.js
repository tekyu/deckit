import React from "react";
import "./CreateModal.css";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const CreateModal = props => {
    let privateLabelStyle = null;
    if (props.serverPrivate) {
        privateLabelStyle = {
            background: "rgb(255, 70, 118)"
        };
    }
    return (
        <div id="create-server-modal">
            <FontAwesomeIcon
                icon="times"
                className="modal-close"
                onClick={props.closeHandler}
            />
            <div className="create-server-wrapper">
                <label>Server name</label>
                <input type="text" onChange={props.changeName} />
                <label>
                    Players: <span>{props.initialSize}</span>
                </label>
                <input
                    type="range"
                    onChange={props.changeSize}
                    min="2"
                    max="8"
                    placeholder="Enter name for server"
                    value={props.initialSize}
                />

                <label>
                    Maximum points: <span>{props.initialPoints}</span>
                </label>
                <input
                    type="range"
                    onChange={props.changePoints}
                    min="12"
                    max="64"
                    placeholder="Enter name for server"
                    value={props.initialPoints}
                />
                <div className="private-room-container">
                    <label>Private?</label>
                    <div className="private-room-checkbox">
                        <label
                            htmlFor="private-room"
                            style={privateLabelStyle}
                        />
                        <input
                            type="checkbox"
                            onChange={props.changeMode}
                            id="private-room"
                        />
                    </div>
                </div>
                <button onClick={props.createServer}>Create server</button>
            </div>
        </div>
    );
};

export default CreateModal;
