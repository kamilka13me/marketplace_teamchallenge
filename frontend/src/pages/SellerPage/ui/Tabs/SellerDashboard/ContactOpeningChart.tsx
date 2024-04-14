import { FC } from 'react';

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import caretDown from '@/shared/assets/icons/caret-down.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

ChartJS.register(LinearScale, CategoryScale, BarElement, ArcElement, Tooltip, Legend);

const ContactOpeningChart: FC = () => {
  return (
    <div className="w-full bg-dark-grey rounded-2xl pb-[50px] h-full pt-8 px-6">
      <Text
        Tag="h3"
        text="Відкриття контактів"
        size="xl"
        color="white"
        bold
        className="mb-9"
      />
      <HStack gap="2" className="mb-5">
        <VStack align="center" gap="5">
          <Text Tag="p" text="250" size="2xl" color="white" bold />
          <span className="flex gap-1">
            <Icon Svg={caretDown} width={16} height={16} />
            <Text Tag="span" text="1.8%" size="sm" color="green" />
          </span>
        </VStack>
        <VStack gap="2">
          <Text Tag="p" text="Січень" size="xs" color="gray" />
          <Text Tag="p" text="143" size="xs" color="white" />
        </VStack>
      </HStack>
      <div className="h-[200px] w-[555px]">
        <Bar
          options={{
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  autoSkip: false,
                  minRotation: 360,
                  color: '#FFFFFF',
                  padding: 0,
                  font: {
                    family: 'Outfit',
                    size: 10,
                    lineHeight: '12.6px',
                    weight: 400,
                  },
                },
              },
              y: {
                grid: {
                  display: false,
                },
                ticks: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
          data={{
            labels: Array.from({ length: 31 }, (_, i) => String(i + 1)),
            datasets: [
              {
                barPercentage: 0.9,
                data: [
                  11, 22, 34, 18, 27, 15, 5, 7, 14, 35, 27, 22, 31, 4, 6, 7, 14, 45, 27,
                  7, 14, 35, 27, 22, 31, 22, 31, 4, 6, 7, 14,
                ],
                backgroundColor: ['#0F62FE', '#8A3FFC'],
              },
            ],
          }}
          style={{
            width: '100%',
            height: 200,
          }}
        />
      </div>
    </div>
  );
};

export default ContactOpeningChart;
