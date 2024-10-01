// app/campaign/page.js
'use client';

import { useRouter } from 'next/navigation';

export default function CampaignIntro() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <p className="text-xl mb-6">
        Hey, you look pretty smart. Can you solve this?
      </p>
      <button
        onClick={() => router.push('/campaign/puzzle')}
        className="px-5 py-2 bg-blue-500 text-white rounded-full"
      >
        Next
      </button>
    </div>
  );
}