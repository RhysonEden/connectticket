import React from "react";
import Search from "./Search";
const Header = ({
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
  gpid,
  setGpid,
  email,
  setEmail,
  gpcust,
  setGpcust,
  sol,
  setSol,
  update,
  setId,
  setSearchInput,
  searchInput,
  message,
  setMessage,
}) => {
  const clearModal = () => {
    setCallName("");
    setCallNumber("");
    setGvrid("");
    setNotes("");
    setShow(true);
    setId("");
    setGpid("");
    setEmail("");
    setGpcust("");
    setSol("op");
  };
  const logOut = () => {
    sessionStorage.clear();
    window.location.reload();
  };
  const capital = sessionStorage.getItem("user");
  const user = capital.charAt(0).toUpperCase() + capital.slice(1);
  const handleTextChange = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <div className="header">
      <div className="searching">
        <div className="user">Hello, {user}</div>
        <button className="newbutton" onClick={clearModal}>
          New
        </button>
        <button className="newbutton" onClick={logOut}>
          Logout
        </button>
      </div>
      <div className="searchingbuttons">
        <input
          className="search"
          type="text"
          placeholder="Search By GVR ID or GP Customer"
          value={searchInput}
          onChange={handleTextChange}
        />
      </div>
      <Search
        sol={sol}
        setSol={setSol}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        message={message}
        setMessage={setMessage}
        clearModal={clearModal}
      />
    </div>
  );
};

export default Header;
