import React, { useState } from "react";

const SearchBar = ({ searchInput, setSearchInput }) => {
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
      <button>Search</button>
      {/* </form> */}
    </div>
  );
};

export default SearchBar;
