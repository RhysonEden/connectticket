import React, { useState } from "react";
import { deleteTix } from "../api";
import { openTix } from "../api";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useAlert } from "react-alert";
import { BiEnvelopeOpen, BiBlock } from "react-icons/bi";
const Email = ({
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
  setGpid,
  setEmail,
  setGpcust,
  submit,
  setSubmit,
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

  let post = message.sort(function compare(a, b) {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateA - dateB;
  });

  let main = post.reverse();

  return (
    <div className="existing">
      {main.map((mess, index) => (
        <>
          {mess.email.length >= 3 ? (
            <div key={index} className="card" value={mess.id}>
              <div className="hundred">Caller's Name : {mess.callname}</div>
              <div className="hundred">Caller's Number : {mess.callnumber}</div>
              {mess.gpcust.length >= 3 ? (
                <div className="hundred">
                  GP Customer Number : {mess.gpcust}
                </div>
              ) : (
                <div className="notprovided">
                  GP Customer Number Not Provided
                </div>
              )}
              <CopyToClipboard text={mess.gvrid} onCopy={onCopyText}>
                <button className="hundredbutton">
                  GVR ID : {mess.gvrid} (Click to Copy){" "}
                </button>
              </CopyToClipboard>
              <CopyToClipboard text={mess.gpid} onCopy={onCopyText}>
                {mess.gpid.length >= 3 ? (
                  <button className="hundredbutton">
                    GP Ticket Number : {mess.gpid} (Click to Copy){" "}
                  </button>
                ) : (
                  <div className="notprovided">
                    No GP Ticket Number Provided
                  </div>
                )}
              </CopyToClipboard>
              <div className="notes">Notes : {mess.notes}</div>
              <div className="hundred">Date of Call : {mess.date}</div>
              <div className="hundred">Created By : {mess.userid}</div>
              {mess.email.length >= 3 ? (
                <div className="hundred">
                  Customer Contacted by : {mess.email}
                </div>
              ) : (
                <div className="notprovided">
                  <BiBlock /> Customer Not Contacted.
                </div>
              )}
              {mess.ntcflag == false ? (
                <div className="hundred">Ticket Status : Open </div>
              ) : (
                <div className="notprovided">Ticket Status : Archived</div>
              )}
              <div className="buttonsother">
                {mess.ntcflag == true ? (
                  <button className="wide" value={mess.id} onClick={readdTix}>
                    Re-Open
                  </button>
                ) : (
                  <div></div>
                )}
                {mess.ntcflag == false ? (
                  <button value={mess.id} onClick={removeTix}>
                    Archive
                  </button>
                ) : (
                  <div></div>
                )}
                <button
                  value={mess.id}
                  onClick={() => {
                    setCallName(mess.callname);
                    setCallNumber(mess.callnumber);
                    setGvrid(mess.gvrid);
                    setNotes(mess.notes);
                    setShow(true);
                    setId(mess.id);
                    setGpid(mess.gpid);
                    setEmail(mess.email);
                    setGpcust(mess.gpcust);
                    setSubmit(false);
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          ) : null}
        </>
      ))}
    </div>
  );
};

export default Email;
