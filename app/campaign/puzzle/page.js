'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Puzzle() {
  const router = useRouter();
  const colors = ['red', 'yellow', 'blue', 'green'];
  const colorClasses = {
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
  };

  // State variables
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [isDisplayingSequence, setIsDisplayingSequence] = useState(false);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [flashColor, setFlashColor] = useState(null);
  const [clickedColor, setClickedColor] = useState(null);

  // Generate the random sequence when the component mounts
  useEffect(() => {
    const randomSequence = Array.from({ length: 3 }, () =>
      colors[Math.floor(Math.random() * colors.length)]
    );
    setSequence(randomSequence);
    console.log('Random sequence:', randomSequence);
  }, []);

  // Start playing the sequence after it's generated
  useEffect(() => {
    if (sequence.length > 0) {
      playSequence();
    }
  }, [sequence]);

  // Function to play the sequence
  const playSequence = async () => {
    setIsDisplayingSequence(true);
    for (let color of sequence) {
      setFlashColor(color);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Show the color for 500ms
      setFlashColor(null);
      await new Promise((resolve) => setTimeout(resolve, 300)); // Pause for 300ms
    }
    // Flash all boxes black to indicate user's turn
    setFlashColor('black');
    await new Promise((resolve) => setTimeout(resolve, 500));
    setFlashColor(null);

    setIsDisplayingSequence(false);
    setIsUserTurn(true);
  };

  // Handle user input
  const handleClick = (color) => {
    if (isDisplayingSequence || !isUserTurn) return;

    // Flash the clicked color
    setClickedColor(color);
    setTimeout(() => {
      setClickedColor(null);
    }, 200);

    const newInput = [...userInput, color];
    setUserInput(newInput);
    console.log('User input:', newInput);

    // Check if the user's input matches the sequence
    if (sequence[newInput.length - 1] !== color) {
      alert('You fail');
      console.log('User failed. Sequence was:', sequence);
      console.log('User input was:', newInput);
      router.push('/main-menu');
    } else if (newInput.length === sequence.length) {
      alert('You win');
      console.log('User won. Sequence was:', sequence);
      console.log('User input was:', newInput);
      router.push('/campaign/advice');
    }
  };

  // Determine the className of each color box
  const getClassName = (color) => {
    if (flashColor === 'black') {
      return `w-24 h-24 rounded bg-black`;
    }

    let classes = `w-24 h-24 rounded ${colorClasses[color]}`;
    if (flashColor === color || clickedColor === color) {
      classes += ' opacity-100';
    } else {
      classes += ' opacity-50';
    }
    return classes;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="grid grid-cols-2 gap-4 relative">
        {colors.map((color) => (
          <div
            key={color}
            onClick={() => handleClick(color)}
            className={getClassName(color)}
          ></div>
        ))}
      </div>
      <p className="mt-6">
        {isDisplayingSequence
          ? 'Watch the sequence'
          : isUserTurn
          ? 'Repeat the sequence'
          : ''}
      </p>
      {/* Display the sequences for debugging */}
      <div className="mt-6">
        <p>Sequence: {sequence.join(', ')}</p>
        <p>User Input: {userInput.join(', ')}</p>
      </div>
    </div>
  );
}

