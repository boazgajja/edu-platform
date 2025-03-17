// CombinedHomePage.jsx
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
import "./homepage.css";

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

const CombinedHomePage = () => {
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
        localStorage.setItem("name", user.email || user.displayName || " ");
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
      const result = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("name", result.user.email);
      window.location.href = "/home"; // Added redirect
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      console.log(result);
      localStorage.setItem("name", result.user.email);
      window.location.href = "/home"; // Added redirect
      // You can add additional user data to Firestore here if needed
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      localStorage.setItem("name", result.user.email);
      window.location.href = "/home";
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

  const openAuthModal = (isLoginMode = true) => {
    setIsLogin(isLoginMode);
    setShowAuth(true);
  };

  return (
    <div className="homepage">
      {/* Navigation Bar */}
      {/* <nav className="navbar">
        <div className="nav-content">
          <div className="logo">EduConnect</div>
          <div className="nav-links">
            
          </div>
          <div className="auth-buttons">
            {isLoggedIn ? (
              <button className="auth-button logout" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <button className="auth-button login" onClick={() => openAuthModal(true)}>
                  Log In
                </button>
                <button className="auth-button signup" onClick={() => openAuthModal(false)}>
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav> */}

      {/* Auth Modal */}
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

      {/* Hero Section */}
      <section className="hero-section">
        <h1>Ask. Answer. Get Hired.</h1>
        <p>Join the smartest learning community, contribute questions, earn points, and connect with top recruiters.</p>
        {!isLoggedIn && (
          <button className="cta-btn" onClick={() => openAuthModal(false)}>
            Create Your Free Account
          </button>
        )}
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="feature-card">
          <h3>Community Driven Learning</h3>
          <p>Post your questions and challenge peers.</p>
        </div>
        <div className="feature-card">
          <h3>Earn Points & Recognition</h3>
          <p>Answer questions, gain reputation, and climb the leaderboard.</p>
        </div>
        <div className="feature-card">
          <h3>Direct Recruiter Interaction</h3>
          <p>Chat with recruiters, schedule meetings, and secure job opportunities.</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonial-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <p>"This platform helped me land my dream job!"</p>
            <span>- Priya Sharma, Software Engineer</span>
          </div>
          <div className="testimonial-card">
            <p>"The community here is incredibly supportive and knowledgeable."</p>
            <span>- Rahul Verma, Data Scientist</span>
          </div>
          <div className="testimonial-card">
            <p>"I improved my technical skills and got noticed by top companies."</p>
            <span>- Ananya Patel, Frontend Developer</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} EduConnect. All rights reserved.
      </footer>
    </div>
  );
};

export default CombinedHomePage;
