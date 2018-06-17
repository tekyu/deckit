import React from "react";
import "./CreateModal.css";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const CreateModal = props => {
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
                    max="10"
                    placeholder="Enter name for server"
                    value={props.initialSize}
                />

                <label>
                    Maximum points: <span>{props.initialPoints}</span>
                </label>
                <input
                    type="range"
                    onChange={props.changePoints}
                    min="24"
                    max="128"
                    placeholder="Enter name for server"
                    value={props.initialPoints}
                />

                <label>Private?</label>
                <input type="checkbox" onChange={props.changeMode} />
                <button onClick={props.createServer}>Create server</button>
            </div>
        </div>
    );
};

export default CreateModal;
