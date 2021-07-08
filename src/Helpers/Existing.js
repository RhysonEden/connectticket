import React, { useState } from "react";
import { deleteTix } from "../api";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useAlert } from "react-alert";
const Existing = ({
  message,
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
  setId,
}) => {
  const alert = useAlert();

  const removeTix = async (e) => {
    let id = parseInt(e.target.value);
    try {
      window.location.reload();
      await deleteTix(id);
    } catch (err) {
      throw err;
    }
  };

  const onCopyText = () => {
    alert.show("Copied!");
  };

  return (
    <div className="existing">
      {message.map((mess, index) => (
        <div key={index} className="card" value={mess.id}>
          <div className="hundred">Caller's Name : {mess.callname}</div>
          <div className="hundred">Caller's Number : {mess.callnumber}</div>
          {/* <pre>GVR ID : {mess.gvrid} </pre> */}
          <CopyToClipboard text={mess.gvrid} onCopy={onCopyText}>
            <div className="hundred">GVR ID : {mess.gvrid} </div>
          </CopyToClipboard>
          <div className="notes">Notes : {mess.notes}</div>
          <div className="hundred">Date of Call : {mess.date}</div>
          <div className="buttonsother">
            <button value={mess.id} onClick={removeTix}>
              Delete
            </button>
            <button
              value={mess.id}
              onClick={() => {
                setCallName(mess.callname);
                setCallNumber(mess.callnumber);
                setGvrid(mess.gvrid);
                setNotes(mess.notes);
                setShow(true);
                setId(mess.id);
              }}
            >
              Update
            </button>
          </div>
        </div>
      ))}
    </div>
    // </div>
  );
};

export default Existing;
