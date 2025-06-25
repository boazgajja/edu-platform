import React, { useState, useEffect } from "react";
import "./QuestionsDisplayPage.css";
import { FaHeart, FaRegHeart, FaThumbsDown } from "react-icons/fa";

function QuestionsDisplayPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://edu-platform-8cp6.onrender.com/api/question");
      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      // Shuffle the questions array for random order
      const shuffledQuestions = [...data].sort(() => Math.random() - 0.5);
      setQuestions(shuffledQuestions);
    } catch (err) {
      console.error(err);
      setError("Failed to load questions.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, selectedOption) => {
    if (!userAnswers[questionId]) {
      setUserAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
    }
  };

  const toggleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
    if (dislikes[id]) setDislikes((prev) => ({ ...prev, [id]: false }));
  };

  const toggleDislike = (id) => {
    setDislikes((prev) => ({ ...prev, [id]: !prev[id] }));
    if (likes[id]) setLikes((prev) => ({ ...prev, [id]: false }));
  };

  if (loading)
    return (
      <div className="loading-overlay">
        <div className="loading-content">
          <div className="spinner"></div>
          <p className="loading-text">Loading questions...</p>
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
        <button className="retry-button" onClick={fetchQuestions}>
          Try Again
        </button>
      </div>
    );

  return (
    <div className="questions-page">
      <header className="page-header">
        <h1>Community Questions</h1>
        <p className="subtitle">Test your knowledge with these community-created questions</p>
      </header>

      <div className="questions-container">
        {questions.map((q) => (
          <div 
            key={q._id || q.id} 
            className="question-card"
          >
            <div className="question-header">
              <h3>{q.question}</h3>
              {q.name && q.name.includes('@') 
                ? q.name.substring(0, q.name.indexOf('@')) 
                : q.name || 'Anonymous'}
            </div>
              
            <div className="question-content">
              <ul className="options-list">
                {q.options.map((opt, idx) => {
                  const isSelected = userAnswers[q._id] === opt;
                  const isAnswered = userAnswers[q._id];
                  const isCorrectAnswer = q.answer === opt;

                  return (
                    <li
                      key={idx}
                      className={`option-item ${
                        isAnswered
                          ? isCorrectAnswer
                            ? "correct-option"
                            : isSelected
                            ? "incorrect-option"
                            : ""
                          : "selectable-option"
                      }`}
                      onClick={() => handleAnswerSelect(q._id, opt)}
                    >
                      <span className="option-marker">{String.fromCharCode(65 + idx)}</span>
                      <span className="option-text">{opt}</span>
                      {isAnswered && isCorrectAnswer && <span className="check-mark">✓</span>}
                      {isAnswered && isSelected && !isCorrectAnswer && <span className="cross-mark">✗</span>}
                    </li>
                  );
                })}
              </ul>

              {userAnswers[q._id] && (
                <div
                  className={`answer-feedback ${
                    userAnswers[q._id] === q.answer ? "correct-feedback" : "incorrect-feedback"
                  }`}
                >
                  {userAnswers[q._id] === q.answer
                    ? "✅ Correct! Well done."
                    : `❌ Incorrect. The correct answer is: ${q.answer}`}
                </div>
              )}

              <div className="interaction-bar">
                <button 
                  className={`like-button ${likes[q._id] ? 'active' : ''}`}
                  onClick={() => toggleLike(q._id)}
                >
                  {likes[q._id] ? <FaHeart /> : <FaRegHeart />}
                  <span>Like</span>
                </button>
                <button 
                  className={`dislike-button ${dislikes[q._id] ? 'active' : ''}`}
                  onClick={() => toggleDislike(q._id)}
                >
                  <FaThumbsDown />
                  <span>Dislike</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {questions.length === 0 && !loading && !error && (
        <div className="no-questions">
          <div className="empty-icon">📋</div>
          <h2>No Questions Available</h2>
          <p>Check back later or be the first to contribute a question!</p>
        </div>
      )}
    </div>
  );
}

export default QuestionsDisplayPage;
