// app/page.js
'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Game Logo</h1>
      <button
        onClick={() => router.push('/main-menu')}
        className="px-6 py-3 bg-blue-500 text-white rounded-full"
      >
        Start
      </button>
    </div>
  );
}