import React from 'react';
import ReactDOM from "react-dom";
import "./User.css";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const User2 = props => {

    return ReactDOM.createPortal(
        <div className="user__bar">
            <div className="user__header">
                <ArrowBackIcon title="Go Back" onClick={props.onClose}/>
                <p>Profile</p>
            </div>
            <div className="user__info">{props.children}</div>
        </div>,
        document.getElementById("sidebar")
    );
};

export default User2
