/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useState } from 'react';

import ChangeStatusModal from './components/ChangeStatusModal';
import SupportCenterSelector from './components/SupportCenterSelector';
import ViewContentModal from './components/ViewContentModal';
import { SupportMessage } from './interfaces/SupportMessage';
import { supportMessagesData } from './testData';
import { formatDate } from './utils/formatDate';

import Pagination from '@/shared/ui/Pagination/Pagination';
import ListingSearchCalendar from '@/widgets/ListingSort/ui/components/ListingSearchCalendar';
import ListingSearchInput from '@/widgets/ListingSort/ui/components/ListingSearchInput';

const supportStatusMap = {
  new: { bg: 'bg-secondary-yellow', textColor: 'text-main-dark', text: 'Новий' },
  consider: { bg: 'bg-[#F4F2EC]', textColor: 'text-main-dark', text: 'На розгляді' },
  work: { bg: 'bg-[#393939]', textColor: 'text-white', text: 'В роботі' },
  closed: { bg: 'bg-disabled', textColor: 'text-main-dark', text: 'Вирішено' },
};

const SupportCenter: FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [inputData, setInputData] = useState<string>('');

  console.log(inputData);

  const [viewContentSelectedMessage, setViewContentSelectedMessage] =
    useState<SupportMessage | null>(null);

  const [changeStatusSelectedMessage, setChangeStatusSelectedMessage] =
    useState<SupportMessage | null>(null);

  const [offset, setOffset] = useState(0);

  const { messages, count } = supportMessagesData;
  const messagesLimit = 7;
  const currentPage = offset / messagesLimit + 1;

  const fetchNext = () => setOffset(offset + messagesLimit);
  const fetchPrev = () => setOffset(offset - messagesLimit);
  const handleClickPage = (pageNumber: number) =>
    setOffset(messagesLimit * (pageNumber - 1));

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

          {messages.map((message, index) => (
            <div
              key={message._id}
              className={` ${index % 2 && 'bg-selected-dark'} w-full flex flex-row items-center gap-[20px] rounded-2xl px-[16px] py-[10px]`}
            >
              <span className="w-[15%] flex items-center text-[16px]">
                {formatDate(message.date)}
              </span>
              <span className="w-[15%] flex items-center">{message.userId}</span>
              <span className="w-[40%] flex items-center">{message.topic}</span>
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
          ))}
        </div>
      </div>

      <Pagination
        dataLength={count}
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
        />
      )}
    </div>
  );
};

export default SupportCenter;
