import React, { useRef, useEffect } from "react";
import IdleTimer from "react-idle-timer";
import { useHistory } from "react-router";
import { updateRefresh } from "../api/index";
let info = JSON.parse(sessionStorage.getItem("data"));
let endinfo = info.tickets;
const IdleTimerContainer = ({ setMessage }) => {
  const idleTimerRef = useRef(null);
  const history = useHistory();
  const onIdle = () => {
    console.log("Running");
    updateRefresh()
      .then((response) => {
        let tickets = response.tickets;
        if (tickets.length == endinfo.length) {
          return;
        } else {
          window.location.reload();
        }
      })
      .catch((error) => {
        setMessage(error.message);
      });
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
