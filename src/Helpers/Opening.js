import React, { useEffect } from "react";
import { updateRefresh } from "../api/index";
const Opening = ({ getSomething, setMessage }) => {
  let info = JSON.parse(sessionStorage.getItem("data"));
  let endinfo = info.tickets;

  useEffect(() => {
    getSomething()
      .then((response) => {
        let tickets = response.tickets;
        setMessage(tickets);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, []);

  useEffect(() => {
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
        console.log(error.message);
      });
  }, []);
  return null;
};

export default Opening;
