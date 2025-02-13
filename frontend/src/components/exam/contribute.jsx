import React, { useState } from "react";
// import "./QuestionForm.css"; // Import CSS file for styling

function QuestionForm() {
  // State variables to store question, options, and selected answer
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  // Function to handle changes in question input
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  // Function to handle changes in option inputs
  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  // Function to handle selection of answer
  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Log form data before sending
    console.log("Form Data:", {
      question: question,
      options: options,
      answer: selectedAnswer
    });
  
    // Convert options array to a JSON string
    const optionsJson = JSON.stringify(options);
  
    // Create a new FormData object to store form data
    const formData = new FormData(event.target);
  
    // Append the options JSON string to the form data
    formData.append('options', optionsJson);
  
    // Log form data after appending options
    console.log("Form Data After Appending Options:", formData);
  
    // Send a POST request to the server with form data
    fetch(`http://localhost/practice1/PHP/contribute.php`, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      console.log("Response:", data);
      // Parse the response as JSON
      try {
        const jsonData = JSON.parse(data);
        if (jsonData === 'success') {
          console.log('Question submitted successfully');
          window.location.href = '/home';
          alert("Your question was successfully submitted.");
          // You may want to redirect or show a success message here
        } else {
          console.error('Question submission failed');
          // Handle question submission failure
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    })
    .catch(error => console.error('Error fetching data:', error));
  };
  
  
  

  return (
    <div className="question-form-container">
      <form action="http://localhost/practice1/PHP/contribute.php" method="post" onSubmit={handleSubmit} className="question-form">
        <div className="question-input">
          <label htmlFor="question" >Question:</label>
          <input
            type="text"
            id="question"
            name="question"
            value={question}
            onChange={handleQuestionChange}
            required
            className="question-text-input"
          />
        </div>
        <label style={{ marginBottom: "50px" }} >Options:</label>
        <div className="options-container">
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              name="options[]"
              className="option-input"
              value={option}
              onChange={(event) => handleOptionChange(index, event)}
              required
            />
          ))}
        </div>
        <div className="answer-dropdown">
          <label htmlFor="answer">Answer:</label>
          <select
            id="answer"
            name="answer"
            value={selectedAnswer}
            onChange={handleAnswerChange}
            required
            className="drop"
          >
            <option value="">Select Answer</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button className="btn" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default QuestionForm;
