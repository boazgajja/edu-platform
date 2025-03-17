import React, { useState, useEffect, useRef } from "react";
import "./question.css";
function No_of_questions() {
  const addquestionmap = {
    "What is the capital of India?": ["Delhi", "Hyderabad", "Mumbai", "Chennai"],
    "Doe the third world war happen in 2023?": ["Yes", "No"],
    "Wha is the capital of India?": ["Delhi", "Hyderabad", "Mumbai", "Chennai"],
    "Wht is the capital of India?": ["Delhi", "Hyderabad", "Mumbai", "Chennai"]
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [question, setQuestion] = useState(Array(10).fill('not-visited'));
  const [selectedAnswers, setSelectedAnswers] = useState(Array(Object.keys(addquestionmap).length).fill(''));
  const [warningCount, setWarningCount] = useState(0);
  const containerRef = useRef(null);

  // Function to enter fullscreen mode
  const enterFullscreen = () => {
    const element = containerRef.current;
    if (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) { /* Firefox */
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) { /* IE/Edge */
        element.msRequestFullscreen();
      }
    }
  };

  // Enter fullscreen when component mounts
  useEffect(() => {
    enterFullscreen();
  }, []);

  // Handle beforeunload event for exit warnings
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (warningCount < 2) {
        setWarningCount(prevCount => prevCount + 1);
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      } else {
        // Auto-submit after 2 warnings
        endTest();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [warningCount]);

  const handleButton = (index) => {
    setActiveIndex(index);
    const newArrayOfQuestions = [...question];
    console.log(newArrayOfQuestions);
    newArrayOfQuestions[index] = 'visited';
    setQuestion(newArrayOfQuestions);
    console.log(selectedAnswers);
  };

  const handleOptionClick = (option) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[activeIndex] = option;
    console.log(activeIndex);
    setSelectedAnswers(updatedSelectedAnswers);
    
    // Mark question as answered
    const newArrayOfQuestions = [...question];
    newArrayOfQuestions[activeIndex] = 'answered';
    setQuestion(newArrayOfQuestions);
    
    console.log(updatedSelectedAnswers);
  };

  const handleClear = () => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[activeIndex] = '';
    setSelectedAnswers(updatedSelectedAnswers);
    
    // Mark question as visited but not answered
    const newArrayOfQuestions = [...question];
    newArrayOfQuestions[activeIndex] = 'visited';
    setQuestion(newArrayOfQuestions);
  };

  const handleSkip = () => {
    // Mark question as skipped
    const newArrayOfQuestions = [...question];
    newArrayOfQuestions[activeIndex] = 'skipped';
    setQuestion(newArrayOfQuestions);
    
    // Move to next question if not at the end
    if (activeIndex < Object.keys(addquestionmap).length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  function getButtonColor(state, isActive) {
    switch (state) {
      case 'answered':
        return '#22F10D';
      case 'skipped':
        return 'hsl(8, 95%, 50%)';
      case 'not-visited':
        return '#fff';
      case 'visited':
        return 'blue';
      default:
        return '#fff';
    }
  }

  const answeredCount = question.filter(q => q === 'answered').length;
  const notViewedCount = question.filter(q => q === 'not-visited').length;
  const skippedCount = question.filter(q => q === 'skipped').length;

  function startTimer(duration, display) {
    let timer = duration;
    const intervalId = setInterval(function () {
      let minutes = parseInt(timer / 60, 10);
      let seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.textContent = minutes + ":" + seconds;
      if (--timer < 0) {
        clearInterval(intervalId); // Clear the interval when timer reaches 0
        alert("Time's up! Submitting your test.");
        endTest();
      }
    }, 1000);
    return intervalId;
  }

  useEffect(() => {
    var oneHour = 60 * 60;
    var display = document.querySelector('.timer');
    if (display) {
      const interval = startTimer(oneHour, display);
      return () => clearInterval(interval);
    }
  }, []);

  const endTest = () => {
    let score = 0;
    const questions = Object.keys(addquestionmap);
    for (let i = 0; i < questions.length; i++) {
      const currentQuestion = questions[i];
      const currentQuestionOptions = addquestionmap[currentQuestion];
      const selectedAnswer = selectedAnswers[i];
      if (selectedAnswer === currentQuestionOptions[0]) {
        score++;
      }
    }
    // Store score in localStorage before redirecting
    localStorage.setItem('quizScore', score);
    localStorage.setItem('totalQuestions', questions.length);
    window.location.href = "/";
  };

  return (
    <div ref={containerRef}>
      <div>
        <nav>
          <div className="quiz-name">Name of the Quiz</div>
          <div className="details">User details</div>
          <div className="submission">
            <div className="timer"></div>
            <button className="submit-test" onClick={endTest}>Submit Test</button>
          </div>
        </nav>
      </div>
      <div className="main">
        <div className="question-number-container">
          <div className="question-number">
            {question.map((state, index) => (
              <button 
                key={index} 
                className={`qtn ${state} ${index === activeIndex ? 'active' : ''}`} 
                onClick={() => handleButton(index)}
                style={{ backgroundColor: getButtonColor(state, index === activeIndex) }}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="question-info">
            <div className="answered">
              <p>Answered: {answeredCount}</p>
            </div>
            <div className="skipped">
              <p>Skipped: {skippedCount}</p>
            </div>
            <div className="notviewed">
              <p>Not viewed: {notViewedCount}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="question-block">
            <div className="question-details">
              <p>{Object.keys(addquestionmap)[activeIndex]}</p>
            </div>
            <div className="problem-statement">
              <ul>
                {addquestionmap[Object.keys(addquestionmap)[activeIndex]].map((option, index) => (
                  <li key={index} onClick={() => handleOptionClick(option)}>{option}</li>
                ))}
              </ul>
            </div>
            <div className="marks"></div>
          </div>
          <div className="answer">
            <div className="answer-block">
              {addquestionmap[Object.keys(addquestionmap)[activeIndex]].map((option, index) => (
                <div 
                  className={`option ${selectedAnswers[activeIndex] === option ? 'selected' : ''}`} 
                  key={index} 
                  onClick={() => handleOptionClick(option)}
                >
                  <input
                    type="radio"
                    name={`options-${activeIndex}`}
                    checked={selectedAnswers[activeIndex] === option}
                    onChange={() => handleOptionClick(option)}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
            <div className="submission-block">
              <button className="clear" onClick={handleClear}>Clear</button>
              <button className="submit" onClick={handleSkip}>Skip</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default No_of_questions;
