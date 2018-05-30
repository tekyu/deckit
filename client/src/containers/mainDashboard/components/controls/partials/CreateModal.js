import React from 'react';
import './CreateModal.css';
const CreateModal = (props) => {
    return (
        <div id="create-server-modal">
            <div className="create-server-wrapper">
                <label>Server name</label>
                <input type="text" onChange={props.changeName}/>
                <label>Players: <span>{props.initialSize}</span></label>
                    <input 
                        type="range" 
                        onChange={props.changeSize} 
                        min="2" max="10" 
                        placeholder="Enter name for server" 
                        value={props.initialSize}/>
                <label>Private?</label>
                <input type="checkbox" onChange={props.changeMode}/>
                <button onClick={props.createServer}>Create server</button>
            </div>
        </div>
    );
}

export default CreateModal;