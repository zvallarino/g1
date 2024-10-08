"use client"

import { useState, useEffect, useRef } from "react";

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
  const [gameStarted, setGameStarted] = useState(false);
  const [debugMessages, setDebugMessages] = useState([]);

  // Audio context and buffers using useRef to persist across renders
  const audioContextRef = useRef(null);
  const audioBuffersRef = useRef({});

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
    try {
      // Create or resume the AudioContext
      if (!audioContextRef.current || audioContextRef.current.state === "closed") {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      } else if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume();
      }

      // Load audio buffers if not already loaded
      const loadSound = async (color) => {
        const response = await fetch(`/sounds/${colorNotes[color]}.wav`);
        console.log(`i fired`);
        console.log(`/sounds/${colorNotes[color]}.wav`);
        if (!response.ok) {
          throw new Error(`Failed to load sound for color: ${color}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
        audioBuffersRef.current[color] = audioBuffer;
      };

      // Load all sounds
      await Promise.all(colors.map((color) => loadSound(color)));

      // Load start button sound
      const startResponse = await fetch("/sounds/startbutton.mp3");
      if (!startResponse.ok) {
        throw new Error("Failed to load start button sound");
      }
      const startArrayBuffer = await startResponse.arrayBuffer();
      const startBuffer = await audioContextRef.current.decodeAudioData(startArrayBuffer);
      audioBuffersRef.current["start"] = startBuffer;

      console.log("Audio initialized successfully");
    } catch (error) {
      console.error("Error initializing audio:", error);
      setDebugMessages((msgs) => [...msgs, error.message]);
    }
  };

  // Function to play a sound using AudioContext
  const playSound = (color) => {
    try {
      if (audioBuffersRef.current[color]) {
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffersRef.current[color];
        source.connect(audioContextRef.current.destination);
        source.start(0);
        console.log(`Playing sound for color: ${color}`);
      } else {
        console.warn(`Audio buffer not found for color: ${color}`);
        setDebugMessages((msgs) => [
          ...msgs,
          `Audio buffer not found for color: ${color}`,
        ]);
      }
    } catch (error) {
      console.error(`Error playing sound for color: ${color}`, error);
      setDebugMessages((msgs) => [
        ...msgs,
        `Error playing sound for color: ${color}`,
      ]);
    }
  };

  // Handle user input
  const handlePress = (color) => {
    console.log(`handlePress fired for color: ${color}`);
    setDebugMessages((msgs) => [...msgs, `handlePress: ${color}`]);
    playSound(color);
    setClickedColor(color);
  };

  const handleRelease = () => {
    console.log("handleRelease fired");
    setDebugMessages((msgs) => [...msgs, "handleRelease"]);
    setClickedColor(null);
  };

  // Handle start button click
  const handleStartClick = async () => {
    console.log("Start button clicked");
    setDebugMessages((msgs) => [...msgs, "Start button clicked"]);
    await initAudio();
    playSound("start");
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

          {/* Debug Messages */}
          <div className="mt-4 p-4 bg-gray-100 rounded-md w-3/4 max-w-md text-black">
            <h2 className="text-lg font-bold mb-2">Debug Log:</h2>
            {debugMessages.slice(-5).map((msg, index) => (
              <p key={index} className="text-sm">
                {msg}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
