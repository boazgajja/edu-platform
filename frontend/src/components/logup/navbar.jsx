import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./Sliderbardata";
import "./navbar.css";
import Login from "./login";
import { IconContext } from "react-icons";
function Navbar() {
  const [sidebar, setSidebar]=useState(false);
  const showSidebar=()=>setSidebar(!sidebar);
  return (
    <>
      <div className="navb">
        
      <IconContext.Provider value={{ color: "undefined" }}>
        
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar?"nav-menu active":"nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item,index) => {
              return (
                <li key={index}className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
      <h2 style={{textAlign: 'center',marginTop:'20px'}}>careersync</h2>
      <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#about" className="page-scroll">
               <b> About </b>
              </a>
            </li>
            <li>
              <a href="#testimonials" className="page-scroll">
              <b>Testimonials</b>
              </a>
            </li>
          </ul>
        </div>
      <Login/>
      </div>
    </>
  );
}

export default Navbar;