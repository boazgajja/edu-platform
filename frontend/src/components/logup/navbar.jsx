import React, { useState, useEffect, useRef } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./Sliderbardata";
import "./navbar.css";
import Login from "./login";
import { IconContext } from "react-icons";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const sidebarRef = useRef(null);
  
  const showSidebar = () => setSidebar(!sidebar);
  
  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && 
          !event.target.classList.contains('menu-bars') && 
          !event.target.closest('.menu-bars')) {
        setSidebar(false);
      }
    }
    
    // Add event listener when sidebar is open
    if (sidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebar]);

  return (
    <>
      <div className="navb">
        <div className="navbar">
          {/* <IconContext.Provider value={{ color: "#4070f4" }}>
            <div className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </div>
          </IconContext.Provider> */}

          <h2 className="name" onClick={() => window.location.href = '/home'}>EduConnect</h2>

          <div className="navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              {SidebarData.map((item, index) => (
                <li key={index}>
                  <Link to={item.path}>{item.title}</Link>
                </li>
              ))}
            </ul>
            <Login />
          </div>
        </div>

        {/* Overlay for closing sidebar */}
        <div className={sidebar ? "sidebar-overlay active" : "sidebar-overlay"} onClick={showSidebar}></div>
        
        {/* Sidebar Menu */}
        <nav className={sidebar ? "nav-menu active" : "nav-menu"} ref={sidebarRef}>
          <ul className="nav-menu-items">
            <li className="nav-text">
              <Link to="#" onClick={showSidebar}>
                <AiIcons.AiOutlineClose />
                <span>Close</span>
              </Link>
            </li>
            {SidebarData.map((item, index) => (
              <li key={index} className="nav-text">
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                  
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
