'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { QuestionContext } from '../../context/QuestionContext'; // Adjust the relative path
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ClientResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentQuestion, setCurrentQuestion, currentAnswers, setCurrentAnswers } = useContext(QuestionContext);
  const choice = searchParams.get('choice');

  const colors = ['#34D399', '#F87171'];

  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  const [selectedGroup, setSelectedGroup] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      const defaultLabels = currentAnswers;
      const defaultData = [50, 50];

      const labels = defaultLabels || [];
      let chartData = [];

      // Generate random data based on the selected group
      if (selectedGroup === 'All') {
        chartData = [
          Math.floor(Math.random() * 50) + 50,
          Math.floor(Math.random() * 50),
        ];
      } else if (selectedGroup === 'Boys') {
        chartData = [
          Math.floor(Math.random() * 50) + 30,
          Math.floor(Math.random() * 30),
        ];
      } else if (selectedGroup === 'Girls') {
        chartData = [
          Math.floor(Math.random() * 50) + 10,
          Math.floor(Math.random() * 70),
        ];
      }

      setData({
        labels: labels,
        datasets: [
          {
            data: chartData,
            backgroundColor: colors,
          },
        ],
      });
    };

    fetchData();
  }, [choice, currentQuestion, currentAnswers, selectedGroup]); // Added selectedGroup to dependencies

  const handleGroupSelection = (group) => {
    setSelectedGroup(group);
  };

  // Set the CSS variable for viewport height
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
      className="flex flex-col items-center justify-center w-screen"
      style={{
        height: 'calc(var(--vh, 1vh) * 100)',
        backgroundImage: 'url(/images/dragonfruit.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <p className="text-xl mb-6 bg-white text-black mx-4 rounded-md border-2 border-black p-4">
        {currentQuestion?.question || 'Loading...'}
      </p>
      <div className="bg-white rounded-md border-2 border-black mb-4 p-4">
        <div className="w-64 h-64 mb-6">
          {data.datasets.length > 0 ? (
            <Pie data={data} />
          ) : (
            <p>No data available for the chart.</p>
          )}
        </div>
      </div>
      <div className="flex mb-4">
        <button
          onClick={() => handleGroupSelection('All')}
          disabled={selectedGroup === 'All'}
          className={`px-5 py-2 mx-2 text-white rounded ${
            selectedGroup === 'All' ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleGroupSelection('Boys')}
          disabled={selectedGroup === 'Boys'}
          className={`px-5 py-2 text-white rounded ${
            selectedGroup === 'Boys' ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'
          }`}
        >
          Boys
        </button>
        <button
          onClick={() => handleGroupSelection('Girls')}
          disabled={selectedGroup === 'Girls'}
          className={`px-5 py-2 mx-2 text-white rounded ${
            selectedGroup === 'Girls' ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'
          }`}
        >
          Girls
        </button>
      </div>
      <button
        onClick={() => router.push('/campaign')}
        className="px-5 my-2 py-2 mx-2 bg-blue-500 text-white rounded-full"
      >
        Continue
      </button>
    </div>
  );
}
