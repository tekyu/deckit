import React from 'react';
import './Player.css';

const Player = (props) => {
    console.log('[Player.js] props',props);
    let style = {
        background:props.data.color
    };
    return (
        <div className="player" player-id={props.key}>
            <div className="player-img" style={style}></div>
            <div className="player-info">
                <label>{props.data.nickname}</label>
                <label>Progress</label>
            </div>
            <div className="player-controls"><i className="fas fa-align-right"></i></div>
        </div>
    )
}

export default Player;