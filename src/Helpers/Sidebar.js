import React, { useState } from "react";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { FaList, FaRegHeart } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";

const Sidebar = ({ total, openCount, closedCount }) => {
  const [menuCollapse, setMenuCollapse] = useState(true);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  const logOut = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div id="header" className="header">
      <ProSidebar collapsed={menuCollapse}>
        <SidebarHeader>
          <div className="closemenu" onClick={menuIconClick}>
            {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
          </div>
          <div className="logotext">
            <p>{menuCollapse ? "Stats" : "GC Call Log Stats"}</p>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            <div className="logotext">
              <p>{menuCollapse ? null : "Tickets :"}</p>{" "}
            </div>
            <MenuItem icon={<FaList />}>Total - {total}</MenuItem>
            <MenuItem icon={<RiPencilLine />}>Open - {openCount}</MenuItem>
            <MenuItem icon={<BiCog />}>Closed - {closedCount}</MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem icon={<FiLogOut />} onClick={logOut}>
              Logout
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
