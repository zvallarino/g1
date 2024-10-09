'use client';

import { useEffect,useContext } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { QuestionContext } from '../../context/QuestionContext'; // Adjust the relative path


// Reusable components
const Spacer = ({ className }) => <div className={`hidden md:block ${className}`}></div>;

const followUps = [
  "I knew you were pretty smart! Can I ask you some advice?",
  "Mind if I pick your brain a little more?",
  "Can I challenge you with another question?",
  "Think you can help me with one more?",
  "Can I ask for your thoughts on something else?",
  "Think you can keep this up if I ask you one more thing?",
  "Do you mind if I get your advice on another one?",
  "I’d love to hear your take on another question.",
  "Do you have time for just one more?",
  "Think you can tackle one last challenge for me?"
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
      className="relative px-6 py-3 text-white font-bold text-xl md:text-2xl tracking-wider uppercase bg-gradient-to-r from-red-600 to-yellow-500 shadow-lg transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0px_0px_20px_#ff00ff,0px_0px_20px_#ff00ff]"
    >
      Yes
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
        <div className="w-full md:w-1/4 h-1/2 flex flex-col items-end justify-end">
          <div className="h-8 md:h-1/2"></div>
          {/* Dialogue Box */}
          <DialogueBox saying = {followUps[level-1]} />
          {/* Next Button */}
          <NextButton onClick={() => router.push('/campaign/question')} />
          <div className="h-8 md:h-1/4"></div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 h-2/3 flex flex-col justify-end ">
          {/* Girl Image */}
          <GirlImage />
        </div>

        {/* Right Spacer */}
        <Spacer className="md:w-1/4 bg-blue-200" />
      </div>
    </div>
  );
}