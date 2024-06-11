import { FC, useEffect, useState } from 'react';

import { RangeKeyDict } from 'react-date-range';

import { getIsSellersLoading } from '@/enteties/Seller/model/selectors/getSellersSelectors';
import { fetchAllSellers } from '@/enteties/Seller/model/services/getAllSellers';
import { getSellers } from '@/enteties/Seller/model/slice/sellersSlice';
import AdminManagingSellersController from '@/features/AdminManagingSellers/ui/AdminManagingSellersController';
import calendar from '@/shared/assets/icons/calendar.svg?react';
import search from '@/shared/assets/icons/search.svg?react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import CustomCalendar from '@/shared/ui/CustomCalendar/ui/CustomCalendar';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { VStack } from '@/shared/ui/Stack';
import DateSortWidget from '@/widgets/DateSortWidget/ui/DateSortWidget';
import { IRangeDate } from '@/widgets/ListingSort/ui/components/ListingSearchCalendar';

const dateRange = undefined;

const AdminManagingSellers: FC = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [state, setState] = useState<IRangeDate[]>([
    dateRange || {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleOnChange = (ranges: RangeKeyDict) => {
    const { selection } = ranges;

    setState([selection as IRangeDate]);
  };

  const dispatch = useAppDispatch();

  const sellers = useAppSelector(getSellers.selectAll);
  const isLoading = useAppSelector(getIsSellersLoading);

  useEffect(() => {
    dispatch(fetchAllSellers({}));
  }, [dispatch]);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="text-main-white bg-dark-grey rounded-2xl p-4 w-full">
      <VStack justify="between" className="">
        <div className="lg:max-w-[346px]">
          <div className="flex flex-nowrap items-center w-full lg:w-auto mb-5">
            <Input
              name="searchInput"
              type="text"
              variant="search"
              className="min-h-[38px] w-full bg-selected-dark"
              classNameBlockWrap="w-full"
            />
            <Button
              variant="primary"
              className="rounded-l-none !px-[14px] py-[9px]"
              type="submit"
              onClick={() => {}}
            >
              <Icon Svg={search} width={20} height={20} />
            </Button>
          </div>
        </div>
        <VStack gap="2" align="center">
          <DateSortWidget onSelectRange={() => {}} />
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
              dates={state}
              setDates={setState}
              handleOnChange={handleOnChange}
            />
          </div>
        </VStack>
      </VStack>

      <table className="table-auto overflow-scroll w-full hidden lg:inline">
        <thead>
          <tr className="bg-selected-dark rounded-2xl">
            <th className="!font-normal text-start p-[10px] text-lg w-[174px] rounded-l-2xl">
              Імʼя продавця
            </th>
            <th className="!font-normal text-start p-[10px] text-lg w-[154px]">
              ID Продавця
            </th>
            <th className="!font-normal text-start p-[10px] text-lg w-[174px]">Email</th>
            <th className="!font-normal text-start p-[10px] text-lg w-[174px]">
              Дата реєстрації
            </th>
            <th className="!font-normal text-center p-[10px] text-lg w-[162px]">
              Статус
            </th>
            <th className="!font-normal p-[10px] text-start text-lg w-[100px] rounded-r-2xl">
              Дії
            </th>
          </tr>
        </thead>
        <tbody>
          {sellers?.map((seller) => (
            <tr
              key={seller._id}
              className="!font-normal  text-start even:bg-selected-dark "
            >
              <th className="!font-normal text-start p-[10px] text-lg w-[174px]  rounded-l-2xl">
                Імʼя продавця
              </th>
              <th className="!font-normal text-start p-[10px] text-lg w-[154px]">
                ID Продавця
              </th>
              <th className="!font-normal text-start p-[10px] text-lg w-[174px]">
                Email
              </th>
              <th className="!font-normal text-start p-[10px] text-lg w-[174px]">
                Дата реєстрації
              </th>
              <th className="!font-normal text-center p-[10px] text-lg w-[162px]">
                Статус
              </th>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th className=" !font-normal  text-lg w-[100px]  rounded-r-2xl">
                <AdminManagingSellersController />
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManagingSellers;
