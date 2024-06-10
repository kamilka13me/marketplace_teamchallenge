/* eslint-disable no-console */
import { FC } from 'react';

import StatisticGraph from './components/StatisticGraph';
import { testData } from './testData';

const dateMap = {
  '01': 'Січень',
  '02': 'Лютий',
  '03': 'Березень',
  '04': 'Квітень',
  '05': 'Травень',
  '06': 'Червень',
  '07': 'Липень',
  '08': 'Серпень',
  '09': 'Вересень',
  '10': 'Жовтень',
  '11': 'Листопад',
  '12': 'Грудень',
};

const Analytics: FC = () => {
  const selectedMonth =
    dateMap[testData.newUsersPerDay[0]?.date.slice(5, 7) as keyof typeof dateMap];

  return (
    <div className="flex flex-row gap-5 w-full text-white">
      <div className="flex flex-col gap-5 min-w-[650px]">
        {/* ---------------Користувачі-----------------------*/}
        <div className="flex flex-col gap-[15px] w-full bg-dark-grey rounded-2xl px-[15px] py-[20px]">
          <div className="flex flex-row items-center justify-between w-full">
            <span className="text-[18px]">Кількість нових користувачів</span>
            <div className="flex flex-row gap-[10px] justify-center items-center">
              <div className="w-[12px] h-[12px] bg-secondary-yellow rounded-full" />
              <span className="text-[14px]">Користувачі</span>
            </div>
          </div>

          <div className="flex flex-col gap-[5px] w-full">
            <div className="w-full">
              <StatisticGraph color="255, 222, 0" data={testData.newUsersPerDay} />
            </div>

            {selectedMonth && (
              <span className="flex justify-center w-full text-[14px] text-disabled">
                {selectedMonth}
              </span>
            )}
          </div>
        </div>

        {/* ---------------Продавці-----------------------*/}
        <div className="flex flex-row gap-[15px] w-full bg-dark-grey rounded-2xl px-[20px] py-[8px] h-[350px]">
          <span>Кількість нових продавців</span>
        </div>
      </div>

      {/* ---------------Контакти-----------------------*/}
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-row gap-[15px] w-full bg-dark-grey rounded-2xl px-[20px] py-[8px] h-[165px]">
          <span>Відкриття контактів</span>
        </div>

        {/* ---------------Відвідування-----------------------*/}
        <div className="flex flex-row gap-[15px] w-full bg-dark-grey rounded-2xl px-[20px] py-[8px] h-[165px]">
          <span>Відвідування</span>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
