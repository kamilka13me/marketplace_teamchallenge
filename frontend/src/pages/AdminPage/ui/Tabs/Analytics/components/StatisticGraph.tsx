import { FC } from 'react';

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { StatisticDataItem } from '../interfaces/StatisticData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

interface Props {
  color: string;
  data: StatisticDataItem[];
}

const StatisticGraph: FC<Props> = (props) => {
  const { color, data } = props;

  return (
    <Line
      options={{
        interaction: { mode: 'nearest', intersect: false },
        scales: {
          x: {
            ticks: {
              color: '#A8A8A8',
            },
          },
          y: {
            beginAtZero: true,
            min: 0,
            suggestedMax: 100,
            ticks: {
              stepSize: 20,
            },
          },
        },
      }}
      data={{
        labels: data.map((item) => new Date(item.date).toISOString().slice(8, 10)),
        datasets: [
          {
            fill: true,
            data: data.map((item) => item.count),
            tension: 0.5,
            borderColor: `rgb(${color})`,
            backgroundColor: `rgba(${color}, 0.2)`,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 1.5,
          },
        ],
      }}
    />
  );
};

export default StatisticGraph;
