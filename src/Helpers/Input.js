import React, { useState } from "react";
import "./input.css";
import { createTicket } from "../api";
import moment from "moment";
import { useAlert } from "react-alert";
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
  gpid,
  setGpid,
  email,
  setEmail,
  gpcust,
  setGpcust,
  sol,
  setSol,
  update,
}) => {
  const [checked, setChecked] = useState(false);
  const date = moment().format("MM/DD/YYYY, hh:mma");
  let user = sessionStorage.getItem("user");
  const alert = useAlert();
  const createTix = async () => {
    let id = gvrid.toString().length;
    let name = callname.length;
    let number = callnumber.length;
    let mail = email;
    let globalid = gpid;
    let globalcust = gpcust.toUpperCase();
    if (gpid.length == 0) {
      globalid = "NA";
    }
    if (gpcust.length == 0) {
      globalcust = "NA";
    }
    if (checked !== true) {
      mail = "NA";
    } else {
      mail = true;
    }
    if (id === 6 && name !== 0 && number === 10) {
      try {
        const myArr = date.split(",");
        const finDate = myArr[0];
        let finalnote = finDate + " " + notes;
        setShow(false);
        window.location.reload();
        await createTicket(
          callname,
          callnumber,
          gvrid,
          finalnote,
          ntcflag,
          date,
          user,
          mail,
          globalid,
          globalcust
        );
      } catch (err) {
        throw err;
      }
    } else if (id !== 6) {
      alert.show("Incorrect GVR ID length");
    } else if (name === 0) {
      alert.show("Please Enter a Name");
    } else if (number !== 10) {
      alert.show("Please Correct Phone Number");
    }
  };

  const changeCallName = (e) => {
    setCallName(e.target.value);
  };

  const changeCallNumber = (e) => {
    setCallNumber(e.target.value);
  };

  const changeGvrId = (e) => {
    let gvr = parseInt(e.target.value);
    setGvrid(gvr);
  };

  const changeNotes = (e) => {
    setNotes(e.target.value);
  };

  const changeGpid = (e) => {
    setGpid(e.target.value);
  };
  const changeEmail = (e) => {
    setChecked(!checked);
    if (checked === true) {
      setEmail(true);
    } else if (checked !== true) {
      setEmail(false);
    }
  };

  const changeGpcust = (e) => {
    setGpcust(e.target.value);
  };
  const clearButton = (e) => {
    setCallName("");
    setCallNumber("");
    setGvrid("");
    setNotes("");
  };
  return (
    <div className="new">
      <div className="form-main">
        <input
          className="form-input"
          placeholder="Caller Name *"
          type="text"
          value={callname}
          onChange={changeCallName}
        ></input>
        <input
          className="form-input"
          id="link"
          placeholder="Call Back Number *"
          type="text"
          value={callnumber}
          onChange={changeCallNumber}
        ></input>
        <input
          className="form-input"
          id="link"
          placeholder="GVR ID *"
          type="text"
          value={gvrid}
          onChange={changeGvrId}
        ></input>
        <input
          className="form-input"
          placeholder="GP Customer Number"
          type="text"
          value={gpcust}
          onChange={changeGpcust}
        ></input>
        <input
          className="form-input"
          id="link"
          placeholder="GP Ticket Number"
          type="text"
          value={gpid}
          onChange={changeGpid}
        ></input>
        <textarea
          className="form-notes"
          id="link"
          placeholder="Notes *"
          type="text"
          value={notes}
          onChange={changeNotes}
        ></textarea>
        <input
          className="form-input"
          id="link"
          placeholder="Date"
          type="text"
          value={date}
        ></input>
        <div class="checkboxes">
          <label for="x">
            <input
              type="checkbox"
              id="x"
              checked={checked}
              onChange={changeEmail}
            />
            <span>Tech Ticket Created?</span>
          </label>
        </div>
      </div>
      <div className="notprovided">All Field With * Are Required</div>
      <div className="buttons">
        <button className="modal-button" onClick={clearButton}>
          Clear
        </button>
        {sol.length == 2 ? (
          <button className="modal-button" onClick={createTix}>
            Submit
          </button>
        ) : (
          <button className="modal-button" onClick={update}>
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
