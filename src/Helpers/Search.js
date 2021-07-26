import React from "react";
import { getPart } from "../api";
import { useAlert } from "react-alert";
import { Link, useHistory } from "react-router-dom";
import Navbar from "./Navbar";
const Search = ({
  searchInput,
  setSearchInput,
  message,
  setMessage,
  clearModal,
}) => {
  const alert = useAlert();
  const history = useHistory();
  const searchSubmit = (e) => {
    getPart(searchInput).then((resp) => {
      let results = resp.data.part.rows;
      if (results.length === 0) {
        alert.show("Nothing Found, Please Try Again");
      } else {
        setMessage(results);
        history.push("/results");
      }
    });
  };
  const pushButton = (e) => {
    history.push("/results");
  };

  const clearButton = (e) => {
    history.push("/");
    window.location.reload();
  };
  const contactButton = (e) => {
    history.push("/email");
    // window.location.reload();
  };
  const handleTextChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <div className="searchingbuttons">
        <button className="bigbutton" onClick={searchSubmit}>
          Search
        </button>
        <button className="bigbutton" onClick={pushButton}>
          Show All
        </button>
        <button className="bigbutton" onClick={clearButton}>
          Clear
        </button>
        <button className="bigbuttonextra" onClick={contactButton}>
          Contacted
        </button>
      </div>
      <div className="mobilsearching">
        <Navbar
          searchSubmit={searchSubmit}
          pushButton={pushButton}
          clearButton={clearButton}
          contactButton={contactButton}
          clearModal={clearModal}
          searchInput={searchInput}
          handleTextChange={handleTextChange}
          searchSubmit={searchSubmit}
        />
      </div>
    </>
  );
};

export default Search;
