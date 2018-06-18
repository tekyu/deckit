import React from "react";
import "./JoinModal.css";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const JoinModal = props => {
    let error = null;
    if (props.roomFull) {
        error = <p>Room is full</p>;
    }
    return (
        <div id="join-server-modal">
            <FontAwesomeIcon
                icon="times"
                className="modal-close"
                onClick={props.closeHandler}
            />

            <div className="join-server-wrapper">
                <label>Server id</label>
                <input
                    type="text"
                    onChange={props.changeId}
                    placeholder="Enter id of the server"
                />
                <button onClick={() => props.joinServer()}>Join server</button>
                {error}
            </div>
        </div>
    );
};

export default JoinModal;
