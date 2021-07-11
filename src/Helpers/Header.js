import React from "react";
import Search from "./Search";
const Header = ({
  searchInput,
  setMessage,
  setSearchInput,
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
}) => {
  const clearModal = () => {
    setCallName("");
    setCallNumber("");
    setGvrid("");
    setNotes("");
    setShow(true);
  };
  const capital = sessionStorage.getItem("user");
  const user = capital.charAt(0).toUpperCase() + capital.slice(1);
  return (
    <div className="header">
      <div className="searching">
        <div className="user">Hello, {user}</div>
        <button className="newbutton" onClick={clearModal}>
          New
        </button>
      </div>
      <Search
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
