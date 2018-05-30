import React from 'react';
import './Server.css';

const Server = (props) => {
    return (
        <div className="server">
            <div className="server-info">
                <label>#{props.id}</label>
                <p>{props.name}</p>
            </div>
            <div className="server-players">{props.connected}/{props.size}</div>
            <button onClick={() => props.joinPublicServer(props.id)} className="server-join">Join</button>
        </div>
    );
}

export default Server;