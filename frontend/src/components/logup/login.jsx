import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut 
} from "firebase/auth";
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import "./login.css";
import { useNavigate } from "react-router-dom";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxdOBpxU08CgHqqN9mx1NeFz5XIcJOXYU",
  authDomain: "edu--platform.firebaseapp.com",
  projectId: "edu--platform",
  storageBucket: "edu--platform.firebasestorage.app",
  messagingSenderId: "166100024010",
  appId: "1:166100024010:web:fa07f374f7c08a39925233",
  measurementId: "G-XDETWE065W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// API base URL
const API_URL = 'https://edu-platform-8cp6.onrender.com/api';

const AuthComponent = () => {
  // State variables
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    fullname: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Check authentication state on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      if (user) {
        setShowAuth(false);
        handleUserData(user);
      }
    });
    return () => unsubscribe();
  }, []);

  // Check login status from localStorage
  useEffect(() => {
    const checkLoginStatus = () => {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  // Function to handle user data retrieval or creation
  const handleUserData = async (user) => {
    try {
      const encodedEmail = encodeURIComponent(user.email);
      
      try {
        // Try to get existing user data
        const response = await axios.get(`${API_URL}/users/${encodedEmail}`);
        
        const userDataFromDB = response.data;
        setUserData(userDataFromDB);
        
        localStorage.setItem("userData", JSON.stringify(userDataFromDB));
        localStorage.setItem("name", user.email);
      } catch (error) {
        // If user doesn't exist, create a new user
        if (error.response && error.response.status === 404) {
          await createUserInDatabase(user);
        } else {
          console.error("Error fetching user data:", error);
          setError("Error fetching user data. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error in handleUserData:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  // Function to create a new user in the database
  const createUserInDatabase = async (user) => {
    try {
      const newUser = {
        email: user.email,
        createdAt: new Date().toISOString()
      };

      const response = await axios.post(`${API_URL}/users`, newUser);
      setUserData(response.data);
      localStorage.setItem("userData", JSON.stringify(response.data));
      localStorage.setItem("name", user.email);
    } catch (error) {
      console.error("Error creating user in database:", error);
      setError("Error creating user profile. Please try again.");
    }
  };

  // Form input change handler
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear any previous errors
  };

  // Google sign-in handler
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      handleUserData(user);
    } catch (error) {
      setError(error.message);
    }
  };

  // Email sign-up handler
  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = result.user;
      
      await createUserInDatabase({
        ...user,
        displayName: formData.fullname
      });
    } catch (error) {
      setError(error.message);
    }
  };

  // Email sign-in handler
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      // User data handling is done in the useEffect with onAuthStateChanged
    } catch (error) {
      setError(error.message);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userData");
      localStorage.removeItem("name");
      setUserData(null);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-content">
          {isLoggedIn ? (
            <button className="auth-button logout" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <button className="auth-button login" onClick={() => {setShowAuth(true); setIsLogin(true);}}>
                Log In
              </button>
              <button className="auth-button login" onClick={() => {setShowAuth(true); setIsLogin(false);}}>
                Sign up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      {showAuth && (
        <div className="modal-overlay">
          <div className="auth-modal">
            {/* Modal Header */}
            <div className="modal-header">
              <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
              <button className="close-button" onClick={() => setShowAuth(false)}>
                ×
              </button>
            </div>

            {/* Auth Tabs */}
            <div className="auth-tabs">
              <button
                className={`tab ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                LOGIN
              </button>
              <button
                className={`tab ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                SIGN UP
              </button>
            </div>

            {/* Auth Content */}
            <div className="auth-content">
              {/* Google Sign-in Button */}
              <button className="google-auth-button" onClick={handleGoogleSignIn}>
                <FcGoogle className="google-icon" />
                Continue with Google
              </button>

              <div className="divider">
                <span>or</span>
              </div>

              {/* Error Message */}
              {error && <div className="error-message">{error}</div>}

              {/* Auth Form */}
              <form onSubmit={isLogin ? handleEmailSignIn : handleEmailSignUp}>
                {/* Sign-up Fields */}
                {!isLogin && (
                  <>
                    <div className="form-group">
                      <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="fullname"
                        placeholder="Full Name"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </>
                )}

                {/* Common Fields */}
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-button">
                  {isLogin ? "Sign In" : "Create Account"}
                </button>
              </form>

              {/* Login Footer */}
              {isLogin && (
                <div className="form-footer">
                  <button className="forgot-password" onClick={() => console.log("Forgot password clicked")}>
                    Forgot Password?
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
