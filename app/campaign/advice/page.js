// app/campaign/advice/page.js
'use client';

import { useRouter } from 'next/navigation';

export default function Advice() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <p className="text-xl mb-6">
        I knew you were pretty smart, can I ask you for some advice?
      </p>
      <button
        onClick={() => router.push('/campaign/question')}
        className="px-5 py-2 bg-blue-500 text-white rounded-full"
      >
        Next
      </button>
    </div>
  );
}