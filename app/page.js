// app/page.js
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CircularLogo from '@/components/CircularLogo';
import GameButton from '@/components/GameButton';

// Reusable Components for better organization
const Spacer = ({ className }) => <div className={`hidden md:block ${className}`}>spacer</div>;

const DialogueBox = ({ text }) => (
  <div className=" bg-white border-4 rounded-md border-black p-4">
    <p className="text-4xl font-bold text-center text-black">
      {text}
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
  <div className="w-full flex justify-end items-center">
    <div className="relative w-full h-full">
      <Image
        src="/images/MainGirl.png"
        alt="Girl"
        fill
        className="object-contain object-right"
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

  return (
    <div
      className="flex-col w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/background.jpg)' }}
    >
    <div className='flex  h-[10%]'>

    <div className='flex'>
    <CircularLogo
  src="/images/Poco2.png"
  alt="Logo"
  className="w-20 h-full z-10"
/>
    </div>
    <div className='flex flex-1 '>
    </div>
   
     
    </div>
    <div className='flex-col  h-[30%] w-full'>
    <div className='flex  h-1/3'></div> 
    <div className = "flex w-full  justify-center"><DialogueBox text={"Dilemma Dash"} /></div>  
    <div className = "flex w-full  justify-center my-2"><GameButton path = {"/main-menu"} text = {"Start"}/></div>  

    </div>
    <div className='flex  h-[60%]'><GirlImage /></div>
    </div>
  );
}
