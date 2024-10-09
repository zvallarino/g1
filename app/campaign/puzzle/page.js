"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { IoIosHeart } from "react-icons/io";
import { FaCircle } from "react-icons/fa6";
import { QuestionContext } from "../../context/QuestionContext"; // Adjust the relative path

export default function Puzzle() {
  const router = useRouter();
  const colors = ["red", "yellow", "blue", "green"];
  const { lives, setLives, progress, setProgress, level, setLevel } =
    useContext(QuestionContext);

  const colorClasses = {
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
  };

  // Assign notes to each color
  const colorNotes = {
    red: "C4",
    yellow: "E4",
    blue: "G4",
    green: "C5",
  };

  // State variables
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [isDisplayingSequence, setIsDisplayingSequence] = useState(false);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [flashColor, setFlashColor] = useState(null);
  const [clickedColor, setClickedColor] = useState(null);

  const [showNopes, setShowNopes] = useState(false);
  const [showBear, setShowBear] = useState(false);
  const [showLostGame, setShowLostGame] = useState(false); // New state variable

  // Set the CSS variable for viewport height
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  // Generate the random sequence when the component mounts
  useEffect(() => {
    generateNewSequence(progress + 2); // Start with length 3
  }, []);

  // Start playing the sequence after it's generated
  useEffect(() => {
    if (sequence.length > 0) {
      playSequence();
    }
  }, [sequence]);

  // Function to generate a new random sequence with given length
  const generateNewSequence = (length) => {
    
    const randomSequence = Array.from(
      { length: length + level - 1 },
      () => colors[Math.floor(Math.random() * colors.length)]
    );
    setSequence(randomSequence);
    setUserInput([]);
    console.log("Random sequence:", randomSequence);
  };

  // Function to play a sound
  const playSound = (fileName) => {
    const audio = new Audio(`/sounds/${fileName}`);
    audio.play();
  };

  // Function to play the sequence with added delay
  const playSequence = async () => {
    setIsDisplayingSequence(true);
    setIsUserTurn(false);

    // Wait for 500ms before starting the sequence
    await new Promise((resolve) => setTimeout(resolve, 1000));

    for (let color of sequence) {
      setFlashColor(color);

      // Play the associated sound
      playSound(`${colorNotes[color]}.wav`);

      await new Promise((resolve) => setTimeout(resolve, 500)); // Show the color for 500ms
      setFlashColor(null);
      await new Promise((resolve) => setTimeout(resolve, 300)); // Pause for 300ms
    }
    // Flash all boxes black to indicate user's turn
    setFlashColor("black");
    await new Promise((resolve) => setTimeout(resolve, 500));
    setFlashColor(null);

    setIsDisplayingSequence(false);
    setIsUserTurn(true);
  };

  // Handle user input
  const handleClick = (color) => {
    if (isDisplayingSequence || !isUserTurn || showNopes || showBear || showLostGame)
      return;

    // Play the associated sound
    playSound(`${colorNotes[color]}.wav`);

    // Flash the clicked color
    setClickedColor(color);
    setTimeout(() => {
      setClickedColor(null);
    }, 200);

    const newInput = [...userInput, color];
    const currentIndex = newInput.length - 1;
    console.log("User input:", newInput);

    // Check if the user's input matches the sequence
    if (sequence[currentIndex] !== color) {
      if (lives > 1) {
        // Decrease lives
        setLives((prevLives) => prevLives - 1);

        // Play lost life sound
        playSound("lostlife.mp3");

        // Flash nopes.png
        setIsUserTurn(false);
        setShowNopes(true);
        setTimeout(() => {
          setShowNopes(false);
          // Wait for 500ms before starting the new sequence
          setTimeout(() => {
            generateNewSequence(sequence.length); // Regenerate the same length
          }, 500);
        }, 1000);
      } else {
        // Game over, play lost game sound and show image
        setLives(0);

        // Play lost game sound
        playSound("lostgame.mp3");

        setIsUserTurn(false);
        setShowLostGame(true);
        setTimeout(() => {
          setShowLostGame(false);
          setLives(3);
          setLevel(1);
          setProgress(1);
          router.push("/main-menu");
        }, 2000);
      }
    } else if (newInput.length === sequence.length) {
      // User completed the pattern correctly
      if (progress < 3) {
        // Increase progress, extend sequence length, flash bear.png, show new pattern
        setIsUserTurn(false);
        setShowBear(true);

        // Play level up sound
        playSound("levelup.mp3");

        setTimeout(() => {
          setShowBear(false);
          setProgress((prevProgress) => prevProgress + 1);
          generateNewSequence(sequence.length + 1); // Increase sequence length by 1
        }, 1000);
      } else {
        // Progress == 3, level up, play level up sound, and redirect
        setIsUserTurn(false);
        setShowBear(true);

        // Play level up sound
        playSound("level-passed.mp3");

        setLevel((prevLevel) => prevLevel + 1);
        setProgress(1);
        setTimeout(() => {
          setShowBear(false);
          router.push("/campaign/advice");
        }, 1000);
      }
    } else {
      // Continue collecting user input
      setUserInput(newInput);
    }
  };

  // Determine the className of each color box
  const getClassName = (color) => {
    if (flashColor === "black") {
      return `w-24 h-24 rounded bg-black`;
    }

    let classes = `w-24 h-24 rounded ${colorClasses[color]}`;
    if (flashColor === color || clickedColor === color) {
      classes += " opacity-100";
    } else {
      classes += " opacity-50";
    }
    return classes;
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-screen relative"
      style={{
        height: "calc(var(--vh, 1vh) * 100)",
        backgroundImage: "url(/images/spring-wallpaper.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <div className="flex w-full">
        <div className="flex w-[15%]"></div>
        <div className="flex w-[75%] bg-gray-500 rounded-md items-center my-2 py-2 bg-diagonal-stripes">
          {/* Hearts Div */}
          <div className="flex w-[30%]">
            {[...Array(3)].map((_, index) => (
              <IoIosHeart
                key={index}
                style={{
                  color: index < lives ? "red" : "black",
                  fontSize: "24px",
                }}
                className="ml-1"
              />
            ))}
          </div>
          {/* Level Div */}
          <div className="flex w-[50%] text-4xl font-bold justify-center">
            Level {level}
          </div>
          {/* Circles Div */}
          <div className="flex w-[20%] justify-end">
            {[...Array(3)].map((_, index) => (
              <FaCircle
                key={index}
                style={{
                  color: index < progress ? "#90E2AE" : "gray",
                  fontSize: "20px",
                }}
                className={`ml-1 ${index === 2 ? "mr-1" : ""}`}
              />
            ))}
          </div>
        </div>
        <div className="flex w-[15%]"></div>
      </div>

      {/* Game Board */}
      <div className="bg-white p-8 rounded-md relative">
        <div className="grid grid-cols-2 gap-4">
          {colors.map((color) => (
            <div
              key={color}
              onClick={() => handleClick(color)}
              className={getClassName(color)}
            ></div>
          ))}
        </div>

        {/* Flash nopes.png overlay */}
        {showNopes && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <img src="/images/nopes.png" alt="Nope" />
          </div>
        )}

        {/* Flash bear.png overlay */}
        {showBear && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <img src="/images/bear.png" alt="Bear" />
          </div>
        )}

        {/* Flash lostgame.png overlay */}
        {showLostGame && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <img src="/images/lostgame.png" alt="Game Over" />
          </div>
        )}
      </div>

      {/* Instructions */}
      <p className="mt-6 text-black">
        {isDisplayingSequence
          ? "Watch the sequence"
          : isUserTurn
          ? "Repeat the sequence"
          : ""}
      </p>

    </div>
  );
}
