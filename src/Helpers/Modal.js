import React from "react";
import Input from "./Input";
import { updateTix } from "../api";
import moment from "moment";

const Modal = ({
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
  id,
}) => {
  if (!show) {
    return null;
  }
  const date = moment().format("MM/DD/YYYY");

  const update = () => {
    setShow(false);
    console.log("test", callname, callnumber, gvrid, notes, ntcflag, id, date);
    console.log("Id", id, typeof id);
    updateTix(callname, callnumber, gvrid, notes, ntcflag, date, id);
    window.location.reload();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-body">
          <Input
            setShow={setShow}
            callname={callname}
            callnumber={callnumber}
            gvrid={gvrid}
            notes={notes}
            ntcflag={ntcflag}
            setShow={setShow}
            setCallName={setCallName}
            setCallNumber={setCallNumber}
            setGvrid={setGvrid}
            setNotes={setNotes}
            setNtcflag={setNtcflag}
          />
        </div>
        <div className="modal-footer">
          <button className="modal-button" onClick={() => setShow(false)}>
            Close
          </button>
          <button className="modal-button" onClick={update}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
