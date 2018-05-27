import React from 'react';
import './header.css';

const PlayersHeader = (props) => {
    return (
        <div className="players-info">
            <label><span>{props.roomSize}</span> player{props.roomSize > 1?'s':''} waiting</label>
        </div>
    );
}

export default PlayersHeader;