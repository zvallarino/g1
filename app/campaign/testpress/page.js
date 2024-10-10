"use client";

import { useState, useEffect } from "react";

export default function TestPress() {
  const colors = ["red", "yellow", "blue", "green"];

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
  const [clickedColor, setClickedColor] = useState(null);

  // State variable to manage the game start
  const [gameStarted, setGameStarted] = useState(false);

  // Audio context and buffers
  let audioContext;
  const audioBuffers = {};

  useEffect(() => {
    // Set the CSS variable for viewport height
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  // Function to initialize AudioContext and load audio buffers
  const initAudio = async () => {
    // Create or resume the AudioContext
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } else if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    // Load audio buffers if not already loaded
    const loadSound = async (color) => {
      const response = await fetch(`/sounds/${colorNotes[color]}.wav`);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      audioBuffers[color] = audioBuffer;
    };

    // Load all sounds
    await Promise.all(colors.map((color) => loadSound(color)));

    // Load start button sound
    const startResponse = await fetch("/sounds/startbutton.mp3");
    const startArrayBuffer = await startResponse.arrayBuffer();
    const startBuffer = await audioContext.decodeAudioData(startArrayBuffer);
    audioBuffers["start"] = startBuffer;
  };

  // Function to play a sound using AudioContext
  const playSound = (color) => {
    if (audioBuffers[color]) {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffers[color];
      source.connect(audioContext.destination);
      source.start(0);
    }
  };

  // Handle user input
  const handlePress = (color) => {
    // Play the associated sound
    playSound(color);

    // Flash the clicked color
    setClickedColor(color);
  };

  const handleRelease = () => {
    // Reset the clicked color
    setClickedColor(null);
  };

  // Handle start button click
  const handleStartClick = async () => {
    // Initialize AudioContext and load sounds
    await initAudio();

    // Play the start button sound
    playSound("start");

    // Proceed immediately
    setGameStarted(true);
  };

  // Determine the className of each color box
  const getClassName = (color) => {
    let classes = `w-24 h-24 rounded ${colorClasses[color]}`;
    if (clickedColor === color) {
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
      {/* Overlay with ready.jpg and Start button */}
      {!gameStarted && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50">
          <img
            src="/images/ready.jpg"
            alt="Ready"
            className="mb-4 w-3/4 max-w-md"
          />
          <button
            onClick={handleStartClick}
            className="bg-green-500 text-white px-6 py-3 rounded-md text-2xl font-bold hover:bg-green-600 transition-all duration-300"
          >
            Start
          </button>
        </div>
      )}

      {/* Render the game only when gameStarted is true */}
      {gameStarted && (
        <>
          {/* Game Board */}
          <div className="bg-white p-8 rounded-md relative">
            <div className="grid grid-cols-2 gap-4">
              {colors.map((color) => (
                <div
                  key={color}
                  onTouchStart={() => handlePress(color)}
                  onTouchEnd={handleRelease}
                  className={getClassName(color)}
                ></div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
