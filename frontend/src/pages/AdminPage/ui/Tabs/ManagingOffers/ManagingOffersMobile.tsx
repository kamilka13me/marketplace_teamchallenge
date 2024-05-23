import { FC, useState } from 'react';

import { HStack } from '@/shared/ui/Stack';
import { ListingByDate, ListingSort } from '@/widgets/ListingSort';
import ListingDataMapMobile from '@/widgets/ListingSort/ui/components/ListingDataMapMobile';

export interface SpecyfyingSortingProps {
  isCheckedAscending: boolean;
  isCheckedDescending: boolean;
  setIsCheckedAscending: (e: boolean) => void;
  setIsCheckedDescending: (e: boolean) => void;
}

const ManagingOffersMobile: FC = () => {
  const [inputData, setInputData] = useState<string>('');
  const [isCheckedAscending, setIsCheckedAscending] = useState(false);
  const [isCheckedDescending, setIsCheckedDescending] = useState(false);

  return (
    <section className="flex flex-col w-full lg:gap-4 bg-dark-grey lg:bg-transparent rounded-2xl">
      <ListingSort />
      <HStack gap="4" className="px-5 bg-dark-grey rounded-2xl ">
        <ListingByDate
          setInputData={setInputData}
          isCheckedAscending={isCheckedAscending}
          isCheckedDescending={isCheckedDescending}
          setIsCheckedAscending={setIsCheckedAscending}
          setIsCheckedDescending={setIsCheckedDescending}
        />
        <ListingDataMapMobile
          id={inputData}
          isCheckedAscending={isCheckedAscending}
          isCheckedDescending={isCheckedDescending}
        />
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
