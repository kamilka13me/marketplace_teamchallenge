/* eslint-disable no-console */
import { FC } from 'react';

import StatisticGraph from './components/StatisticGraph';
import { testData } from './testData';

import people from '@/shared/assets/icons/people.svg?react';
import userEdit from '@/shared/assets/icons/user-edit.svg?react';
import { Icon } from '@/shared/ui/Icon';

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
        <div className="flex flex-col gap-[15px] w-full bg-dark-grey rounded-2xl px-[15px] py-[20px]">
          <div className="flex flex-row items-center justify-between w-full">
            <span className="text-[18px]">Кількість нових продавців</span>
            <div className="flex flex-row gap-[10px] justify-center items-center">
              <div className="w-[12px] h-[12px] bg-[#0f62fe] rounded-full" />
              <span className="text-[14px]">Продавці</span>
            </div>
          </div>

          <div className="flex flex-col gap-[5px] w-full">
            <div className="w-full">
              <StatisticGraph color="15, 98, 254" data={testData.newSalersPerDay} />
            </div>

            {selectedMonth && (
              <span className="flex justify-center w-full text-[14px] text-disabled">
                {selectedMonth}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ---------------Контакти-----------------------*/}
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-[15px] w-full bg-dark-grey rounded-2xl p-[16px]">
          <div className="flex flex-row gap-[15px]">
            <div className="flex justify-center items-center h-[30px] w-[30px] bg-main rounded-[8px]">
              <Icon Svg={people} width={16} height={16} className="stroke-black" />
            </div>
            <span className="text-[18px]">Відкриття контактів</span>
          </div>

          <div className="flex flex-col w-full">
            <div className="flex flex-row items-center gap-[8px] w-full">
              <span className="text-[18px]">{testData.openContactsCurrentMonth}</span>
              <span
                className={`text-[14px] text-[#32C42F] 
                  ${testData.openContactsCurrentMonth >= testData.openContactsPreviousMonth ? 'text-[#32C42F]' : 'text-[#FF0000] rotate-180'}`}
              >
                ⯅
              </span>
              <span
                className={`text-[14px] text-[#32C42F] ${testData.openContactsCurrentMonth >= testData.openContactsPreviousMonth ? 'text-[#32C42F]' : 'text-[#FF0000]'}`}
              >
                {testData.openContactsPreviousMonth !== 0
                  ? (
                      ((testData.openContactsCurrentMonth -
                        testData.openContactsPreviousMonth) /
                        testData.openContactsPreviousMonth) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </span>
            </div>
            <span className="flex text-[16px] text-disabled">Поточний місяць</span>
          </div>

          <span className="flex gap-[5px] text-[12px] text-disabled">
            Попередній місяць:
            <span className="font-[600] text-white">
              {testData.openContactsPreviousMonth}
            </span>
          </span>
        </div>

        {/* ---------------Відвідування-----------------------*/}
        <div className="flex flex-col gap-[15px] w-full bg-dark-grey rounded-2xl p-[16px]">
          <div className="flex flex-row gap-[15px]">
            <div className="flex justify-center items-center h-[30px] w-[30px] bg-main rounded-[8px]">
              <Icon Svg={userEdit} width={16} height={16} className="stroke-black" />
            </div>
            <span className="text-[18px]">Відвідування</span>
          </div>

          <div className="flex flex-col w-full">
            <div className="flex flex-row items-center gap-[8px] w-full">
              <span className="text-[18px]">{testData.visitsCurrentMonth}</span>
              <span
                className={`text-[14px] text-[#32C42F] 
                  ${testData.visitsCurrentMonth >= testData.visitsPreviousMonth ? 'text-[#32C42F]' : 'text-[#FF0000] rotate-180'}`}
              >
                ⯅
              </span>
              <span
                className={`text-[14px] text-[#32C42F] ${testData.visitsCurrentMonth >= testData.visitsPreviousMonth ? 'text-[#32C42F]' : 'text-[#FF0000]'}`}
              >
                {testData.visitsPreviousMonth !== 0
                  ? (
                      ((testData.visitsCurrentMonth - testData.visitsPreviousMonth) /
                        testData.visitsPreviousMonth) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </span>
            </div>
            <span className="flex text-[16px] text-disabled">Поточний місяць</span>
          </div>

          <span className="flex gap-[5px] text-[12px] text-disabled">
            Попередній місяць:
            <span className="font-[600] text-white">{testData.visitsPreviousMonth}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
