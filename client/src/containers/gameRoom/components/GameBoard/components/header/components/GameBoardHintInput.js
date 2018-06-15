import React from 'react';

const GameBoardHintInput = (props) => {
    return (
        <div className="hint-container">
            <input type="text" placeholder="Enter your hint here" onChange={props.hintInput}/>
            <button onClick={props.sendHint}>Send hint</button>
        </div>
    )
};

export default GameBoardHintInput;