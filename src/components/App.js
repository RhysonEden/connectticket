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
import Sidebar from "../Helpers/Sidebar";
const assert = require("assert");
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
  const [total, setTotal] = useState(0);
  const [openCount, setOpenCount] = useState(0);
  const [dispatchCount, setDispatchCount] = useState(0);
  const [closedCount, setClosedCount] = useState(0);
  let user = sessionStorage.getItem("user");

  useEffect(() => {
    getSomething()
      .then((response) => {
        let openTix = [];
        let closedTix = [];
        let dispatchTix = [];
        let tickets = response.tickets;
        let open = response.tickets;
        console.log(open);
        setMessage(response.tickets);

        const openTickets = open.map((mess, index) => {
          if (mess.ntcflag === false && mess.email === "NA") {
            openTix.push("yes");
          }
          if (mess.email != "NA") {
            dispatchTix.push("e");
          }
          if (mess.ntcflag != false) {
            closedTix.push("closed");
          }
        });
        setOpenCount(openTix.length);
        setClosedCount(closedTix.length);
        setDispatchCount(dispatchTix.length);
        let maxId = openTix.length + closedTix.length;
        setTotal(maxId);
      })

      .catch((error) => {
        setMessage(error.message);
      });
  }, []);
  // }
  // if (!user) {
  //   return (
  //     <Brouter>
  //       <Switch>
  //         <Login />
  //       </Switch>
  //     </Brouter>
  //   );
  // } else {
  return (
    <Brouter>
      <div className="app">
        <Sidebar
          total={total}
          openCount={openCount}
          closedCount={closedCount}
          dispatchCount={dispatchCount}
        />
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
};
// };
export default App;
