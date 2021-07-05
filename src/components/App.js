import React, { useState, useEffect } from "react";
import Existing from "../Helpers/Existing";
import Header from "../Helpers/Header";
import Modal from "../Helpers/Modal";
import getSomething from "../api/index";
import IdleTimerContainer from "../Helpers/IdleTimerContainer";
const App = () => {
  const [message, setMessage] = useState([]);
  const [show, setShow] = useState(false);
  const [callname, setCallName] = useState("");
  const [callnumber, setCallNumber] = useState("");
  const [gvrid, setGvrid] = useState(0);
  const [notes, setNotes] = useState("");
  const [ntcflag, setNtcflag] = useState(false);
  const [id, setId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    getSomething()
      .then((response) => {
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
        searchInput={searchInput}
        setSearchInput={setSearchInput}
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
      <IdleTimerContainer />
    </div>
  );
};

export default App;
