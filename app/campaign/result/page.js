// File: ./app/campaign/result/page.js
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const dynamic = 'force-dynamic';

export default function Result() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const choice = searchParams.get('choice');

  const colors = ['#34D399', '#F87171'];

  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const defaultLabels = ['Option A', 'Option B'];
      const defaultData = [50, 50];

      const labels = choice ? [`You chose ${choice}`, 'Others'] : defaultLabels;
      const chartData = choice
        ? [Math.floor(Math.random() * 50) + 50, Math.floor(Math.random() * 50)]
        : defaultData;

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
  }, [choice]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <p className="text-xl mb-6">
        {choice ? `You chose: ${choice}` : 'No choice selected'}
      </p>
      <div className="w-64 h-64 mb-6">
        {data.datasets.length > 0 ? (
          <Pie data={data} />
        ) : (
          <p>No data available for the chart.</p>
        )}
      </div>
      <button
        onClick={() => router.push('/main-menu')}
        className="px-5 py-2 bg-blue-500 text-white rounded-full"
      >
        Continue
      </button>
    </div>
  );
}
