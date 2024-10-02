// app/page.js
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CircularLogo from '@/components/CircularLogo';

// Reusable Components for better organization
const Spacer = ({ className }) => <div className={`hidden md:block ${className}`}>spacer</div>;

const DialogueBox = ({ children }) => (
  <div className="flex items-center bg-white border-4 rounded-md border-black p-4 mb-4">
    <p className="text-2xl md:text-4xl font-bold text-center text-black">
      {children}
    </p>
  </div>
);

const NextButton = ({ onClick, text }) => (
  <div className="w-full flex justify-center">
    <button
      onClick={onClick}
      className="relative px-6 py-3 text-white font-bold text-xl md:text-2xl tracking-wider uppercase bg-gradient-to-r from-red-600 to-yellow-500 shadow-lg transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0px_0px_20px_#ff00ff,0px_0px_20px_#ff00ff]"
    >
      {text}
    </button>
  </div>
);

const GirlImage = () => (
  <div className="w-full flex justify-center ">
    <Image
      src="/images/MainGirl.png"
      alt="Girl"
      width={600}
      height={600}
      className="max-w-xs md:max-w-full"
    />
  </div>
);

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="relative flex flex-col md:flex-row md:items-end justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/background.jpg)' }}
    >
      {/* Circular Logo positioned top-left on mobile, within layout on desktop */}
      <CircularLogo
        src="/images/Poco2.png"
        alt="Logo"
        className="w-24 h-24 md:w-64 md:h-64 absolute md:static z-10"
      />

      <div className="flex flex-col md:flex-row items-center w-full">
        {/* Left Spacer */}
        <Spacer className="md:w-1/4 bg-blue-200" />

        {/* Middle Section */}
        <div className="w-full md:w-1/4 flex flex-col items-center p-4">
          {/* Dialogue Box */}
          <DialogueBox>Dilemma Dash!</DialogueBox>
          {/* Next Button */}
          <NextButton onClick={() => router.push('/campaign')} text="Start" />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-end items-center">
          {/* Girl Image */}
          <GirlImage />
        </div>

        {/* Right Spacer */}
        <Spacer className="md:w-1/4 bg-blue-200" />
      </div>
    </div>
  );
}
