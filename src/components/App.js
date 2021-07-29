import React, { useState, useEffect } from "react";
import Existing from "../Helpers/Existing";
import Header from "../Helpers/Header";
import Modal from "../Helpers/Modal";
import Results from "../Helpers/Results";
import getSomething from "../api/index";
import Login from "./Login";
import Email from "../Helpers/Email";
import IdleTimerContainer from "../Helpers/IdleTimerContainer";
import { BrowserRouter as Brouter, Switch } from "react-router-dom";
import Opening from "../Helpers/Opening";
import Card from "../Helpers/Card";
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
  const [gpid, setGpid] = useState("");
  const [email, setEmail] = useState("");
  const [gpcust, setGpcust] = useState("");
  const [sol, setSol] = useState("op");
  let user = sessionStorage.getItem("user");
  // if (!user) {
  //   console.log("no");
  // } else {
  useEffect(() => {
    getSomething()
      .then((response) => {
        let tickets = response.tickets;
        setMessage(tickets);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, []);
  // }
  if (!user) {
    return (
      <Brouter>
        <Switch>
          <Login />
        </Switch>
      </Brouter>
    );
  } else {
    return (
      <Brouter>
        <div className="app">
          <Header
            sol={sol}
            setSol={setSol}
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
            gpid={gpid}
            setGpid={setGpid}
            setGpcust={setGpcust}
            gpcust={gpcust}
            setEmail={setEmail}
            email={email}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          <Modal
            sol={sol}
            setSol={setSol}
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
            gpid={gpid}
            setGpid={setGpid}
            email={email}
            setEmail={setEmail}
            gpcust={gpcust}
            setGpcust={setGpcust}
          />
          <Switch>
            <Card
              path="/"
              exact
              searchInput={searchInput}
              sol={sol}
              setSol={setSol}
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
              gpid={gpid}
              setGpid={setGpid}
              setGpcust={setGpcust}
              gpcust={gpcust}
              setEmail={setEmail}
              email={email}
            />
            <Results
              path="/results"
              sol={sol}
              setSol={setSol}
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
              gpid={gpid}
              setGpid={setGpid}
              setGpcust={setGpcust}
              gpcust={gpcust}
              setEmail={setEmail}
              email={email}
              searchInput={searchInput}
            />
            <Email
              path="/email"
              sol={sol}
              setSol={setSol}
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
              gpid={gpid}
              setGpid={setGpid}
              setGpcust={setGpcust}
              gpcust={gpcust}
              setEmail={setEmail}
              email={email}
              searchInput={searchInput}
            />
          </Switch>
          <Opening getSomething={getSomething} setMessage={setMessage} />
          <IdleTimerContainer setMessage={setMessage} />
        </div>
      </Brouter>
    );
  }
};
export default App;
