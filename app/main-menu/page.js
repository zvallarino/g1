'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function MainMenu() {
  const router = useRouter();

  // Using useRef to store the audio context
  const buttonSoundRef = useRef(null);

  useEffect(() => {
    // Set the CSS variable for viewport height
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  useEffect(() => {
    // Preload the button pressed sound
    buttonSoundRef.current = new Audio('/sounds/buttonpressed.mp3');
  }, []);

  // Function to play the button press sound and navigate
  const handleButtonClick = (path) => {
    // Play the sound
    if (buttonSoundRef.current) {
      buttonSoundRef.current.currentTime = 0; // Reset the sound to the beginning
      buttonSoundRef.current.play();
    }

    // Delay navigation slightly to allow the sound to play
    setTimeout(() => {
      router.push(path);
    }, 200); // Adjust this delay based on the sound length if needed
  };

  return (
    <div
      className="flex items-center justify-center w-screen"
      style={{
        height: 'calc(var(--vh, 1vh) * 100)',
        backgroundImage: 'url(/images/phoneWall.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col bg-gray-100 p-4 border-2 border-black rounded-md items-center justify-between space-y-4">
        <h1 className="text-4xl font-bold text-black">Main Menu</h1>
        <button
          onClick={() => handleButtonClick('/campaign')}
          className="w-40 px-4 py-2 bg-green-400 text-2xl text-white rounded"
        >
          Campaign
        </button>
        <button
          className="w-40 px-4 py-2 bg-red-300 text-2xl text-white rounded"
          onClick={() => handleButtonClick('/campaign/testpress')}
        >
          Settings
        </button>
        <button
          className="w-40 px-4 py-2 bg-blue-400 text-2xl text-white rounded"
          onClick={() => handleButtonClick('/campaign/testplay')}
        >
          Credits
        </button>
      </div>
    </div>
  );
}