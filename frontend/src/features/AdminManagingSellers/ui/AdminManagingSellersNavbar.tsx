import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import { t } from 'i18next';
import { RangeKeyDict } from 'react-date-range';

import { getSellersSortDirection } from '@/enteties/Seller/model/selectors/getSellersSelectors';
import { fetchAllSellers } from '@/enteties/Seller/model/services/getAllSellers';
import { sellersActions } from '@/enteties/Seller/model/slice/sellersSlice';
import calendar from '@/shared/assets/icons/calendar.svg?react';
import checked from '@/shared/assets/icons/checked-gold.svg?react';
import search from '@/shared/assets/icons/search.svg?react';
import sort from '@/shared/assets/icons/sort-date.svg?react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import CustomCalendar from '@/shared/ui/CustomCalendar/ui/CustomCalendar';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import DateSortWidget, { buttonData } from '@/widgets/DateSortWidget/ui/DateSortWidget';
import {
  IRangeDate,
  RangeSortType,
} from '@/widgets/ListingSort/ui/components/ListingSearchCalendar';

interface Props {
  dateState: IRangeDate[];
  setDateState: Dispatch<SetStateAction<IRangeDate[]>>;
}

const adjustDate = (date: Date, days: number) => {
  date.setDate(date.getDate() + days);

  return date;
};

const AdminManagingSellersNavbar: FC<Props> = (props) => {
  const { dateState, setDateState } = props;

  const [sortingOpen, setSortingOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const sortDirection = useAppSelector(getSellersSortDirection);

  const dispatch = useAppDispatch();

  const startDate = dateState[0]?.startDate.toLocaleDateString('uk-UA');
  const endDate = dateState[0]?.endDate.toLocaleDateString('uk-UA');

  useEffect(() => {
    const endDate = adjustDate(new Date(dateState[0]?.endDate as unknown as Date), 2);

    dispatch(
      sellersActions.setEndDate(endDate.toISOString()?.slice(0, 10) as unknown as Date),
    );
  }, [dispatch, dateState]);

  useEffect(() => {
    const startDate = adjustDate(new Date(dateState[0]?.startDate as unknown as Date), 1);

    dispatch(
      sellersActions.setStartDate(
        startDate.toISOString()?.slice(0, 10) as unknown as Date,
      ),
    );
  }, [dispatch, dateState]);

  const handleOnChange = (ranges: RangeKeyDict) => {
    const { selection } = ranges;

    setDateState([selection as IRangeDate]);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center pb-5 gap-3">
      <div className="gap-3 order-2 lg:order-0 flex justify-between items-center">
        <div className="flex items-center rounded-[16px] relative">
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
              className="stroke-white"
            />
          </Button>
          {sortingOpen && (
            <div className="absolute top-10 left-0 w-[274px] h-[84px] bg-selected-dark hover:drop-shadow-custom-primary rounded-[8px] flex items-center justify-evenly flex-col z-50">
              <div className="w-[100%] h-[28px] p-[2px_12px] flex items-center justify-center gap-[8px]">
                <Checkbox
                  name="sort"
                  type="checkbox"
                  classNameLabel="text-disabled text-[14px] has-[:checked]:text-selected-yellow hover:text-light-grey"
                  className="w-[24px] h-[24px] border-[1px] border-light-grey rounded-[3px] hover:border-main checked:border-main focus:outline-none hover:cursor-pointer text-sm"
                  classNameIcon="ml-[2px] w-[20px]"
                  icon={checked}
                  label={t('За датою: від старих до нових')}
                  onChange={() => {
                    dispatch(sellersActions.setOffset(0));
                    dispatch(sellersActions.setSortDirection('1'));

                    dispatch(fetchAllSellers({}));
                  }}
                  checked={sortDirection === '1'}
                />
              </div>
              <div className="w-[100%] h-[28px] p-[2px_12px] flex items-center justify-center gap-[8px]">
                <Checkbox
                  name="sort1"
                  type="checkbox"
                  classNameLabel="text-disabled text-[14px] has-[:checked]:text-selected-yellow hover:text-light-grey"
                  className="w-[24px] h-[24px] border-[1px] border-light-grey rounded-[3px] hover:border-main checked:border-main  checked:hover:border-main focus:outline-none hover:cursor-pointer text-sm"
                  classNameIcon="ml-[2px] w-[20px]"
                  icon={checked}
                  label={t('За датою: від нових до старих')}
                  onChange={() => {
                    dispatch(sellersActions.setOffset(0));
                    dispatch(sellersActions.setSortDirection('-1'));

                    dispatch(fetchAllSellers({}));
                  }}
                  checked={sortDirection === '-1'}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-nowrap items-center w-full lg:w-auto">
          <Input
            name="searchInput"
            type="text"
            value={searchValue}
            variant="search"
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            className="min-h-[38px] w-full bg-selected-dark"
            classNameBlockWrap="w-full"
          />
          <Button
            variant="primary"
            className="rounded-l-none !px-[14px] py-[9px]"
            type="submit"
            onClick={() => {
              dispatch(sellersActions.setSearch(searchValue));
              dispatch(sellersActions.setOffset(0));
              dispatch(fetchAllSellers({}));
            }}
          >
            <Icon Svg={search} width={20} height={20} />
          </Button>
        </div>
      </div>

      <VStack gap="2" align="center">
        <DateSortWidget
          onSelectRange={(type: RangeSortType) => {
            const endDate = new Date();

            endDate.setDate(endDate.getDate() + 1);
            setDateState((prevState) => {
              const updatedState = prevState.map((rangeDate, index) => {
                if (index === 0) {
                  return {
                    ...rangeDate,
                    startDate:
                      buttonData.find((btn) => btn.type === type)?.clb() || new Date(),
                    endDate: new Date(),
                  };
                }

                return rangeDate;
              });

              return updatedState;
            });
            dispatch(
              sellersActions.setStartDate(
                buttonData.find((btn) => btn.type === type)?.clb() || new Date(),
              ),
            );
            dispatch(sellersActions.setEndDate(endDate));
          }}
        />
        <div className="h-[24px] hidden md:block text-nowrap">
          <Text Tag="span" text={startDate} size="sm" font-normal color="white" />
          <Text Tag="span" text="-" size="sm" font-normal color="white" />
          <Text Tag="span" text={endDate} size="sm" font-normal color="white" />
        </div>
        <Button
          variant="clear"
          onClick={() => setIsCalendarOpen((prev) => !prev)}
          className="hover:cursor-pointer"
        >
          <Icon
            Svg={calendar}
            fill="white"
            className="w-[24px] h-[24px] ml-2 lg:ml-5 xl:ml-1"
          />
        </Button>
        <div className="relative top-0 right-[32px] lg:right-[-1vw]">
          <CustomCalendar
            calendarIsOpened={isCalendarOpen}
            dates={dateState}
            setDates={setDateState}
            handleOnChange={handleOnChange}
          />
        </div>
      </VStack>
    </div>
  );
};

export default AdminManagingSellersNavbar;
