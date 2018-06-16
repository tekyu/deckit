import React from "react";
import "./EmptyServerList.css";
const EmptyServerList = props => {
    return (
        <div className="empty-server-list">
            <div className="empty-state" />
            <label>No room is available :(</label>
        </div>
    );
};

export default EmptyServerList;
