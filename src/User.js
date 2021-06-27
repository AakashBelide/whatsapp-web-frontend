import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./User.css";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const User = props => {
  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };// eslint-disable-next-line
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
              <IconButton>
                  <ArrowBackIcon onClick={props.onClose}/>
              </IconButton>
            <h4 className="modal-title">Profile</h4>
          </div>
          <div className="modal-body">{props.children}</div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default User;