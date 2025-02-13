import React, { useState, useEffect } from "react";
import "./login.css"
const UserValidation = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is already logged in (stored in localStorage)
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Register User
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = { fullname, username, email, password, age };
    
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("✅ Registration Successful:", data);
        alert("Registration successful! Please login.");
        setShowRegisterPopup(false);
      } else {
        console.error("❌ Registration failed:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("🚨 Error:", error);
    }
  };

  // Login User
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    const formData = { username, password };

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
            console.log("✅ Login Successful:", data);
            alert("Login successful!");
            setIsLoggedIn(true); // 🔥 Update login state
            localStorage.setItem("isLoggedIn", "true"); // Save login state
            setShowLoginPopup(false); // 🔥 Close the login popup automatically
        } else {
            console.error("❌ Login failed:", data.message);
            alert(data.message);
        }
    } catch (error) {
        console.error("🚨 Error:", error);
    }
  };

  // Logout User
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // Clear login state
    alert("You have logged out!");
  };

  return (
    <div className="nav">
      <header>
        <div className="signinup">
          {isLoggedIn ? (
            <button type="button"  onClick={handleLogout}>LOGOUT</button> // 🔥 Logout button
          ) : (
            <>
              <button type="button" onClick={() => setShowLoginPopup(true)}>LOGIN</button>
              <button type="button" onClick={() => setShowRegisterPopup(true)}>SIGNUP</button>
            </>
          )}
        </div>
      </header>

      {showLoginPopup && (
        <div className="popupcon">
          <div className="popup">
            <form onSubmit={handleLoginSubmit}>
              <h2>
                <span>USER LOGIN</span>
                <button type="button" onClick={() => setShowLoginPopup(false)}>X</button>
              </h2>
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="submit" className="loginbtn">LOGIN</button>
            </form>
          </div>
        </div>
      )}

      {showRegisterPopup && (
        <div className="popupcon">
          <div className="register popup">
            <form onSubmit={handleSubmit}>
              <h2>
                <span>USER REGISTRATION</span>
                <button type="button" onClick={() => setShowRegisterPopup(false)}>X</button>
              </h2>
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="text" placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="submit" className="loginbtn">REGISTER</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserValidation;
