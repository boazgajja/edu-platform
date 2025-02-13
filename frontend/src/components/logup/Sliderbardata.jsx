import React from "react";
import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Recruiter Login",
    path: "/",
    icon: <FaIcons.FaBriefcase/>,
    cName: "nav-text",
  },
  {
    title: "Assessments",
    path: "/exam",
    icon: <IoIcons.IoIosPaper/>,
    cName: "nav-text",
  },
  {
    title: "Messages",
    path: "/chat",
    icon: <FaIcons.FaUser/>,
    cName: "nav-text",
  },
  {
    title: "RecruiterConnect",
    path: "/team",
    icon: <IoIcons.IoMdPeople/>,
    cName: "nav-text",
  },
  {
    title: "Contributed Questions",
    path: "/contributed",
    icon: <FaIcons.FaTrophy/>,
    cName: "nav-text",
  },
  {
    title: "User Contribution",
    path: "/contribute",
    icon: <IoIcons.IoMdHelpCircle/>,
    cName: "nav-text",
  },
];