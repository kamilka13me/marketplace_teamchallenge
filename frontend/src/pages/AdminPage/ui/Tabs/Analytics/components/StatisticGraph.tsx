/* eslint-disable no-console */
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

  console.log(data);

  return (
    <Line
      options={{
        responsive: true,
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
            pointRadius: 2.5,
          },
        ],
      }}
    />
  );
};

export default StatisticGraph;
