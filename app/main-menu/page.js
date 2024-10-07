'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MainMenu() {
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
      className="flex items-center justify-center w-screen"
      style={{
        height: 'calc(var(--vh, 1vh) * 100)',
        backgroundImage: 'url(/images/phoneWall.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col bg-gray-100 p-4 border-2 border-black rounded-md items-center space-y-4">
        <h1 className="text-4xl font-bold text-black">Main Menu</h1>
        <button
          onClick={() => router.push('/campaign')}
          className="w-40 px-4 py-2 bg-green-400 text-2xl text-white rounded"
        >
          Campaign
        </button>
        <button className="w-40 px-4 py-2 bg-red-300 text-2xl text-white rounded">
          Settings
        </button>
        <button className="w-40 px-4 py-2 bg-blue-400 text-2xl text-white rounded">
          Credits
        </button>
      </div>
    </div>
  );
}