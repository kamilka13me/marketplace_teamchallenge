import { FC, useState } from 'react';

import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { ListingByDate, ListingSort } from '@/widgets/ListingSort';
import ListingDataMap from '@/widgets/ListingSort/ui/components/ListingDataMap';

export interface SpecyfyingSortingProps {
  isAscending: boolean;
  setIsAscending: (e: boolean) => void;
}

const ManagingOffers: FC = () => {
  const [inputData, setInputData] = useState('');
  const [isAscending, setIsAscending] = useState(true);

  return (
    <section className="lg:flex flex-col w-full lg:gap-4 bg-dark-grey lg:bg-transparent rounded-2xl hidden">
      <ListingSort />
      <HStack gap="4" className="p-4 bg-dark-grey rounded-2xl ">
        <ListingByDate
          setInputData={setInputData}
          isAscending={isAscending}
          setIsAscending={setIsAscending}
        />
        <table className="w-full border-separate border-spacing-0">
          <thead className="mb-1 bg-selected-dark rounded-2xl">
            <tr>
              <th aria-label="Дата" className="w-[125px] p-2.5 font-normal text-start">
                <Text Tag="span" text="Дата" size="lg" color="white" />
              </th>
              <th
                aria-label="ID Продавця"
                className="w-[140px] p-2.5 font-normal text-start"
              >
                <Text Tag="span" text="ID Продавця" size="lg" color="white" />
              </th>
              <th
                aria-label="Назва товару"
                className="w-[259px] font-normal p-2.5 text-start"
              >
                <Text
                  Tag="span"
                  text="Назва товару"
                  size="lg"
                  color="white"
                  className="max-w-[220px] max-h-12 overflow-hidden whitespace-nowrap overflow-ellipsis "
                />
              </th>
              <th
                aria-label="ID Товару"
                className="w-[120px] font-normal p-2.5 text-start"
              >
                <Text Tag="span" text="ID Товару" size="lg" color="white" />
              </th>
              <th aria-label="Ціна" className="w-[140px] font-normal p-2.5 text-start">
                <Text Tag="span" text="Ціна" size="lg" color="white" />
              </th>
              <th aria-label="Дії" className="w-[70px] font-normal p-2.5 text-start">
                <Text Tag="span" text="Дії" size="lg" color="white" />
              </th>
            </tr>
          </thead>
          <tbody>
            <ListingDataMap id={inputData} isAscending={isAscending} />
          </tbody>
        </table>
      </HStack>
      {/* <Pagination
        dataLength={totalProducts}
        itemsPerPage={limit}
        currentPage={currentPage}
        setPage={handleClick}
        offset={offset}
        fetchPrev={fetchPrev}
        fetchNext={fetchNext}
      /> */}
    </section>
  );
};

export default ManagingOffers;
