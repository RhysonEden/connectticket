import React from "react";
import Input from "./Input";

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
}) => {
  if (!show) {
    return null;
  }
  const update = () => {
    setShow(false);
    console.log("test");
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {/* <div className="modal-header">
          <h4>Modal Title</h4>
        </div> */}
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
