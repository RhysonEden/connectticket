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

  return (
    <div className="header">
      <button onClick={clearModal}>New</button>
      <Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
};

export default Header;
