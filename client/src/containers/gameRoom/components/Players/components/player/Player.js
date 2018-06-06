import React from 'react';
import './Player.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
const Player = (props) => {
    console.log('[Player.js] props',props);
    let style = {
        background:props.data.color
    };
    let hinter = null;
    if (props.hinter) {
        hinter = (<div className="hinter"><FontAwesomeIcon icon="chess-queen"/></div>);
    }
    return (
        <div className="player" player-id={props.key}>
            <div className="player-img" style={style}>
                {hinter}
            </div>
            <div className="player-info">
                <label>{props.data.nickname}</label>
                <label>Progress {props.data.progress?props.data.progress:0}</label>
            </div>
            {/* <div className="player-controls"><i className="fas fa-align-right"></i></div> */}
        </div>
    )
}

export default Player;