import React, { useState, useEffect } from "react";
import "./navbar.css";
import "./home.css";
import "./login.css";

const UserValidation = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    age: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://edu-platform-8cp6.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful! Please login.");
        setIsLogin(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://edu-platform-8cp6.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        setShowAuth(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          
          <div className="nav-links">
            
            {isLoggedIn ? (
              <button className="auth-button" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button className="auth-button" onClick={() => {
                setShowAuth(true);
                setIsLogin(true);
              }}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {showAuth && (
        <div className="auth-container">
          <div className="auth-box">
            <div className="auth-side">
              <form className="auth-form" onSubmit={isLogin ? handleLogin : handleRegister}>
                <h2>
                  <span>{isLogin ? "Sign In" : "Create Account"}</span>
                  <button type="button" className="close-button" onClick={() => setShowAuth(false)}>
                    ×
                  </button>
                </h2>

                {!isLogin && (
                  <>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="fullname"
                      placeholder="Full Name"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="number"
                      name="age"
                      placeholder="Age"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                    />
                  </>
                )}

                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />

                <button type="submit" className="auth-button">
                  {isLogin ? "Sign In" : "Create Account"}
                </button>

                <div className="switch-mode">
                  <button type="button" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserValidation;