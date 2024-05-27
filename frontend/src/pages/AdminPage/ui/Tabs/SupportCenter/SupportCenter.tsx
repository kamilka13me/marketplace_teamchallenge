/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useState } from 'react';

import SupportCenterSelector from './components/SupportCenterSelector';

import ListingSearchCalendar from '@/widgets/ListingSort/ui/components/ListingSearchCalendar';
import ListingSearchInput from '@/widgets/ListingSort/ui/components/ListingSearchInput';

const SupportCenter: FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [inputData, setInputData] = useState<string>('');

  console.log(selectedFilter);
  console.log(inputData);

  return (
    <div className="SupportCenter flex flex-col gap-4 w-full text-white">
      <SupportCenterSelector
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <div className="flex flex-col gap-[15px] items-center justify-between w-full bg-dark-grey rounded-2xl p-[16px]">
        <div className="flex flex-row items-center justify-between w-full">
          <ListingSearchInput setInputData={setInputData} />
          <ListingSearchCalendar />
        </div>

        <div className="w-full flex flex-col">
          <div className="w-full flex flex-row gap-[20px] bg-selected-dark rounded-2xl p-[16px] text-[18px]">
            <span className="w-[15%]">Дата</span>
            <span className="w-[15%]">ID</span>
            <span className="w-[40%]">Тема звернення</span>
            <span className="w-[15%]">Статус</span>
            <span className="w-[15%]">Дія</span>
          </div>

          <div className="w-full flex flex-row items-center gap-[20px] rounded-2xl px-[16px] py-[10px]">
            <span className="w-[15%] flex items-center text-[16px]">01.01.2022</span>
            <span className="w-[15%] flex items-center">395151287888</span>
            <span className="w-[40%] flex items-center">
              Запит на підвищення видимості товарів у пошуку
            </span>
            <span className="w-[15%] flex items-center justify-center bg-secondary-yellow rounded-[8px] h-[26px] text-main-dark text-[14px]">
              Новий
            </span>
            <span className="w-[15%] flex items-center justify-center border-main border-[1px] rounded-[8px] h-[26px] text-main text-[14px]">
              Переглянути
            </span>
          </div>

          <div className="w-full flex flex-row items-center gap-[20px] bg-selected-dark rounded-2xl px-[16px] py-[10px]">
            <span className="w-[15%] flex items-center text-[16px]">01.01.2022</span>
            <span className="w-[15%] flex items-center">395151287888</span>
            <span className="w-[40%] flex items-center">
              Запит на підвищення видимості товарів у пошуку
            </span>
            <span className="w-[15%] flex items-center justify-center bg-secondary-yellow rounded-[8px] h-[26px] text-main-dark text-[14px]">
              Новий
            </span>
            <span className="w-[15%] flex items-center justify-center border-main border-[1px] rounded-[8px] h-[26px] text-main text-[14px]">
              Переглянути
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportCenter;
