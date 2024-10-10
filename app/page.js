'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CircularLogo from '@/components/CircularLogo';
import StartButton from '@/components/StartButton';

// Reusable Components
const DialogueBox = ({ text }) => (
  <div className="bg-white border-4 rounded-md border-black p-4">
    <p className="text-4xl font-bold text-center text-black">
      {text}
    </p>
  </div>
);

const GirlImage = () => (
  <div className="w-full h-full flex justify-end items-end">
    <div className="relative w-full h-full">
      <Image
        src="/images/MainGirl.png"
        alt="Girl"
        fill
        className="object-contain object-right-bottom"
        sizes="(max-width: 768px) 100vw,
               (max-width: 1200px) 75vw,
               50vw"
        priority
      />
    </div>
  </div>
);

export default function Home() {
  const router = useRouter();

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
      className="flex flex-col w-screen"
      style={{
        height: 'calc(var(--vh, 1vh) * 100)',
        backgroundImage: 'url(/images/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Top Section */}
      <div className="flex h-1/6">
        <CircularLogo
          src="/images/Poco2.png"
          alt="Logo"
          className="w-20 h-20 z-10 "
        />
      </div>

      {/* Middle Section */}
      <div className="flex flex-col items-center h-1/5">
        <DialogueBox text="Dilemma Dash" />
        <div className="mt-4">
          <StartButton path="/main-menu" text="Start" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex-1">
        <GirlImage />
      </div>
    </div>
  );
}
