import React from "react";

import './Message.css';

const Message = ({ message: { user, text }, name }) => {
    
    let isSentCurrentUser = false;

    const trimedName = name.trim().toLowerCase();

    if (user == trimedName) {
        isSentCurrentUser = true;
    }
    
    return (
        isSentCurrentUser
        ? (
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{trimedName}</p>
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{text}</p>
                </div>
            </div>
        )
        : (
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{text}</p>
                </div>
                <p className="sentText pl-10">{user}</p>
            </div>
        )
    )
}

export default Message;