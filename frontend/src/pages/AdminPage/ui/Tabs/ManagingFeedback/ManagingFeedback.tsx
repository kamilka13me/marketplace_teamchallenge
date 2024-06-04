/* eslint-disable no-console */
import { FC, useState } from 'react';

import SortDirectionSelector from './components/SortDirectionSelector';

import ListingSearchCalendar, {
  IRangeDate,
} from '@/widgets/ListingSort/ui/components/ListingSearchCalendar';
import ListingSearchInput from '@/widgets/ListingSort/ui/components/ListingSearchInput';

const ManagingFeedback: FC = () => {
  const [sortDirection, setSortDirection] = useState<'-1' | '1'>('-1');
  const [inputData, setInputData] = useState<string>('');
  const [dateRange, setDateRange] = useState<IRangeDate>({
    startDate: new Date(0),
    endDate: new Date(),
    key: 'selection',
  });

  console.log(inputData);

  return (
    <div className="ManagingFeedback flex flex-col gap-4 w-full text-white mt-[18px] lg:mt-0">
      <div className="flex flex-row gap-[15px] items-center justify-between w-full bg-dark-grey rounded-2xl px-[20px] py-[8px]">
        <SortDirectionSelector
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
        <ListingSearchInput setInputData={setInputData} />
        <ListingSearchCalendar dateRange={dateRange} setDateRange={setDateRange} />
      </div>

      <div className="flex flex-col gap-[15px] items-center justify-between w-full bg-dark-grey rounded-2xl lg:p-[16px]">
        ManagingFeedback
      </div>
    </div>
  );
};

export default ManagingFeedback;
