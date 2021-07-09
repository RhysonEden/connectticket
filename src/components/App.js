import React, { useState, useEffect } from "react";
import Existing from "../Helpers/Existing";
import Header from "../Helpers/Header";
import Modal from "../Helpers/Modal";
import Results from "../Helpers/Results";
import getSomething from "../api/index";
import Login from "./Login";
import IdleTimerContainer from "../Helpers/IdleTimerContainer";
import { BrowserRouter as Brouter, Switch } from "react-router-dom";
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
  let user = sessionStorage.getItem("user");
  useEffect(() => {
    getSomething()
      .then((response) => {
        setMessage(response.tickets);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, []);

  if (!user) {
    return (
      <Brouter>
        <div>
          <Switch>
            <Login />
            <IdleTimerContainer />
          </Switch>
        </div>
      </Brouter>
    );
  } else {
    return (
      <Brouter>
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
          <Switch>
            <Existing
              path="/"
              exact
              component={Existing}
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
            <Results
              path="/results"
              component={Results}
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
          </Switch>
          <IdleTimerContainer />
        </div>
      </Brouter>
    );
  }
};
export default App;
