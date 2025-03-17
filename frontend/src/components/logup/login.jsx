// AuthComponent.jsx
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
import { FcGoogle } from 'react-icons/fc'; // Make sure to install react-icons
import "./login.css";
// localStorage.setItem("name", " ");
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

const AuthComponent = () => {
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      if (user) {
        setShowAuth(false);
        
      }
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear any previous errors
  };

  const handleGoogleSignIn = async () => {
    try {
      const user=await signInWithPopup(auth, googleProvider);
      console.log(user);
      localStorage.setItem("name", user.user.email);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      const user=await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      console.log(user);

      // You can add additional user data to Firestore here if needed
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      const user=await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log(user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <nav className="navbar">
        <div className="nav-content">
          {isLoggedIn ? (
            <button className="auth-button logout" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
            <button className="auth-button login" onClick={() => setShowAuth(true)}>
              Log In
            </button>
            <button className="auth-button login" onClick={() => setShowAuth(true)}>
            Sign up
          </button>
          </>
          )}
        </div>
      </nav>

      {showAuth && (
        <div className="modal-overlay">
          <div className="auth-modal">
            <div className="modal-header">
              <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
              <button className="close-button" onClick={() => setShowAuth(false)}>
                ×
              </button>
            </div>

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

            <div className="auth-content">
              <button className="google-auth-button" onClick={handleGoogleSignIn}>
                <FcGoogle className="google-icon" />
                Continue with Google
              </button>

              <div className="divider">
                <span>or</span>
              </div>

              {error && <div className="error-message">{error}</div>}

              <form onSubmit={isLogin ? handleEmailSignIn : handleEmailSignUp}>
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

                <button type="submit" className="submit-button">
                  {isLogin ? "Sign In" : "Create Account"}
                </button>
              </form>

              {isLogin && (
                <div className="form-footer">
                  <a href="#" className="forgot-password">
                    Forgot Password?
                  </a>
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