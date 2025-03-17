import React, { useEffect, useState } from "react";
import { fetchUsers, createUser } from "./services/api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/logup/navbar";
import Home from "./components/home/home";
import Chat from "./components/chats/main";
import Exam from "./components/exam/courses";
import Contribute from "./components/exam/contribute";
import Noof from "./components/exam/questions";
import Homes from "./components/exam/contributed";
import Contributed from "./components/exam/ourcontributions";
import Profilepage from "./components/Profilepage";
import Edit from "./components/edit";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check localStorage on component mount and when it changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const storedName = localStorage.getItem("name");
      setIsLoggedIn(storedName && storedName.trim() !== "");
    };
    
    // Check initially
    checkLoginStatus();
    
    // Set up event listener for storage changes
    window.addEventListener('storage', checkLoginStatus);
    
    // Set up interval to periodically check (as a fallback)
    const interval = setInterval(checkLoginStatus, 1000);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      clearInterval(interval);
    };
  }, []);
  
  return (
    <Router>
      {isLoggedIn ? <Login /> : <><nav className="navbar"><div className="logo">EduConnect</div></nav></>}
      <Routes>
      {isLoggedIn ? <Route path="/" element={<Homes />} />: <Route path="/" element={<Home />} />}
        
        <Route path="/home" element={<Homes />} />
        <Route path="/chat" element={<Chat />} />

        <Route path="/exam" element={<Exam />} />
        <Route path="/exam/quiz" element={<Noof />} />
        <Route path="/profile" element={<Profilepage/>} />
        <Route path="/profile/edit" element={<Edit/>} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/contributed" element={<Contributed />} />
      </Routes>
    </Router>
  );
};

export default App;
