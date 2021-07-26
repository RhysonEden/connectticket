import React, { useRef } from "react";
import IdleTimer from "react-idle-timer";
import { useHistory } from "react-router";
const IdleTimerContainer = () => {
  const idleTimerRef = useRef(null);
  const history = useHistory();
  const onIdle = () => {
    history.push("/");
  };

  return (
    <div>
      <IdleTimer
        ref={idleTimerRef}
        timeout={2 * 150000}
        onIdle={onIdle}
      ></IdleTimer>
    </div>
  );
};

export default IdleTimerContainer;
