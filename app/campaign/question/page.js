// app/campaign/question/page.js
'use client';

import { useRouter } from 'next/navigation';

export default function Question() {
  const router = useRouter();

  const handleChoice = (choice) => {
    router.push(`/campaign/result`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <p className="text-xl mb-6">
        Do you like Thai food or do you like Chinese food?
      </p>
      <div className="space-x-4">
        <button
          onClick={() => handleChoice('Thai')}
          className="px-5 py-2 bg-green-500 text-white rounded-full"
        >
          Thai
        </button>
        <button
          onClick={() => handleChoice('Chinese')}
          className="px-5 py-2 bg-red-500 text-white rounded-full"
        >
          Chinese
        </button>
      </div>
    </div>
  );
}