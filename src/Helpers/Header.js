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
      <div className="searching">
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
