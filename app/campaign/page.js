'use client';

import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { QuestionContext } from '../context/QuestionContext'; // Adjust the relative path

// Reusable components
const Spacer = ({ className }) => <div className={`hidden md:block ${className}`}></div>;

const sayings = [
  "Hey! You look pretty smart. Can you solve this?",
  "Nice work! I bet you can handle more.",
  "You're on a roll! What's next?",
  "Impressive! You’re breezing through these.",
  "Whoa, you’re making this look easy!",
  "Unstoppable! How far can you go?",
  "Amazing! You’ve got some serious skills.",
  "Is there any puzzle you can’t beat?",
  "Genius alert! You’re crushing it.",
  "Unbelievable! You’re a puzzle master."
];

const DialogueBox = ({saying}) => (
  <div className="flex items-center bg-white border-4 rounded-md border-black p-4 mb-4">
    <p className="text-2xl md:text-4xl font-bold text-center text-black">
      {saying}
    </p>
  </div>
);

const NextButton = ({ onClick }) => (
  <div className="w-full flex justify-center">
    <button
      onClick={onClick}
      className="relative px-6 py-3 text-white font-bold text-2xl rounded-md md:text-2xl tracking-wider uppercase bg-gradient-to-r from-red-600 to-yellow-500 shadow-lg transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0px_0px_20px_#ff00ff,0px_0px_20px_#ff00ff]"
    >
      Next
    </button>
  </div>
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

export default function CampaignIntro() {
  const router = useRouter();
  const { level } = useContext(QuestionContext);


  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

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
        <div className="w-full md:w-1/4 h-[30%] flex flex-col items-end justify-end">
        <div className='w-full h-[50%]'>   {/*  Spacer */}</div>
          <div className="h-8 md:h-1/2"></div>
          {/* Dialogue Box */}
          <DialogueBox saying = {sayings[level-1]} />
          {/* Next Button */}
          <NextButton onClick={() => router.push('/campaign/puzzle')} />
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