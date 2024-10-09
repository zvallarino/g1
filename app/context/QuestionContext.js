// app/contexts/QuestionContext.js
'use client';
import { createContext, useState } from 'react';

export const QuestionContext = createContext();

export function QuestionProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [userChoice, setUserChoice] = useState(null);
  const [lives, setLives] = useState(3);
  const [progress, setProgress] = useState(1);
  const [level, setLevel] = useState(1);



  return (
    <QuestionContext.Provider
      value={{
        questions,
        setQuestions,
        currentQuestion,
        setCurrentQuestion,
        currentAnswers, 
        setCurrentAnswers,
        userChoice,
        setUserChoice,
        lives, 
        setLives, 
        progress, 
        setProgress, 
        level, 
        setLevel
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}