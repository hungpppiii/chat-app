import React from "react";


import "./InfoBar.css";

import onlineIcon from "../../icon/onlineIcon.png";
import closeIcon from '../../icon/closeIcon.png';

const InfoBar = ({ room }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online icon"/>
            <h3>{ room }</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img className="closeIcon" src={closeIcon} alt="close icon"/></a>
        </div>
    </div>
)

export default InfoBar;