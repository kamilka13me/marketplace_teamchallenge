import { FC } from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  datasets: [
    {
      data: [300, 250, 150, 50],
      backgroundColor: ['#8A3FFC', '#FFDE00', '#0F62FE', '#32C42F'],
      borderWidth: 0,
      radius: 120,
    },
  ],
};

const CallsClickChart: FC = () => {
  return (
    <HStack
      gap="6"
      align="center"
      className="pt-6 px-6 bg-dark-grey rounded-xl min-h-[528px] lg:min-h-[610px] lg:items-start w-full"
    >
      <Text
        Tag="h3"
        text="Натискання для виклику"
        size="xl"
        color="white"
        align="center"
        className="w-full"
      />
      <div className="w-[280px] h-[280px] border-grey border-[1px] rounded-xl relative">
        <Doughnut
          data={data}
          options={{
            responsive: true,
            cutout: 100,
          }}
        />
        <HStack
          gap="2"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Text Tag="p" text="750" size="2xl" color="white" />
          <Text Tag="p" text="Січень" size="xs" color="gray" />
        </HStack>
      </div>
      <HStack gap="6" align="center" className="w-full lg:items-start">
        {Array(4)
          .fill(null)
          .map((item) => {
            return (
              <VStack align="center" className="gap-[6px]" key={item}>
                <div className="bg-[#8A3FFC] w-2 h-2 rounded-full" />
                <Text
                  Tag="span"
                  text="300"
                  size="lg"
                  color="white"
                  className="leading-[0px]"
                />
                <Text Tag="span" text="Товари Apple" size="sm" color="white" />
              </VStack>
            );
          })}
      </HStack>
    </HStack>
  );
};

export default CallsClickChart;
