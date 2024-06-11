/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from 'react';

import FeedbackActionModal from './components/FeedbackActionModal';
import SortDirectionSelector from './components/SortDirectionSelector';
import { ComplaintsResponse } from './interfaces/Complaints';

import { Rating } from '@/enteties/Rating';
import alertSVG from '@/shared/assets/icons/alert.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { DISPUTE_TYPES } from '@/shared/const/disputeTypes';
import useAxios from '@/shared/lib/hooks/useAxios';
import { Icon } from '@/shared/ui/Icon';
import Pagination from '@/shared/ui/Pagination/Pagination';
import { formatDate } from '@/shared/utils/formatDate';
import ListingSearchCalendar, {
  IRangeDate,
} from '@/widgets/ListingSort/ui/components/ListingSearchCalendar';
import ListingSearchInput from '@/widgets/ListingSort/ui/components/ListingSearchInput';

const createUrlQuery = (
  limit: number | undefined,
  offset: number | undefined,
  sortDirection: string | undefined,
  inputData: string | undefined,
  dateRange: IRangeDate | undefined,
) => {
  let url = `?`;

  if (limit) url += `limit=${limit}&`;
  if (offset) url += `offset=${offset}&`;
  if (sortDirection) url += `sortDirection=${sortDirection}&`;
  if (inputData) url += `search=${inputData}&`;
  if (dateRange?.startDate) url += `startDate=${dateRange.startDate.toISOString()}&`;
  if (dateRange?.endDate) url += `endDate=${dateRange.endDate.toISOString()}`;

  return url;
};

const ManagingFeedback: FC = () => {
  const [sortDirection, setSortDirection] = useState<'-1' | '1'>('1');
  const [inputData, setInputData] = useState<string>('');
  const [dateRange, setDateRange] = useState<IRangeDate>({
    startDate: new Date(0),
    endDate: new Date(),
    key: 'selection',
  });

  const [offset, setOffset] = useState(0);
  const limit = 4;
  const currentPage = offset / limit + 1;

  const { data, isLoading, refetch } = useAxios<ComplaintsResponse>(
    `${ApiRoutes.COMPLAINTS}${createUrlQuery(limit, offset, sortDirection, inputData, dateRange)}`,
  );

  const fetchNext = () => setOffset(offset + limit);
  const fetchPrev = () => setOffset(offset - limit);
  const handleClickPage = (pageNumber: number) => setOffset(limit * (pageNumber - 1));

  return (
    <div className="ManagingFeedback flex flex-col w-full text-white font-outfit font-[400] text-[14px]">
      <div className="flex flex-row gap-[15px] items-center justify-between w-full bg-dark-grey rounded-2xl px-[20px] py-[8px]">
        <SortDirectionSelector
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
        <ListingSearchInput setInputData={setInputData} />
        <ListingSearchCalendar dateRange={dateRange} setDateRange={setDateRange} />
      </div>

      <div className="w-full flex flex-col gap-2 bg-selected-dark rounded-2xl mt-[20px]">
        <div className="w-full flex flex-row gap-[15px] p-[16px] text-[16px]">
          <span className="w-[10%]">ID</span>
          <span className="w-[30%]">Коментар покупця</span>
          <span className="w-[25%]">Відповідь продавця</span>
          <span className="w-[20%]">Звернення продавця</span>
          <span className="w-[10%]">Дата</span>
          <span className="w-[5%]">Дії</span>
        </div>

        {data?.complaints?.map((complaint, index) => (
          <div
            key={complaint._id}
            className={` ${index % 2 || 'bg-dark-grey'} ${index === data.complaints.length - 1 && 'rounded-b-2xl'} w-full flex flex-row items-start gap-[15px] p-[16px]`}
          >
            <div className="w-[10%] break-words overflow-hidden">{complaint._id}</div>

            <div className="w-[30%] flex flex-col gap-[5px] overflow-hidden">
              <span className="font-[600]">{complaint.comment.email}</span>
              <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                {complaint.product.name}
              </span>
              <span>
                <Rating rating={complaint.comment.rating} />
              </span>
              <span className="text-disabled">{complaint.comment.comment}</span>

              {complaint.comment.images.length > 0 && (
                <span className="flex flex-row flex-wrap gap-[5px]">
                  {complaint.comment.images.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={`${process.env.BASE_URL}${imageUrl}`}
                      alt={imageUrl}
                      className="w-[68px] h-[68px] object-contain"
                    />
                  ))}
                </span>
              )}
            </div>

            <div className="w-[25%] overflow-hidden flex flex-col gap-[5px]">
              <span className="font-[600]">{complaint.response.username}</span>
              <span className="text-disabled">{complaint.response.comment}</span>
            </div>

            <div className="w-[20%] overflow-hidden flex flex-row gap-[5px]">
              <div className="w-[18px] h-[18px] flex items-center justify-center">
                <Icon aria-hidden="true" Svg={alertSVG} />
              </div>
              <span className="text-disabled">
                {DISPUTE_TYPES[complaint.reason]?.text || 'Не визначено'}
              </span>
            </div>

            <div className="w-[10%] overflow-hidden">
              {formatDate(complaint.createdAt)}
            </div>
            <div className="w-[5%] flex justify-center">
              <FeedbackActionModal complaint={complaint} refetch={refetch} />
            </div>
          </div>
        ))}
      </div>

      <Pagination
        dataLength={data?.totalCount || 0}
        itemsPerPage={limit}
        currentPage={currentPage}
        setPage={handleClickPage}
        offset={offset}
        fetchNext={fetchNext}
        fetchPrev={fetchPrev}
      />
    </div>
  );
};

export default ManagingFeedback;
