import { FC, useState } from 'react';

import ListingSearchCalendar from './components/ListingSearchCalendar';
import ListingSearchInput from './components/ListingSearchInput';
import SpecyfyingSorting from './components/SpecyfyingSorting';

import { SpecyfyingSortingProps } from '@/pages/AdminPage/ui/Tabs/ManagingOffers/ManagingOffers';
import sort from '@/shared/assets/icons/sort-date.svg?react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

export interface ListingByDateProps extends SpecyfyingSortingProps {
  setInputData: (e: string) => void;
}

const ListingByDate: FC<ListingByDateProps> = ({
  setInputData,
  isCheckedAscending,
  isCheckedDescending,
  setIsCheckedAscending,
  setIsCheckedDescending,
}) => {
  const [sortingOpen, setSortingOpen] = useState<boolean>(false);

  return (
    <VStack>
      <div className="flex items-center justify-between gap-[30px]">
        <div className="flex items-center justify-center rounded-[16px] relative">
          <Text
            Tag="span"
            text="Сортування за"
            size="sm"
            font-normal
            color="white"
            className="w-[99px] hidden md:block"
          />
          <Button variant="clear" onClick={() => setSortingOpen((prev) => !prev)}>
            <Icon
              aria-hidden="true"
              Svg={sort}
              width={24}
              height={32}
              className="stroke-white mr-3"
            />
          </Button>
          {sortingOpen && (
            <SpecyfyingSorting
              isCheckedAscending={isCheckedAscending}
              isCheckedDescending={isCheckedDescending}
              setIsCheckedAscending={setIsCheckedAscending}
              setIsCheckedDescending={setIsCheckedDescending}
            />
          )}
        </div>
        <ListingSearchInput setInputData={setInputData} />
        <ListingSearchCalendar />
      </div>
    </VStack>
  );
};

export default ListingByDate;
