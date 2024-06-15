/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react';

import { Disclosure } from '@headlessui/react';

import FeedbackActionModal from './components/FeedbackActionModal';
import SortDirectionSelector from './components/SortDirectionSelector';
import { Complaint, ComplaintsResponse } from './interfaces/Complaints';

import { Rating } from '@/enteties/Rating';
import alertSVG from '@/shared/assets/icons/alert.svg?react';
import arrow from '@/shared/assets/icons/arrow-right.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { DISPUTE_TYPES } from '@/shared/const/disputeTypes';
import useAxios from '@/shared/lib/hooks/useAxios';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import Pagination from '@/shared/ui/Pagination/Pagination';
import { HStack, VStack } from '@/shared/ui/Stack';
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

interface FeedbackItemProps {
  complaint: Complaint;
  refetch: () => void;
}

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

  const [width, setWidth] = useState<number>(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderFeedbacks = data?.complaints?.map((complaint, index) => (
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
        <span className="font-[600]">{complaint.response?.username}</span>
        <span className="text-disabled">{complaint.response?.comment}</span>
      </div>

      <div className="w-[20%] overflow-hidden flex flex-row gap-[5px]">
        <div className="w-[18px] h-[18px] flex items-center justify-center">
          <Icon aria-hidden="true" Svg={alertSVG} />
        </div>
        <span className="text-disabled">
          {DISPUTE_TYPES[complaint.reason]?.text || 'Не визначено'}
        </span>
      </div>

      <div className="w-[10%] overflow-hidden">{formatDate(complaint.createdAt)}</div>
      <div className="w-[5%] flex justify-center">
        <FeedbackActionModal complaint={complaint} refetch={refetch} />
      </div>
    </div>
  ));

  // eslint-disable-next-line react/no-unstable-nested-components
  const FeedbackItem: FC<FeedbackItemProps> = ({ complaint, refetch }) => {
    const [comentOpen, setComentOpen] = useState(false);
    const [sellerComentOpen, setSellerComentOpen] = useState(false);

    return (
      <HStack
        key={complaint._id}
        className="w-full items-start bg-selected-dark rounded-2xl gap-1 p-4"
      >
        <VStack className="w-full items-center justify-between">
          <div className="w-full break-words overflow-hidden">ID {complaint._id}</div>
          <FeedbackActionModal complaint={complaint} refetch={refetch} />
        </VStack>

        <VStack className="w-full items-center justify-between">
          <span className="font-[600] text-ellipsis overflow-hidden text-nowrap mr-5">
            Покупець {complaint.comment.email}
          </span>
          <div>{formatDate(complaint.createdAt)}</div>
        </VStack>

        <span className="text-wrap">{complaint.product.name}</span>

        <HStack
          className={`w-full gap-1 overflow-hidden ${comentOpen ? 'h-auto' : 'h-[44px]'}`}
        >
          <Rating rating={complaint.comment.rating} />
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
        </HStack>

        <VStack className="w-full justify-end">
          <Button
            variant="clear"
            onClick={() => {
              setComentOpen(!comentOpen);
            }}
            className={`border-b-2  ${comentOpen ? 'text-grey border-b-grey' : 'text-white border-b-white'}`}
          >
            {comentOpen ? 'Згорнути' : 'Дивитися'}
          </Button>
        </VStack>

        <HStack
          className={`w-full border-l-2 border-l-main pl-2 overflow-hidden gap-2 ${sellerComentOpen ? 'h-auto' : 'h-[50px]'}`}
        >
          <VStack gap="1">
            <span className="font-[600]">Продавець</span>
            {complaint.response?.username}
          </VStack>
          <span className="text-disabled">{complaint.response?.comment}</span>
        </HStack>

        <VStack className="w-full justify-end">
          <Button
            variant="clear"
            onClick={() => {
              setSellerComentOpen(!sellerComentOpen);
            }}
            className={`border-b-2  ${sellerComentOpen ? 'text-grey border-b-grey' : 'text-white border-b-white'}`}
          >
            {sellerComentOpen ? 'Згорнути' : 'Дивитися'}
          </Button>
        </VStack>

        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex flex-row items-center p-2">
                <Icon
                  aria-hidden="true"
                  Svg={alertSVG}
                  width={18}
                  height={18}
                  className="mr-[10px]"
                />
                <span className="font-[600] mr-1">Звернення</span>
                <Icon
                  Svg={arrow}
                  className={`ml-auto fill-main-white ${open ? '-rotate-90' : 'rotate-90'}`}
                  width={18}
                  height={18}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="pl-2">
                <span className="text-disabled">
                  {DISPUTE_TYPES[complaint.reason]?.text || 'Не визначено'}
                </span>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </HStack>
    );
  };
  const renderFeedbacksMobile = data?.complaints?.map((complaint, index) => (
    <FeedbackItem key={index} complaint={complaint} refetch={refetch} />
  ));

  return (
    <HStack className="ManagingFeedback w-full text-white font-outfit font-[400] text-[14px] mt-[18px] lg:mt-0">
      <HStack className="lg:flex-row gap-2 lg:gap-[15px] lg:items-center justify-between w-full lg:bg-dark-grey rounded-2xl lg:px-5 lg:py-2">
        <div className="pl-3">
          <SortDirectionSelector
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />
        </div>

        <div className="-order-2 lg:order-none w-full lg:w-auto">
          <ListingSearchInput setInputData={setInputData} className="w-full" />
        </div>
        <div className="-order-1 lg:order-none">
          <ListingSearchCalendar
            dateRange={dateRange}
            setDateRange={setDateRange}
            classNameDateSort="block lg:hidden"
            classNameCalendar="right-[305px]"
          />
        </div>
      </HStack>

      <HStack className="w-full gap-2 lg:bg-selected-dark lg:rounded-2xl mt-6 lg:mt-[20px]">
        <VStack className="hidden w-full lg:flex gap-[15px] p-[16px] text-[16px]">
          <span className="w-[10%]">ID</span>
          <span className="w-[30%]">Коментар покупця</span>
          <span className="w-[25%]">Відповідь продавця</span>
          <span className="w-[20%]">Звернення продавця</span>
          <span className="w-[10%]">Дата</span>
          <span className="w-[5%]">Дії</span>
        </VStack>

        {width >= 1024 ? renderFeedbacks : renderFeedbacksMobile}
      </HStack>

      <Pagination
        dataLength={data?.totalCount || 0}
        itemsPerPage={limit}
        currentPage={currentPage}
        setPage={handleClickPage}
        offset={offset}
        fetchNext={fetchNext}
        fetchPrev={fetchPrev}
      />
    </HStack>
  );
};

export default ManagingFeedback;
