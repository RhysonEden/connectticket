import React, { useState } from "react";
import "./input.css";
import { createTicket } from "../api";
import moment from "moment";

const Input = ({
  show,
  setShow,
  callname,
  callnumber,
  gvrid,
  notes,
  ntcflag,
  setCallName,
  setCallNumber,
  setGvrid,
  setNotes,
  setNtcflag,
}) => {
  const date = moment().format("MM/DD/YYYY");

  const createTix = async () => {
    try {
      console.log("running now");
      setShow(false);
      window.location.reload();
      const test = await createTicket(
        callname,
        callnumber,
        gvrid,
        notes,
        ntcflag,
        date
      );
    } catch (err) {
      throw err;
    }
  };

  const changeCallName = (e) => {
    setCallName(e.target.value);
  };

  const changeCallNumber = (e) => {
    setCallNumber(e.target.value);
  };

  const changeGvrId = (e) => {
    setGvrid(e.target.value);
  };

  const changeNotes = (e) => {
    setNotes(e.target.value);
  };

  const clearButton = (e) => {
    setCallName("");
    setCallNumber("");
    setGvrid("");
    setNotes("");
  };
  return (
    <div className="new">
      {/* stopped here keep getting object object */}
      <div className="form-main">
        <input
          className="form-input"
          placeholder="Caller Name"
          value={callname}
          onChange={changeCallName}
        ></input>
        <input
          className="form-input"
          id="link"
          placeholder="Call Back Number"
          value={callnumber}
          onChange={changeCallNumber}
        ></input>
        <input
          className="form-input"
          id="link"
          placeholder="GVR ID"
          value={gvrid}
          onChange={changeGvrId}
        ></input>
        <input
          className="form-notes"
          id="link"
          placeholder="Notes"
          value={notes}
          onChange={changeNotes}
        ></input>
        {/* <input
          className="form-input"
          id="link"
          placeholder="Need to Call"
        ></input> */}
        <input
          className="form-input"
          id="link"
          placeholder="Date"
          value={date}
        ></input>
      </div>
      <div className="buttons">
        <button onClick={clearButton}>Clear</button>
        <button onClick={createTix}>Submit</button>
      </div>
    </div>
  );
};

export default Input;
