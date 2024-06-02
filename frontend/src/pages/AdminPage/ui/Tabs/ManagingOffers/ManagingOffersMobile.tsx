import { FC, useState } from 'react';

import { HStack } from '@/shared/ui/Stack';
import { ListingByDate, ListingSort } from '@/widgets/ListingSort';
import ListingDataMapMobile from '@/widgets/ListingSort/ui/components/ListingDataMapMobile';

const ManagingOffersMobile: FC = () => {
  const [inputData, setInputData] = useState<string>('');
  const [isAscending, setIsAscending] = useState(true);

  return (
    <section className="flex flex-col w-full lg:gap-4 bg-dark-grey lg:bg-transparent rounded-2xl">
      <ListingSort />
      <HStack gap="4" className="px-5 bg-dark-grey rounded-2xl ">
        <ListingByDate
          setInputData={setInputData}
          isAscending={isAscending}
          setIsAscending={setIsAscending}
        />
        <ListingDataMapMobile id={inputData} isAscending={isAscending} />
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

export default ManagingOffersMobile;
