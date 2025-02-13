import React, { useState, useEffect } from 'react';

const QuestionBox = () => {
  const [correctnessMap, setCorrectnessMap] = useState(new Map());
  const [questions, setQuestions] = useState(new Map()); // Initialize questions state as a Map

  useEffect(() => {
    fetch('http://localhost/practice1/PHP/contributed.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Transform data into a Map
        const questionsMap = new Map();

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const questionData = data[key];
            questionsMap.set(key, questionData);
          }
        }

        setQuestions(questionsMap);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleOptionClick = (questionKey, option) => {
    const currentQuestion = questions.get(questionKey);
    const correctAnswer = currentQuestion.answer;

    const newCorrectnessMap = new Map(correctnessMap);
    newCorrectnessMap.set(questionKey, option === correctAnswer);
    setCorrectnessMap(newCorrectnessMap);
  };

  return (
    <div className="question-box" style={{ width: '500px' }}>
      {[...questions.keys()].map((questionKey) => {
        const { question, options } = questions.get(questionKey);
        const isCorrect = correctnessMap.get(questionKey);

        return (
          <div key={questionKey} className="question">
            <h2>{question}</h2>
            <div className="options">
              {options.map((option, index) => (
                <div key={index} className="option" onClick={() => handleOptionClick(questionKey, option)}>
                  {option}
                </div>
              ))}
            </div>
            {isCorrect !== undefined && (
              <div className={`result ${isCorrect ? 'correct' : 'wrong'}`}>
                {isCorrect ? (
                  <p className="correct">Correct!</p>
                ) : (
                  <p className="wrong">Wrong!</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuestionBox;
