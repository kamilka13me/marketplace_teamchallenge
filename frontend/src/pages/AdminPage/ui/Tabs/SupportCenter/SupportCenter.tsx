/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useState } from 'react';

import ChangeStatusModal from './components/ChangeStatusModal';
import SupportCenterSelector from './components/SupportCenterSelector';
import ViewContentModal from './components/ViewContentModal';
import { SupportMessage, SupportMessagesResponse } from './interfaces/SupportMessage';
import { formatDate } from './utils/formatDate';

import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import Pagination from '@/shared/ui/Pagination/Pagination';
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
) => {
  let url = `/?limit=7&`;

  if (offset) url += `offset=${offset}&`;
  if (selectedFilter !== 'all') url += `status=${selectedFilter}&`;
  if (inputData) url += `search=${inputData}&`;
  if (dateRange.startDate) url += `startDate=${dateRange.startDate.toISOString()}&`;
  if (dateRange.endDate) url += `endDate=${dateRange.endDate.toISOString()}`;

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

  const [viewContentSelectedMessage, setViewContentSelectedMessage] =
    useState<SupportMessage | null>(null);
  const [changeStatusSelectedMessage, setChangeStatusSelectedMessage] =
    useState<SupportMessage | null>(null);

  const [offset, setOffset] = useState(0);
  const messagesLimit = 7;
  const currentPage = offset / messagesLimit + 1;

  const {
    data: supportData,
    isLoading,
    refetch: refetchSupportData,
  } = useAxios<SupportMessagesResponse>(
    ApiRoutes.SUPPORT + createUrlQuery(offset, selectedFilter, inputData, dateRange),
  );

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
          <ListingSearchCalendar dateRange={dateRange} setDateRange={setDateRange} />
        </div>

        <div className="w-full flex flex-col">
          <div className="w-full flex flex-row gap-[20px] bg-selected-dark rounded-2xl p-[16px] text-[18px]">
            <span className="w-[10%]">Дата</span>
            <span className="w-[25%]">ID</span>
            <span className="w-[35%]">Тема звернення</span>
            <span className="w-[15%]">Статус</span>
            <span className="w-[15%]">Дія</span>
          </div>

          {supportData?.supportMessage?.map((message, index) => (
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
          ))}
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
