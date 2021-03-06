import React, { useState } from "react";
import { deleteTix } from "../api";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useAlert } from "react-alert";
import { BiEnvelopeOpen, BiBlock } from "react-icons/bi";
const Card = ({
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
  gpid,
  setGpid,
  email,
  setEmail,
  setGpcust,
  gpcust,
  checker,
  setChecker,
  sol,
  setSol,
  searchInput,
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

  let post = message.sort(function compare(a, b) {
    const myArr = a.date.split(",");
    let test = myArr[0];
    let dateA = new Date(test);
    let dateB = new Date(b.date);

    return dateA - dateB;
  });

  let main = post.reverse();

  return (
    <div className="existing">
      {main
        .filter((client) => {
          const clientsId = client.gvrid;
          if (clientsId.includes(searchInput.toLowerCase())) {
            return true;
          }
          const ticketId = client.gpid;
          if (ticketId.includes(searchInput.toLowerCase())) {
            return true;
          }
          const gpcustId = client.gpcust;
          if (gpcustId.includes(searchInput.toUpperCase())) {
            return true;
          } else {
            return false;
          }
        })
        .map((mess, index) => (
          <>
            {mess.ntcflag == false && mess.email === "NA" ? (
              <div key={index} className="card" value={mess.id}>
                <div className="hundred">Caller's Name : {mess.callname}</div>
                <div className="hundred">
                  Caller's Number : {mess.callnumber}
                </div>
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
                  <div className="hundred">Ticket Created for site.</div>
                ) : (
                  <div className="notprovided">
                    <BiBlock /> No GP Ticket Created.
                  </div>
                )}
                {mess.ntcflag == false ? (
                  <div className="hundred">Ticket Status : Open </div>
                ) : (
                  <div className="notprovided">Ticket Status : Archived</div>
                )}
                <div className="buttonsother">
                  <button value={mess.id} onClick={removeTix}>
                    Archive
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
                      if (mess.gpid == "NA") {
                        setGpid("");
                      } else {
                        setGpid(mess.gpid);
                      }
                      if (mess.email == "NA") {
                        setEmail(false);
                      } else {
                        setEmail(mess.email);
                      }
                      if (mess.gpcust == "NA") {
                        setGpcust("");
                      } else {
                        setGpcust(mess.gpcust);
                      }
                      setSol("clos");
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            ) : null}
          </>
          // }
        ))}
    </div>
    // </div>
  );
};

export default Card;
