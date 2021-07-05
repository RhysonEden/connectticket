import React from "react";
import { getPart } from "../api";
import { useAlert } from "react-alert";
const Search = ({ searchInput, setSearchInput, message, setMessage }) => {
  const alert = useAlert();
  const searchSubmit = (e) => {
    getPart(searchInput).then((resp) => {
      let results = resp.data.part.rows;
      if (results.length === 0) {
        alert.show("Nothing Found, Please Try Again");
      } else {
        setMessage(results);
      }
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
        placeholder="Search By GVR"
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
