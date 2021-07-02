import React, { useState, useEffect } from "react";
import Input from "../Helpers/Input";
import Existing from "../Helpers/Existing";
import Header from "../Helpers/Header";
import Modal from "../Helpers/Modal";
import getSomething from "../api/index";

const App = () => {
  const [message, setMessage] = useState([]);
  const [show, setShow] = useState(false);
  const [callname, setCallName] = useState("");
  const [callnumber, setCallNumber] = useState("");
  const [gvrid, setGvrid] = useState("");
  const [notes, setNotes] = useState("");
  const [ntcflag, setNtcflag] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => {
    getSomething()
      .then((response) => {
        console.log(response.tickets);
        setMessage(response.tickets);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, []);

  return (
    <div className="app">
      <Header
        message={message}
        setMessage={setMessage}
        show={show}
        setShow={setShow}
        callname={callname}
        callnumber={callnumber}
        gvrid={gvrid}
        notes={notes}
        ntcflag={ntcflag}
        setCallName={setCallName}
        setCallNumber={setCallNumber}
        setGvrid={setGvrid}
        setNotes={setNotes}
        setNtcflag={setNtcflag}
      />
      <Modal
        show={show}
        setShow={setShow}
        callname={callname}
        callnumber={callnumber}
        gvrid={gvrid}
        notes={notes}
        ntcflag={ntcflag}
        setCallName={setCallName}
        setCallNumber={setCallNumber}
        setGvrid={setGvrid}
        setNotes={setNotes}
        setNtcflag={setNtcflag}
        id={id}
      />
      <Existing
        message={message}
        setMessage={setMessage}
        show={show}
        setShow={setShow}
        callname={callname}
        callnumber={callnumber}
        gvrid={gvrid}
        notes={notes}
        ntcflag={ntcflag}
        setCallName={setCallName}
        setCallNumber={setCallNumber}
        setGvrid={setGvrid}
        setNotes={setNotes}
        setNtcflag={setNtcflag}
        setId={setId}
      />
    </div>
  );
};

export default App;
