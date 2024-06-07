/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, Fragment, useEffect, useState } from 'react';

import { Popover, Transition } from '@headlessui/react';

import { formatDate } from '../../../../../shared/utils/formatDate';

import ChangeStatusModal from './components/ChangeStatusModal';
import SupportCenterSelector from './components/SupportCenterSelector';
import ViewContentModal from './components/ViewContentModal';
import { SupportMessage, SupportMessagesResponse } from './interfaces/SupportMessage';

import editDots from '@/shared/assets/icons/editDots.svg?react';
import supportCenterFilterConsider from '@/shared/assets/icons/supportCenterFilterConsider.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import Pagination from '@/shared/ui/Pagination/Pagination';
import { HStack, VStack } from '@/shared/ui/Stack';
import ListingSearchCalendar, {
  IRangeDate,
} from '@/widgets/ListingSort/ui/components/ListingSearchCalendar';
import ListingSearchInput from '@/widgets/ListingSort/ui/components/ListingSearchInput';

const supportStatusMap = {
  new: { bg: 'bg-secondary-yellow', textColor: 'text-main-dark', text: 'Новий' },
  consider: { bg: 'bg-[#F4F2EC]', textColor: 'text-main-dark', text: 'На розгляді' },
  work: { bg: 'bg-[#393939]', textColor: 'text-white', text: 'В роботі' },
  closed: { bg: 'bg-disabled', textColor: 'text-main-dark', text: 'Вирішено' },
};

const createUrlQuery = (
  offset: number,
  selectedFilter: string,
  inputData: string,
  dateRange: IRangeDate,
  messagesLimit: number,
) => {
  let url = `?`;

  if (messagesLimit) url += `limit=${messagesLimit}&`;
  if (offset) url += `offset=${offset}&`;
  if (selectedFilter !== 'all') url += `status=${selectedFilter}&`;
  if (inputData) url += `search=${inputData}&`;
  if (dateRange?.startDate) url += `startDate=${dateRange.startDate.toISOString()}&`;
  if (dateRange?.endDate) url += `endDate=${dateRange.endDate.toISOString()}`;

  return url;
};

const SupportCenter: FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [inputData, setInputData] = useState<string>('');
  const [dateRange, setDateRange] = useState<IRangeDate>({
    startDate: new Date(0),
    endDate: new Date(),
    key: 'selection',
  });
  const [width, setWidth] = useState<number>(() => window.innerWidth);

  const [viewContentSelectedMessage, setViewContentSelectedMessage] =
    useState<SupportMessage | null>(null);
  const [changeStatusSelectedMessage, setChangeStatusSelectedMessage] =
    useState<SupportMessage | null>(null);

  const [offset, setOffset] = useState(0);
  const messagesLimit = 10;
  const currentPage = offset / messagesLimit + 1;

  const {
    data: supportData,
    isLoading,
    refetch: refetchSupportData,
  } = useAxios<SupportMessagesResponse>(
    `${ApiRoutes.SUPPORT}${createUrlQuery(offset, selectedFilter, inputData, dateRange, messagesLimit)}`,
  );

  useEffect(() => {
    setOffset(0);
  }, [selectedFilter, inputData, dateRange]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetchNext = () => setOffset(offset + messagesLimit);
  const fetchPrev = () => setOffset(offset - messagesLimit);
  const handleClickPage = (pageNumber: number) =>
    setOffset(messagesLimit * (pageNumber - 1));

  const renderSupportData = supportData?.supportMessage?.map((message, index) => (
    <div
      key={message._id}
      className={` ${index % 2 && 'bg-selected-dark'} w-full flex flex-row items-center gap-[20px] rounded-2xl px-[16px] py-[10px]`}
    >
      <span className="w-[10%] flex items-center text-[16px]">
        {formatDate(message.date)}
      </span>
      <span className="w-[25%] flex items-center">{message._id}</span>
      <span className="w-[35%] flex items-center">{message.topic}</span>
      <button
        onClick={() => {
          setChangeStatusSelectedMessage(message);
        }}
        type="button"
        className={`${supportStatusMap[message.status].bg} ${supportStatusMap[message.status].textColor} w-[15%] flex items-center justify-center rounded-[8px] h-[26px] text-[14px]`}
      >
        {supportStatusMap[message.status].text}
      </button>
      <button
        onClick={() => {
          setViewContentSelectedMessage(message);
        }}
        type="button"
        className="w-[15%] flex items-center justify-center border-main border-[1px] rounded-[8px] h-[26px] text-main text-[14px]"
      >
        Переглянути
      </button>
    </div>
  ));
  const renderSupportDataMobile = supportData?.supportMessage?.map((message, index) => (
    <VStack
      key={message._id}
      className="bg-selected-dark w-full items-start gap-[14px] rounded-2xl px-4 py-3 justify-between"
    >
      <HStack gap="4" className="w-[50%] overflow-hidden">
        <span className="items-center">ID {message._id}</span>
        <span className="items-center">{message.topic}</span>
      </HStack>

      <HStack gap="4" className="w-[30%]">
        <span className="items-center text-[16px]">{formatDate(message.date)}</span>

        <button
          onClick={() => {
            setChangeStatusSelectedMessage(message);
          }}
          type="button"
          className={`${supportStatusMap[message.status].bg} ${supportStatusMap[message.status].textColor} w-[100px] items-center justify-center rounded-[8px] h-[26px] text-[14px]`}
        >
          {supportStatusMap[message.status].text}
        </button>
      </HStack>

      <Popover className="relative h-full self-start min-w-6">
        <Popover.Button className="h-full">
          <Icon Svg={editDots} className="cursor-pointer" />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute z-10 right-0">
            <VStack gap="2" className="p-5 bg-shadow-footer rounded-lg items-center">
              <Icon
                aria-hidden="true"
                height="30"
                width="30"
                Svg={supportCenterFilterConsider}
                className="stroke-disabled duration-75 pointer-events-none"
              />
              <Popover.Button
                as={Button}
                variant="clear"
                onClick={() => {
                  setViewContentSelectedMessage(message);
                }}
              >
                Переглянути
              </Popover.Button>
            </VStack>
          </Popover.Panel>
        </Transition>
      </Popover>
    </VStack>
  ));

  return (
    <div className="SupportCenter flex flex-col gap-4 w-full text-white mt-[18px] lg:mt-0">
      <SupportCenterSelector
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <div className="flex flex-col gap-[15px] items-center justify-between w-full bg-dark-grey rounded-2xl lg:p-[16px]">
        <div className="flex flex-row items-center justify-between w-full">
          <ListingSearchInput setInputData={setInputData} />
          <ListingSearchCalendar dateRange={dateRange} setDateRange={setDateRange} />
        </div>

        <div className="w-full flex flex-col gap-2 lg:gap-0">
          <div className="hidden w-full lg:flex flex-row gap-[20px] bg-selected-dark rounded-2xl p-[16px] text-[18px]">
            <span className="w-[10%]">Дата</span>
            <span className="w-[25%]">ID</span>
            <span className="w-[35%]">Тема звернення</span>
            <span className="w-[15%]">Статус</span>
            <span className="w-[15%]">Дія</span>
          </div>

          {width >= 1024 ? renderSupportData : renderSupportDataMobile}
        </div>
      </div>

      <Pagination
        dataLength={supportData?.totalCount || 0}
        itemsPerPage={messagesLimit}
        currentPage={currentPage}
        setPage={handleClickPage}
        offset={offset}
        fetchNext={fetchNext}
        fetchPrev={fetchPrev}
      />

      {/* --------------Видалення-категорії----------------- */}
      {viewContentSelectedMessage && (
        <ViewContentModal
          viewContentSelectedMessage={viewContentSelectedMessage}
          setViewContentSelectedMessage={setViewContentSelectedMessage}
        />
      )}

      {/* --------------Видалення-категорії----------------- */}
      {changeStatusSelectedMessage && (
        <ChangeStatusModal
          changeStatusSelectedMessage={changeStatusSelectedMessage}
          setChangeStatusSelectedMessage={setChangeStatusSelectedMessage}
          refetchSupportData={refetchSupportData}
        />
      )}
    </div>
  );
};

export default SupportCenter;
