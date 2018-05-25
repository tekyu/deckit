import React from 'react'
import './header.css';
const header = (props) => {

let inputClasses = 'choose-name';
inputClasses = props.lengthError?inputClasses +' error':inputClasses;
    console.log('inputclasses',inputClasses);
    return (
        <div className="welcome-header">
            <div className="img-container"><span>Deckit</span></div>
            <h2>Choose your name</h2>
            <input 
                className={inputClasses}
                onChange={props.getNameHandler} 
                value={props.name} 
                placeholder="Enter your name"/>
            <button className="choose-name-btn" onClick={props.startGame}>Start</button>
        </div>
    );
}

export default header;