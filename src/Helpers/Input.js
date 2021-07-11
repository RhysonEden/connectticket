import React from "react";
import "./input.css";
import { createTicket } from "../api";
import moment from "moment";
import { useAlert } from "react-alert";
import PhoneInput from "react-phone-number-input/input";
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
  let user = sessionStorage.getItem("user");
  const alert = useAlert();
  const createTix = async () => {
    let id = gvrid.toString().length;
    let name = callname.length;
    let number = callnumber.length;

    if (id === 6 && name !== 0 && number === 10) {
      try {
        setShow(false);
        window.location.reload();
        await createTicket(
          callname,
          callnumber,
          gvrid,
          notes,
          ntcflag,
          date,
          user
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
          placeholder="Caller Name"
          type="text"
          value={callname}
          onChange={changeCallName}
        ></input>
        {/* <PhoneInput
          className="form-input"
          country="US"
          placeholder="Call Back Number"
          value={callnumber}
          onChange={setCallNumber}
          withCountryCallingCode={false}
        /> */}
        <input
          className="form-input"
          id="link"
          placeholder="Call Back Number"
          type="text"
          value={callnumber}
          onChange={changeCallNumber}
        ></input>
        <input
          className="form-input"
          id="link"
          placeholder="GVR ID"
          type="text"
          value={gvrid}
          onChange={changeGvrId}
        ></input>
        <textarea
          className="form-notes"
          id="link"
          placeholder="Notes"
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
      </div>
      <div className="buttons">
        <button className="modal-button" onClick={clearButton}>
          Clear
        </button>
        <button className="modal-button" onClick={createTix}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Input;
