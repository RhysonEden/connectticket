import { JsonWebTokenError } from "jsonwebtoken";
import React, { useRef, useEffect } from "react";
import IdleTimer from "react-idle-timer";
import { useHistory } from "react-router";
import { updateRefresh } from "../api/index";
const IdleTimerContainer = ({ setMessage }) => {
  // let info = JSON.parse(sessionStorage.getItem("data"));
  // let endinfo = info.tickets;
  const idleTimerRef = useRef(null);
  const history = useHistory();
  const onIdle = () => {
    updateRefresh();
  };

  return (
    <div>
      <IdleTimer
        ref={idleTimerRef}
        timeout={2 * 15000}
        onIdle={onIdle}
        onActive={onIdle}
      ></IdleTimer>
    </div>
  );
};

export default IdleTimerContainer;
