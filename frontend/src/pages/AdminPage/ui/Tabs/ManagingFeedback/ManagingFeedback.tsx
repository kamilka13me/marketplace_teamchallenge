/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { FC, useState } from 'react';

import { formatDate } from '../SupportCenter/utils/formatDate';

import SortDirectionSelector from './components/SortDirectionSelector';
import { ComplaintsResponse } from './interfaces/Complaints';

import { Rating } from '@/enteties/Rating';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import Pagination from '@/shared/ui/Pagination/Pagination';
import ListingSearchCalendar, {
  IRangeDate,
} from '@/widgets/ListingSort/ui/components/ListingSearchCalendar';
import ListingSearchInput from '@/widgets/ListingSort/ui/components/ListingSearchInput';

const testImagesArray = [
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
];

const createUrlQuery = (
  limit: number | undefined,
  offset: number | undefined,
  // selectedFilter: string | undefined,
  // inputData: string | undefined,
  // dateRange: IRangeDate | undefined,
) => {
  let url = `?`;

  if (limit) url += `limit=${limit}&`;
  if (offset) url += `offset=${offset}&`;
  // if (selectedFilter !== 'all') url += `status=${selectedFilter}&`;
  // if (inputData) url += `search=${inputData}&`;
  // if (dateRange?.startDate) url += `startDate=${dateRange.startDate.toISOString()}&`;
  // if (dateRange?.endDate) url += `endDate=${dateRange.endDate.toISOString()}`;

  return url;
};

const ManagingFeedback: FC = () => {
  const [sortDirection, setSortDirection] = useState<'-1' | '1'>('-1');
  const [inputData, setInputData] = useState<string>('');
  const [dateRange, setDateRange] = useState<IRangeDate>({
    startDate: new Date(0),
    endDate: new Date(),
    key: 'selection',
  });

  console.log(inputData);

  const [offset, setOffset] = useState(0);
  const limit = 3;
  const currentPage = offset / limit + 1;

  const { data, isLoading, refetch } = useAxios<ComplaintsResponse>(
    `${ApiRoutes.COMPLAINTS}${createUrlQuery(limit, offset)}`,
  );

  console.log(data);

  const fetchNext = () => setOffset(offset + limit);
  const fetchPrev = () => setOffset(offset - limit);
  const handleClickPage = (pageNumber: number) => setOffset(limit * (pageNumber - 1));

  return (
    <div className="ManagingFeedback flex flex-col gap-4 w-full text-white mt-[18px] font-outfit font-[400] text-[14px]">
      <div className="flex flex-row gap-[15px] items-center justify-between w-full bg-dark-grey rounded-2xl px-[20px] py-[8px]">
        <SortDirectionSelector
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
        <ListingSearchInput setInputData={setInputData} />
        <ListingSearchCalendar dateRange={dateRange} setDateRange={setDateRange} />
      </div>

      <div className="w-full flex flex-col gap-2 bg-selected-dark rounded-2xl">
        <div className="w-full flex flex-row gap-[20px] p-[16px] text-[16px]">
          <span className="w-[10%]">ID</span>
          <span className="w-[35%]">Коментар покупця</span>
          <span className="w-[20%]">Відповідь продавця</span>
          <span className="w-[20%]">Звернення продавця</span>
          <span className="w-[10%]">Дата</span>
          <span className="w-[5%]">Дії</span>
        </div>

        {data?.complaints?.map((complaint, index) => (
          <div
            key={complaint._id}
            className={` ${index % 2 || 'bg-dark-grey'} ${index === data.complaints.length - 1 && 'rounded-b-2xl'} w-full flex flex-row items-start gap-[20px] p-[16px]`}
          >
            <span className="w-[10%] break-words overflow-hidden">{complaint._id}</span>

            <div className="w-[35%] flex flex-col gap-[5px] overflow-hidden">
              <span>{complaint.comment.authorId.email}</span>
              <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                {complaint.product.name}
              </span>
              <span>
                <Rating rating={3} />
              </span>
              <span>{complaint.comment.comment}</span>

              {complaint.comment.images.length > 0 && (
                <span className="flex flex-row flex-wrap gap-[5px]">
                  {complaint.comment.images.map((imageUrl, index) => (
                    <img
                      key={imageUrl + index}
                      src={imageUrl}
                      alt={imageUrl}
                      className="w-[68px] h-[68px] object-contain"
                    />
                  ))}
                </span>
              )}

              {testImagesArray.length > 0 && (
                <div className="flex flex-row flex-wrap gap-[5px]">
                  {testImagesArray.map((imageUrl, index) => (
                    <img
                      key={imageUrl + index}
                      src={imageUrl}
                      alt={imageUrl}
                      className="w-[68px] h-[68px] object-contain"
                    />
                  ))}
                </div>
              )}
            </div>

            <span className="w-[20%] overflow-hidden flex flex-col gap-[5px]">
              <span>{complaint.response.authorId.username}</span>
              <span>{complaint.response.comment}</span>
            </span>
            <span className="w-[20%] overflow-hidden flex flex-col gap-[5px]">
              <span>Звернення продавця</span>
              <span>Звернення продавця</span>
            </span>
            <span className="w-[10%] overflow-hidden">
              {formatDate(complaint.created_at)}
            </span>
            <span className="w-[5%] overflow-hidden flex justify-center">
              <button
                type="button"
                onClick={() => {}}
                className="w-full h-[32px] flex justify-center items-center gap-[4px]"
              >
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="w-[4px] h-[4px] bg-white rounded-full" />
                ))}
              </button>
            </span>
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
