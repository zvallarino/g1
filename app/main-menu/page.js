// app/main-menu/page.js
'use client';

import { useRouter } from 'next/navigation';

export default function MainMenu() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-4">
      <h1 className="text-3xl font-bold">Main Menu</h1>
      <button
        onClick={() => router.push('/campaign')}
        className="w-40 px-4 py-2 bg-green-500 text-white rounded"
      >
        Campaign
      </button>
      <button className="w-40 px-4 py-2 bg-gray-500 text-white rounded">
        Settings
      </button>
      <button className="w-40 px-4 py-2 bg-gray-500 text-white rounded">
        Credits
      </button>
    </div>
  );
}