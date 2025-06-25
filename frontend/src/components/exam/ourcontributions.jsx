import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./QuestionsDisplayPage.css";
import { FaTrash } from "react-icons/fa";

function MyQuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyQuestions();
  }, []);

  const fetchMyQuestions = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get the user's name from localStorage
      const userName = localStorage.getItem("name");
      if (!userName) {
        setError("You need to be logged in to view your questions");
        setLoading(false);
        return;
      }

      // Fetch questions filtered by the user's name
      const response = await fetch(`https://edu-platform-8cp6.onrender.com/api/question?name=${encodeURIComponent(userName)}`);
      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      setQuestions(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load your questions.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm("Are you sure you want to delete this question?")) {
      return;
    }

    try {
      const response = await fetch(`https://edu-platform-8cp6.onrender.com/api/question/${questionId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete question");
      }

      // Remove the deleted question from the state
      setQuestions(questions.filter(q => q._id !== questionId));
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Failed to delete question. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="loading-overlay">
        <div className="loading-content">
          <div className="spinner"></div>
          <p className="loading-text">Loading your questions...</p>
          <p className="loading-subtext">Please wait while we prepare your questions</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <div className="error-icon">❌</div>
        <h2 className="error-title">Oops! Something went wrong</h2>
        <p className="error-message">{error}</p>
        <button className="retry-button" onClick={fetchMyQuestions}>
          Try Again
        </button>
      </div>
    );

  return (
    <div className="questions-page">
      <header className="page-header">
        <h1>My Questions</h1>
        <p className="subtitle">Manage the questions you've contributed</p>
      </header>

      <div className="questions-container">
        {questions.map((q) => (
          <div 
            key={q._id || q.id} 
            className="question-card"
          >
            <div className="question-header">
              <h3>{q.question}</h3>
              <button 
                className="delete-button"
                onClick={() => handleDeleteQuestion(q._id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
              
            <div className="question-content">
              <ul className="options-list">
                {q.options.map((opt, idx) => {
                  const isCorrectAnswer = q.answer === opt;

                  return (
                    <li
                      key={idx}
                      className={`option-item ${isCorrectAnswer ? "correct-option" : ""}`}
                    >
                      <span className="option-marker">{String.fromCharCode(65 + idx)}</span>
                      <span className="option-text">{opt}</span>
                      {isCorrectAnswer && <span className="check-mark">✓</span>}
                    </li>
                  );
                })}
              </ul>

              <div className="correct-answer-display">
                <strong>Correct Answer:</strong> {q.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {questions.length === 0 && !loading && !error && (
        <div className="no-questions">
          <div className="empty-icon">📋</div>
          <h2>No Questions Available</h2>
          <p>You haven't contributed any questions yet. Go to the contribute page to add some!</p>
          <button 
            className="primary-button" 
            onClick={() => navigate('/contribute')}
            style={{ marginTop: '20px' }}
          >
            Create Question
          </button>
        </div>
      )}
    </div>
  );
}

export default MyQuestionsPage;
