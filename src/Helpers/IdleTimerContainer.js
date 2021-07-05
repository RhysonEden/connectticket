import React, { useRef } from "react";
import IdleTimer from "react-idle-timer";

const IdleTimerContainer = () => {
  const idleTimerRef = useRef(null);

  const onIdle = () => {
    // sessionStorage.clear();
    window.location.reload();
    console.log("user is idle");
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
