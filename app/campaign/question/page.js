'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState, useRef, useContext } from 'react';
import { QuestionContext } from '../../context/QuestionContext'; // Adjust the relative path
import questions from '../../../questions.json'; // Adjust the path if necessary

// Reusable components for better organization
const Spacer = ({ className }) => <div className={`hidden md:block ${className}`}></div>;

const DialogueBox = ({ questionText }) => (
  <div className="flex items-center bg-white border-4 rounded-md border-black p-4 mb-4">
    <p className="text-2xl md:text-4xl font-bold text-center text-black">
      {questionText}
    </p>
  </div>
);

const OptionButton = ({ onClick, text }) => (
  <button
    onClick={onClick}
    className="relative px-6 py-3 mx-2 text-white font-bold text-xl rounded-md md:text-2xl tracking-wider uppercase bg-gradient-to-r from-red-600 to-yellow-500 shadow-lg transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0px_0px_20px_#ff00ff,0px_0px_20px_#ff00ff]"
  >
    {text}
  </button>
);

const GirlImage = () => (
  <div className="w-full flex justify-end">
    <Image
      src="/images/MainGirl.png"
      alt="Girl"
      width={600}
      height={600}
      className="w-full md:max-w-md"
    />
  </div>
);

export default function Question() {
  const router = useRouter();
  const {
    currentQuestion,
    setCurrentQuestion,
    currentAnswers,
    setCurrentAnswers,
  } = useContext(QuestionContext);

  // Audio context and buffer using useRef to persist across renders
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);

  // Initialize audio context and load audio buffer when component mounts
  useEffect(() => {
    const initAudio = async () => {
      try {
        // Create or resume the AudioContext
        if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        } else if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        // Load the button sound
        const response = await fetch('/sounds/startbutton.mp3');
        if (!response.ok) {
          throw new Error('Failed to load start button sound');
        }
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
        audioBufferRef.current = audioBuffer;

        console.log('Audio initialized successfully');
      } catch (error) {
        console.error('Error initializing audio:', error);
      }
    };

    initAudio();
  }, []);

  // Function to play the sound using AudioContext
  const playSound = () => {
    try {
      if (audioBufferRef.current) {
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBufferRef.current;
        source.connect(audioContextRef.current.destination);
        source.start(0);
        console.log('Playing sound: startbutton');
      } else {
        console.warn('Audio buffer not found for start button sound');
      }
    } catch (error) {
      console.error('Error playing sound: startbutton', error);
    }
  };

  useEffect(() => {
    // Select a random question from the questions array
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setCurrentAnswers(questions[randomIndex].answers);
    console.log(questions[randomIndex].answers);
  }, []);

  const handleOptionClick = (selectedOption) => {
    // Play the sound effect before navigating
    playSound();

    // Delay navigation slightly to allow the sound to play
    setTimeout(() => {
      // Navigate to the result page with the selected choice and question ID
      router.push(
        `/campaign/result?choice=${encodeURIComponent(selectedOption)}&questionId=${currentQuestion.id}`
      );
    }, 200); // Adjust delay based on sound length if needed
  };

  if (!currentQuestion) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="flex flex-col md:flex-row items-center md:items-end justify-center w-screen"
      style={{
        height: 'calc(var(--vh, 1vh) * 100)',
        backgroundImage: 'url(/images/anime_city.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col md:flex-row items-center h-full w-full">
        {/* Left Spacer */}
        <Spacer className="md:w-1/4 bg-blue-200" />

        {/* Middle Section */}
        <div className="w-full md:w-1/4 h-1/2 flex flex-col items-end justify-end">
          <div className="h-8 md:h-1/2"></div>
          {/* Dialogue Box */}
          <DialogueBox questionText={currentQuestion.question} />
          {/* Option Buttons with Sound */}
          <div className="flex justify-center mt-4 w-full">
            {currentQuestion.answers.map((option) => (
              <OptionButton
                key={option}
                text={option}
                onClick={() => handleOptionClick(option)}
              />
            ))}
          </div>
          <div className="h-8 md:h-1/4"></div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 h-[70%] flex flex-col justify-end ">
          {/* Girl Image */}
          <GirlImage />
        </div>

        {/* Right Spacer */}
        <Spacer className="md:w-1/4 bg-blue-200" />
      </div>
    </div>
  );
}