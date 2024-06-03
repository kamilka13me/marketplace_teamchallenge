import { useEffect, useState } from 'react';

import ListingDropDownBtn from './components/ListingDropDownBtn';

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
  // const [clicked, setClicked] = useState(0);
  const [dropDownOpen, setDropDownOpen] = useState(false);

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

  const onSortBtnClick = (elId: number, value: string) => {
    if (elId === 4) {
      setDropDownOpen((prev: boolean) => !prev);
    }
    // setClicked(elId);
    if (status !== value) {
      dispatch(adminOffersActions.setStatus(value));
    }
  };

  return (
    <ul className="bg-dark-grey flex justify-between sm:px-3 px-4 py-2 md:rounded-2xl min-w-full relative">
      {btnArr.map((elem) => {
        return (
          <li key={elem.id} className="w-[180px] h-[48px]">
            <Button
              variant="clear"
              className={`${selectedFilter === elem.value && 'bg-selected-dark text-white'}
              ${elem.id === 4 && ' md:hidden'}
                hover:bg-selected-dark group flex items-center justify-start gap-[6px] 
                p-[4px_8px] md:p-[9px_12px] w-full 
                 rounded-[8px] md:rounded-[16px]`}
              onClick={() => onSortBtnClick(elem.id, elem.value)}
            >
              <div
                className={`${selectedFilter === elem.value && 'bg-main'} w-[31px] h-[31px] rounded-[7px] flex items-center justify-center`}
              >
                <Icon
                  aria-hidden="true"
                  Svg={elem.svg}
                  className={
                    selectedFilter === elem.value
                      ? 'stroke-selected-dark'
                      : 'stroke-disabled'
                  }
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
      {dropDownOpen && <ListingDropDownBtn />}
    </ul>
  );
};

export default ListingSort;
