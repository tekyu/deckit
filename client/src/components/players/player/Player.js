import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import './Player.css';

const Player = (props) => {
    console.log('[Player.js] props',props);
    return (
        <div className="waiting-player" player-id={props.key}>
            <div className="player-img"></div>
            <div className="player-info">
                <label>{props.data.nickname}</label>
            </div>
            <div className="player-controls"><FontAwesomeIcon icon="align-right"/></div>
        </div>
    )
}

export default Player;