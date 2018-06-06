import React from "react";
import "./WaitingModal.css";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
const WaitingModal = props => {
  let mapPlayers = props.players.map(player => {
    console.log("[WaitingModal.js] mapPlayer", player);
    let iconClass = '';
    if (player.status) {
      iconClass = "text-danger";
    } else {
      iconClass = "text-dark";
    }
    return (
      <div className="waiting-player">
      <FontAwesomeIcon icon="user-circle" className={iconClass}/>
        {/* <i className={iconClasses.join(" ")} /> */}
        {/* <label>{player.nickname}</label> */}
      </div>
    );
  });

  let spinner = (
    <div className="waitingmodal-spinner-container">
      <div className="waitingmodal-spinner">
        <div className="dot dot-1" />
        <div className="dot dot-2" />
        <div className="dot dot-3" />
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );

  return (
    <div className="waitingmodal">
      <div className="waitingmodal-players">{mapPlayers}</div>
      {!props.allReady?<div className="waitingmodal-status">
        <button onClick={props.changeStatus}>
          {props.status ? "I'm ready!" : "Get ready"}
        </button>
      </div>:null}
      {spinner}
      {props.allReady?<label className="waitingmodal-status">Game will start shortly</label>:<label className="waitingmodal-status">Waiting for others</label>}
    </div>
  );
};

export default WaitingModal;
