import React, { useState } from "react";
import "./Sidebar.scss";
import { BiExclude } from "react-icons/bi";
import { HiMenuAlt3 } from "react-icons/hi";
import menu from "../../data/sidebar";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>
        <div className="top_section">
          <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
            <BiExclude size={35} style={{ cursor: "pointer" }} />
          </div>
          <div
            className="bars"
            style={{ marginLeft: isOpen ? "100px" : "0px" }}
          >
            <HiMenuAlt3
              onClick={toggle}
              style={{
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
