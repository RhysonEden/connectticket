import React, { useState } from "react";
import { deleteTix } from "../api";
import { openTix } from "../api";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useAlert } from "react-alert";
import { BiEnvelopeOpen, BiBlock } from "react-icons/bi";
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

  const readdTix = async (e) => {
    let id = parseInt(e.target.value);
    try {
      window.location.reload();
      await openTix(id);
    } catch (err) {
      throw err;
    }
  };

  const onCopyText = () => {
    alert.show("Copied!");
  };

  let post = message.sort(function compare(a, b) {
    console.log(a.date, b.date);
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateA - dateB;
  });

  let main = post.reverse();

  return (
    <div className="existing">
      {main.map((mess, index) => (
        <div key={index} className="card" value={mess.id}>
          <div className="hundred">Caller's Name : {mess.callname}</div>
          <div className="hundred">Caller's Number : {mess.callnumber}</div>
          <div className="hundred">GP Customer Number : {mess.gpcust}</div>
          <CopyToClipboard text={mess.gvrid} onCopy={onCopyText}>
            <button className="hundredbutton">
              GVR ID : {mess.gvrid} (Click to Copy){" "}
            </button>
          </CopyToClipboard>
          <CopyToClipboard text={mess.gpid} onCopy={onCopyText}>
            <button className="hundredbutton">
              GP Ticket Number : {mess.gpid} (Click to Copy){" "}
            </button>
          </CopyToClipboard>
          <div className="notes">Notes : {mess.notes}</div>
          <div className="hundred">Date of Call : {mess.date}</div>
          <div className="hundred">Created By : {mess.userid}</div>
          {mess.email !== "" ? (
            <div className="hundred">Customer Contacted by : {mess.email}</div>
          ) : (
            <div className="hundred">
              <BiBlock /> Customer Not Contacted.
            </div>
          )}
          {mess.ntcflag == false ? (
            <div className="hundred">Ticket Status : Open </div>
          ) : (
            <div className="hundred">Ticket Status : Archived</div>
          )}
          <div className="buttonsother">
            <button
              className="wide"
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
            {mess.ntcflag == true ? (
              <button className="wide" value={mess.id} onClick={readdTix}>
                Re-Open
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        // }
      ))}
    </div>
    // </div>
  );
};

export default Existing;
