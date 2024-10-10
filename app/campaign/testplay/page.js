"use client";

import { useState, useEffect, useRef } from "react";

export default function TestPlay() {
  const colors = ["red", "yellow", "blue", "green"];

  const colorClasses = {
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
  };

  // Assign notes to each color
  const colorNotes = {
    red: "C4.wav",
    yellow: "E4.wav",
    blue: "G4.wav",
    green: "C5.wav",
  };

  // State variables
  const [sequence, setSequence] = useState([]);
  const [flashColor, setFlashColor] = useState(null);

  // State variable to manage the game start
  const [gameStarted, setGameStarted] = useState(false);

  // Audio context and buffers using useRef to persist across renders
  const audioContextRef = useRef(null);
  const audioBuffersRef = useRef({});

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

  // Initialize audio context and load audio buffers when component mounts
  useEffect(() => {
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
          const response = await fetch(`/sounds/${colorNotes[color]}`);
          if (!response.ok) {
            throw new Error(`Failed to load sound for color: ${color}`);
          }
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
          audioBuffersRef.current[color] = audioBuffer;
        };

        // Load all color sounds
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
      }
    };

    initAudio();
  }, []);

  // Generate the random sequence when the game starts
  useEffect(() => {
    if (gameStarted) {
      generateNewSequence(4); // Set the sequence length
    }
  }, [gameStarted]);

  // Start playing the sequence after it's generated
  useEffect(() => {
    if (sequence.length > 0 && gameStarted) {
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
    console.log("Random sequence:", randomSequence);
  };

  // Function to play a sound using AudioContext
  const playSound = (soundKey) => {
    try {
      if (audioBuffersRef.current[soundKey]) {
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffersRef.current[soundKey];
        source.connect(audioContextRef.current.destination);
        source.start(0);
        console.log(`Playing sound: ${soundKey}`);
      } else {
        console.warn(`Audio buffer not found for sound: ${soundKey}`);
      }
    } catch (error) {
      console.error(`Error playing sound: ${soundKey}`, error);
    }
  };

  // Function to play the sequence with added delay
  const playSequence = async () => {
    // Wait for 1000ms before starting the sequence
    await new Promise((resolve) => setTimeout(resolve, 1000));

    for (let color of sequence) {
      setFlashColor(color);

      // Play the associated sound
      playSound(color);

      await new Promise((resolve) => setTimeout(resolve, 500)); // Show the color for 500ms
      setFlashColor(null);
      await new Promise((resolve) => setTimeout(resolve, 300)); // Pause for 300ms
    }
    // Flash all boxes black to indicate sequence end
    setFlashColor("black");
    await new Promise((resolve) => setTimeout(resolve, 500));
    setFlashColor(null);
  };

  // Determine the className of each color box
  const getClassName = (color) => {
    if (flashColor === "black") {
      return `w-24 h-24 rounded bg-black`;
    }

    let classes = `w-24 h-24 rounded ${colorClasses[color]}`;
    if (flashColor === color) {
      classes += " opacity-100";
    } else {
      classes += " opacity-50";
    }
    return classes;
  };

  // Handle start button click
  const handleStartClick = () => {
    // Play the start button sound
    playSound("start");

    // Start the game immediately
    setGameStarted(true);
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

      {/* Render the sequence only when gameStarted is true */}
      {gameStarted && (
        <>
          {/* Game Board */}
          <div className="bg-white p-8 rounded-md relative">
            <div className="grid grid-cols-2 gap-4">
              {colors.map((color) => (
                <div key={color} className={getClassName(color)}></div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}