"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoIosHeart } from "react-icons/io";
import { FaCircle } from "react-icons/fa6";

export default function Puzzle() {
  const router = useRouter();
  const colors = ["red", "yellow", "blue", "green"];
  const colorClasses = {
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
  };

  // State variables
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [isDisplayingSequence, setIsDisplayingSequence] = useState(false);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [flashColor, setFlashColor] = useState(null);
  const [clickedColor, setClickedColor] = useState(null);
  const [lives, setLives] = useState(3);
  const [showNopes, setShowNopes] = useState(false);
  const [progress, setProgress] = useState(1);
  const [showBear, setShowBear] = useState(false);

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
      { length },
      () => colors[Math.floor(Math.random() * colors.length)]
    );
    setSequence(randomSequence);
    setUserInput([]);
    console.log("Random sequence:", randomSequence);
  };

  // Function to play the sequence with added delay
  const playSequence = async () => {
    setIsDisplayingSequence(true);
    setIsUserTurn(false);

    // Wait for 500ms before starting the sequence
    await new Promise((resolve) => setTimeout(resolve, 500));

    for (let color of sequence) {
      setFlashColor(color);
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
    if (isDisplayingSequence || !isUserTurn || showNopes || showBear) return;

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
        setLives(lives - 1);
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
        // Game over, push to main menu
        alert("Game Over");
        router.push("/main-menu");
      }
    } else if (newInput.length === sequence.length) {
      // User completed the pattern correctly
      if (progress < 3) {
        // Increase progress, extend sequence length, flash bear.png, show new pattern
        setIsUserTurn(false);
        setShowBear(true);
        setTimeout(() => {
          setShowBear(false);
          setProgress(progress + 1);
          generateNewSequence(sequence.length + 1); // Increase sequence length by 1
        }, 1000);
      } else {
        // Progress == 3, flash bear.png and redirect
        setIsUserTurn(false);
        setShowBear(true);
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
        <div className="flex w-[10%]"></div>
        <div className="flex w-[80%] bg-gray-500 rounded-md items-center my-2 py-2 bg-diagonal-stripes">
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
          <div className="flex w-1/2 text-4xl ml-1 font-bold">Level 1</div>
          <div className="flex">
            {[...Array(3)].map((_, index) => (
              <FaCircle
                key={index}
                style={{
                  color: index < progress ? "#90E2AE" : "gray",
                  fontSize: "20px",
                }}
                className="mr-1"
              />
            ))}
          </div>
        </div>
        <div className="flex w-[10%]"></div>
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
      </div>

      {/* Instructions */}
      <p className="mt-6 text-black">
        {isDisplayingSequence
          ? "Watch the sequence"
          : isUserTurn
          ? "Repeat the sequence"
          : ""}
      </p>

      {/* Display the sequences for debugging */}
      <div className="mt-6 text-black">
        <p>Sequence: {sequence.join(", ")}</p>
        <p>User Input: {userInput.join(", ")}</p>
      </div>
    </div>
  );
}