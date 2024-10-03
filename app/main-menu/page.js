// app/main-menu/page.js
'use client';

import { useRouter } from 'next/navigation';

export default function MainMenu() {
  const router = useRouter();

  return (
    <div 
    className="flex items-center justify-center h-screen bg-gray-100 space-y-4 bg-cover bg-center"
    style={{ backgroundImage: 'url(/images/phoneWall.jpg)' }}
    >
      <div className='flex flex-col h-1/3 bg-gray-100 p-4 border-2 border-black rounded-md items-center justify-evenly'>
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
  