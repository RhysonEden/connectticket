import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0d2538;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

const RightNav = ({
  open,
  searchSubmit,
  clearModal,
  searchInput,
  handleTextChange,
  pushButton,
  clearButton,
  contactButton,
}) => {
  const history = useHistory();

  return (
    <>
      <Ul open={open}>
        <li>
          {" "}
          <button className="burgerbutton" onClick={clearModal}>
            New
          </button>
        </li>
        <li>
          {" "}
          <button className="burgerbutton" onClick={clearButton}>
            Clear
          </button>
        </li>
        <li>
          {" "}
          <button className="burgerbutton" onClick={pushButton}>
            Show All
          </button>
        </li>
        <li>
          {" "}
          <button className="burgerbutton" onClick={contactButton}>
            Contacted
          </button>
        </li>
        <div className="searchseperation">
          <li>
            <input
              className="searchmobil"
              type="text"
              placeholder="Search By GVR ID or GP Customer"
              value={searchInput}
              onChange={handleTextChange}
            />
          </li>
          <li>
            {/* <button className="burgerbutton" onClick={searchSubmit}>
              Search
            </button> */}
          </li>
        </div>
      </Ul>
    </>
  );
};

export default RightNav;
