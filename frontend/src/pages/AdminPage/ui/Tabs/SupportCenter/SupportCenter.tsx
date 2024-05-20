/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useState } from 'react';

import supportCenterFilterAll from '@/shared/assets/icons/supportCenterFilterAll.svg?react';
import supportCenterFilterClosed from '@/shared/assets/icons/supportCenterFilterClosed.svg?react';
import supportCenterFilterConsider from '@/shared/assets/icons/supportCenterFilterConsider.svg?react';
import supportCenterFilterWork from '@/shared/assets/icons/supportCenterFilterWork.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

const SupportCenter: FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <div className="SupportCenter flex flex-col gap-4 w-full text-white">
      <div className="flex flex-row items-center justify-between w-full h-[64px] bg-dark-grey rounded-2xl px-[16px]">
        <button
          type="button"
          onClick={() => setSelectedFilter('all')}
          className={`${selectedFilter === 'all' && 'bg-selected-dark'} gap-[7px] flex flex-row items-center justify-start w-[180px] h-[48px] px-[12px] rounded-2xl`}
        >
          <div
            className={`${selectedFilter === 'all' && 'bg-main'} w-[31px] h-[31px] rounded-[7px] flex items-center justify-center`}
          >
            <Icon
              aria-hidden="true"
              Svg={supportCenterFilterAll}
              className={`${selectedFilter === 'all' ? 'stroke-selected-dark' : 'stroke-disabled'} h-5 w-5 duration-75 pointer-events-none`}
            />
          </div>
          <Text
            Tag="span"
            text="Всі"
            color={selectedFilter === 'all' ? 'white' : 'gray-light'}
            size="md"
          />
        </button>

        <button
          type="button"
          onClick={() => setSelectedFilter('new')}
          className={`${selectedFilter === 'new' && 'bg-selected-dark'} gap-[7px] flex flex-row items-center justify-start w-[180px] h-[48px] px-[12px] rounded-2xl`}
        >
          <div
            className={`${selectedFilter === 'new' && 'bg-main'} w-[31px] h-[31px] rounded-[7px] flex items-center justify-center`}
          >
            <Icon
              aria-hidden="true"
              Svg={supportCenterFilterAll}
              className={`${selectedFilter === 'new' ? 'stroke-selected-dark' : 'stroke-disabled'} h-5 w-5 duration-75 pointer-events-none`}
            />
          </div>
          <Text
            Tag="span"
            text="Нові"
            color={selectedFilter === 'new' ? 'white' : 'gray-light'}
            size="md"
          />
        </button>

        <button
          type="button"
          onClick={() => setSelectedFilter('consider')}
          className={`${selectedFilter === 'consider' && 'bg-selected-dark'} gap-[7px] flex flex-row items-center justify-start w-[180px] h-[48px] px-[12px] rounded-2xl`}
        >
          <div
            className={`${selectedFilter === 'consider' && 'bg-main'} w-[31px] h-[31px] rounded-[7px] flex items-center justify-center`}
          >
            <Icon
              aria-hidden="true"
              Svg={supportCenterFilterConsider}
              className={`${selectedFilter === 'consider' ? 'stroke-selected-dark' : 'stroke-disabled'} h-5 w-5 duration-75 pointer-events-none`}
            />
          </div>
          <Text
            Tag="span"
            text="На розгляді"
            color={selectedFilter === 'consider' ? 'white' : 'gray-light'}
            size="md"
          />
        </button>

        <button
          type="button"
          onClick={() => setSelectedFilter('work')}
          className={`${selectedFilter === 'work' && 'bg-selected-dark'} gap-[7px] flex flex-row items-center justify-start w-[180px] h-[48px] px-[12px] rounded-2xl`}
        >
          <div
            className={`${selectedFilter === 'work' && 'bg-main'} w-[31px] h-[31px] rounded-[7px] flex items-center justify-center`}
          >
            <Icon
              aria-hidden="true"
              Svg={supportCenterFilterWork}
              className={`${selectedFilter === 'work' ? 'stroke-selected-dark' : 'stroke-disabled'} h-5 w-5 duration-75 pointer-events-none`}
            />
          </div>
          <Text
            Tag="span"
            text="В роботі"
            color={selectedFilter === 'work' ? 'white' : 'gray-light'}
            size="md"
          />
        </button>

        <button
          type="button"
          onClick={() => setSelectedFilter('closed')}
          className={`${selectedFilter === 'closed' && 'bg-selected-dark'} gap-[7px] flex flex-row items-center justify-start w-[180px] h-[48px] px-[12px] rounded-2xl`}
        >
          <div
            className={`${selectedFilter === 'closed' && 'bg-main'} w-[31px] h-[31px] rounded-[7px] flex items-center justify-center`}
          >
            <Icon
              aria-hidden="true"
              Svg={supportCenterFilterClosed}
              className={`${selectedFilter === 'closed' ? 'stroke-selected-dark' : 'stroke-disabled'} h-5 w-5 duration-75 pointer-events-none`}
            />
          </div>
          <Text
            Tag="span"
            text="Закриті"
            color={selectedFilter === 'closed' ? 'white' : 'gray-light'}
            size="md"
          />
        </button>
      </div>
      Support Center
    </div>
  );
};

export default SupportCenter;
