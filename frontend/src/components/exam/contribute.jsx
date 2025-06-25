import React, { useState, useEffect } from "react";
import "./contribute.css";

function ContributeQuestionPage() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [userName, setUserName] = useState("");

  // Fetch the name from localStorage when component mounts
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    
    // Get the name directly from localStorage at submission time
    // This ensures we have the most up-to-date value
    const name = localStorage.getItem("name");
    
    const questionData = {
      question,
      options,
      answer: selectedAnswer,
      name: name
    };

    try {
      console.log("Sending data:", questionData); // Debug log to verify data
      
      const response = await fetch("https://edu-platform-8cp6.onrender.com/api/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
      });

      const data = await response.json();
      if (response.ok) {
        setSubmitMessage({
          type: "success",
          text: "Question submitted successfully!"
        });
        setQuestion("");
        setOptions(["", "", "", ""]);
        setSelectedAnswer("");
      } else {
        setSubmitMessage({
          type: "error",
          text: `Error: ${data.error || "Failed to submit"}`
        });
      }
    } catch (error) {
      console.error("Error submitting question:", error);
      setSubmitMessage({
        type: "error",
        text: "Failed to submit question. Network error."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Contribute a Question</h1>
        <p>Help grow our collection by contributing your own questions</p>
        {userName && <p>Contributing as: {userName && userName.includes('@') 
                ? userName.substring(0, userName.indexOf('@')) 
                : userName || 'Anonymous'}</p>}
      </div>

      <div className="contribute-card">
        {submitMessage && (
          <div className={`alert ${submitMessage.type === "success" ? "alert-success" : "alert-error"}`}>
            {submitMessage.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="contribute-form">
          <div className="form-group">
            <label htmlFor="question">Your Question:</label>
            <input
              type="text"
              id="question"
              name="question"
              value={question}
              onChange={handleQuestionChange}
              required
              className="form-control"
              placeholder="Type your question here"
            />
          </div>
          
          <div className="form-group">
            <label>Answer Options:</label>
            <div className="options-container">
              {options.map((option, index) => (
                <div key={index} className="option-input-group">
                  <div className="option-label">Option {index + 1}</div>
                  <input
                    type="text"
                    className="form-control"
                    value={option}
                    onChange={(event) => handleOptionChange(index, event)}
                    required
                    placeholder={`Enter option ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="answer">Correct Answer:</label>
            <select
              id="answer"
              name="answer"
              value={selectedAnswer}
              onChange={handleAnswerChange}
              required
              className="form-control"
            >
              <option value="">-- Select the correct answer --</option>
              {options.filter(option => option.trim() !== "").map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            className="primary-button" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Question"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContributeQuestionPage;
