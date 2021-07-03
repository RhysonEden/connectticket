import React, { useState } from "react";
import { getPart } from "../api";

const Search = ({ searchInput, setSearchInput, message, setMessage }) => {
  const searchSubmit = (e) => {
    console.log("searching");
    // setPartListing([]);
    // e.preventDefault();
    // if (searchInput >= 0) {
    //   setMessage("Please Enter A Part Number");
    // } else {
    //   let input = searchInput.toUpperCase();
    getPart(searchInput).then((resp) => {
      let results = resp.data.part.rows;
      console.log("this is the", results);
      setMessage(results);
    });
    //     if (response.data.part.length === 0) {
    //       setMessage("Nothing found, please try again");
    //     } else {
    //       setMessage("");
    //       setPartListing(response.data.part);
    //   }
    // });
    // }
  };

  const handleTextChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="searchbar">
      {/* <form > */}
      <input
        className="search"
        type="text"
        placeholder="Search By Ticket"
        value={searchInput}
        onChange={handleTextChange}
      />
      <button className="bigbutton" onClick={searchSubmit}>
        Search
      </button>
      <button className="bigbutton" onClick={() => window.location.reload()}>
        Clear
      </button>
      {/* </form> */}
    </div>
  );
};

export default Search;
