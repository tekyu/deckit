import React from "react";
import "./WinnersModal.css";
const WinnersModal = props => {
    const winners = props.winners.map(winner => {
        return <p>{winner.nickname}</p>;
    });
    return (
        <div className="gameboard">
            <div id="winnermodal">
                <div className="winnermodal-container">
                    <label>Congratulations to</label>
                    <div className="winnermodal-winners">{winners}</div>
                    <div className="winnermodal-state" />
                    <label>You've won!</label>
                    {/* <button onClick={props.createServer}>
                    Return to waiting room
                </button> */}
                </div>
            </div>
        </div>
    );
};

export default WinnersModal;
