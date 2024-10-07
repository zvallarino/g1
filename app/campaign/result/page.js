'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Reusable components
const Spacer = ({ className }) => <div className={`hidden md:block ${className}`}></div>;

const DialogueBox = () => (
  <div className="flex items-center bg-white border-4 rounded-md border-black p-4 mb-4">
    <p className="text-2xl md:text-4xl font-bold text-center text-black">
      Hey! You look pretty smart. Can you solve this?
    </p>
  </div>
);

const NextButton = ({ onClick }) => (
  <div className="w-full flex justify-center">
    <button
      onClick={onClick}
      className="relative px-6 py-3 text-white font-bold text-xl md:text-2xl tracking-wider uppercase bg-gradient-to-r from-red-600 to-yellow-500 shadow-lg transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0px_0px_20px_#ff00ff,0px_0px_20px_#ff00ff]"
    >
      Next
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

export default function CampaignIntro() {
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
      className="flex flex-col md:flex-row items-center md:items-end justify-center w-screen"
      style={{
        height: 'calc(var(--vh, 1vh) * 100)',
        backgroundImage: 'url(/images/anime_city.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
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
          <NextButton onClick={() => router.push('/campaign/puzzle')} />
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

// 'use client';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend);

// export const dynamic = 'force-dynamic';

// export default function Result() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const choice = searchParams.get('choice');

//   const colors = ['#34D399', '#F87171'];

//   const [data, setData] = useState({
//     labels: [],
//     datasets: [],
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       const defaultLabels = ['Option A', 'Option B'];
//       const defaultData = [50, 50];

//       const labels = choice ? [`You chose ${choice}`, 'Others'] : defaultLabels;
//       const chartData = choice
//         ? [Math.floor(Math.random() * 50) + 50, Math.floor(Math.random() * 50)]
//         : defaultData;

//       setData({
//         labels: labels,
//         datasets: [
//           {
//             data: chartData,
//             backgroundColor: colors,
//           },
//         ],
//       });
//     };

//     fetchData();
//   }, [choice]);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
//       <p className="text-xl mb-6">
//         {choice ? `You chose: ${choice}` : 'No choice selected'}
//       </p>
//       <div className="w-64 h-64 mb-6">
//         {data.datasets.length > 0 ? (
//           <Pie data={data} />
//         ) : (
//           <p>No data available for the chart.</p>
//         )}
//       </div>
//       <button
//         onClick={() => router.push('/main-menu')}
//         className="px-5 py-2 bg-blue-500 text-white rounded-full"
//       >
//         Continue
//       </button>
//     </div>
//   );
// }

