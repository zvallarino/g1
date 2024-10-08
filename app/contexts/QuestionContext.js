// app/contexts/QuestionContext.js
'use client';
import { createContext, useState } from 'react';

export const QuestionContext = createContext();

export function QuestionProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userChoice, setUserChoice] = useState(null);

  return (
    <QuestionContext.Provider
      value={{
        questions,
        setQuestions,
        currentQuestion,
        setCurrentQuestion,
        userChoice,
        setUserChoice,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}