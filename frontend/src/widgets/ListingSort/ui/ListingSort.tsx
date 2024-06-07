import { useEffect, useState } from 'react';

import { adminOffersActions } from '@/features/managingOffers';
import { getAdminOffersStatus } from '@/features/managingOffers/model/selectors';
import block from '@/shared/assets/icons/block.svg?react';
import published from '@/shared/assets/icons/published.svg?react';
import reject from '@/shared/assets/icons/reject.svg?react';
import allListing from '@/shared/assets/icons/supportCenterFilterAll.svg?react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

const ListingSort = () => {
  const [selectedFilter, setSelectedFilter] = useState('');

  const dispatch = useAppDispatch();

  const status = useAppSelector(getAdminOffersStatus);

  useEffect(() => {
    setSelectedFilter(status);
  }, [status]);

  const btnArr = [
    { id: 0, value: '', text: 'Всі', svg: allListing },
    { id: 1, value: 'published', text: 'Опубліковані', svg: published },
    { id: 2, value: 'canceled', text: 'Відхилені', svg: reject },
    { id: 3, value: 'blocked', text: 'Заблоковані', svg: block },
  ];

  const onSortBtnClick = (value: string) => {
    if (status !== value) {
      dispatch(adminOffersActions.setStatus(value));
    }
  };

  return (
    <ul className="bg-dark-grey gap-2 flex items-center justify-between h-[64px] lg:px-4 lg:py-2 lg:rounded-2xl min-w-full relative overflow-x-auto lg:overflow-hidden">
      {btnArr.map((elem) => {
        return (
          <li key={elem.id} className="w-[180px] h-8 lg:h-[48px]">
            <Button
              variant="clear"
              className={`${selectedFilter === elem.value && 'bg-selected-dark text-white'}
                hover:bg-selected-dark group flex items-center justify-start gap-[6px] 
                p-[4px_8px] lg:p-[9px_12px] w-full 
                 rounded-[8px] lg:rounded-[16px]`}
              onClick={() => onSortBtnClick(elem.value)}
            >
              <div
                className={`${selectedFilter === elem.value && 'bg-main'} w-6 h-6 lg:w-[31px] lg:h-[31px] rounded-lg flex items-center justify-center`}
              >
                <Icon
                  aria-hidden="true"
                  Svg={elem.svg}
                  className={`${
                    selectedFilter === elem.value
                      ? 'stroke-selected-dark'
                      : 'stroke-disabled'
                  } h-4 w-4 lg:h-5 lg:w-5 duration-75 pointer-events-none`}
                />
              </div>
              <Text
                Tag="span"
                text={elem.text}
                size="md"
                color={selectedFilter === elem.value ? 'white' : 'gray'}
              />
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default ListingSort;
