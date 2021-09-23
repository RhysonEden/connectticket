import React from "react";
import Input from "./Input";
import { updateTix } from "../api";
import moment from "moment";
import { useAlert } from "react-alert";
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
  gpid,
  setGpid,
  email,
  setEmail,
  gpcust,
  setGpcust,
  sol,
  setSol,
}) => {
  const alert = useAlert();
  if (!show) {
    return null;
  }
  const date = moment().format("MM/DD/YYYY");
  let user = sessionStorage.getItem("user");

  const update = () => {
    let user = sessionStorage.getItem("user");
    let gid = gvrid.toString().length;
    let name = callname.length;
    let number = callnumber.length;
    let finalnote = date + " " + notes;
    if (gid === 6 && name !== 0 && number === 10) {
      setShow(false);
      updateTix(
        callname,
        callnumber,
        gvrid,
        finalnote,
        ntcflag,
        // date,
        id,
        user,
        email,
        gpid,
        gpcust
      );
      window.location.reload();
    } else if (id !== 6) {
      alert.show("Incorrect GVR ID length");
    } else if (name === 0) {
      alert.show("Please Enter a Name");
    } else if (number !== 10) {
      alert.show("Please Correct Phone Number");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-body">
          <Input
            update={update}
            sol={sol}
            setSol={setSol}
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
            user={user}
            gpid={gpid}
            setGpid={setGpid}
            email={email}
            setEmail={setEmail}
            gpcust={gpcust}
            setGpcust={setGpcust}
          />
        </div>
        <div className="modal-footer">
          <button className="modal-button" onClick={() => setShow(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
