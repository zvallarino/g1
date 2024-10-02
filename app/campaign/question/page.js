'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Reusable components for better organization
const Spacer = ({ className }) => <div className={`hidden md:block ${className}`}>spacer</div>;

const DialogueBox = () => (
  <div className="flex items-center bg-white border-4 rounded-md border-black p-4 mb-4">
    <p className="text-2xl md:text-4xl font-bold text-center text-black">
      Having just one sexual partner can lower your chances of getting HIV or other STIs?
    </p>
  </div>
);

const NextButton = ({ onClick,text}) => (
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
export default function Question() {
  const router = useRouter();

  return (
    <div
      className="flex flex-col md:flex-row items-center md:items-end justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/anime_city.jpg)' }}
    >
      <div className="flex flex-col md:flex-row items-center h-full w-full">
        {/* Left Spacer */}
        <Spacer className="md:w-1/4 bg-blue-200" />

        {/* Middle Section */}
        <div className="w-full md:w-1/4 h-1/2 flex flex-col items-end justify-end">
          <div className="h-8 md:h-1/2"></div>
          {/* Dialogue Box */}
          <DialogueBox />
          {/* Next Button */}
     <div className='flex w-full '>
            <NextButton text = {"True"} onClick={() => router.push('/campaign/result')} />
            <NextButton text = {"False"} onClick={() => router.push('/campaign/result')} />
     </div>
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
