import { useState } from 'react';

import ListingDropDownBtn from './components/ListingDropDownBtn';

import block from '@/shared/assets/icons/block.svg?react';
import published from '@/shared/assets/icons/published.svg?react';
import reject from '@/shared/assets/icons/reject.svg?react';
import allListing from '@/shared/assets/icons/supportCenterFilterAll.svg?react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

const ListingSort = () => {
  const [clicked, setClicked] = useState(0);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const btnArr = [
    { id: 0, text: 'Всі', svg: allListing },
    { id: 1, text: 'Опубліковані', svg: published },
    { id: 2, text: 'Відхилені', svg: reject },
    { id: 3, text: 'Заблоковані', svg: block },
  ];

  const onSortBtnClick = (elId: number) => {
    if (elId === 4) {
      setDropDownOpen((prev: boolean) => !prev);
    }
    setClicked(elId);
  };

  return (
    <ul className="bg-dark-grey flex justify-between sm:px-3 px-4 py-2 md:rounded-2xl min-w-full relative">
      {btnArr.map((elem, ind) => {
        return (
          <li key={elem.id} className="w-[180px] h-[48px]">
            <Button
              variant="clear"
              className={`${clicked === ind && 'bg-selected-dark text-white'}
              ${elem.id === 4 && ' md:hidden'}
                hover:bg-selected-dark group flex items-center justify-start gap-[6px] 
                p-[4px_8px] md:p-[9px_12px] w-full 
                 rounded-[8px] md:rounded-[16px]`}
              onClick={() => onSortBtnClick(elem.id)}
            >
              <div
                className={`${clicked === ind && 'bg-main'} w-[31px] h-[31px] rounded-[7px] flex items-center justify-center`}
              >
                <Icon
                  aria-hidden="true"
                  Svg={elem.svg}
                  className={clicked === ind ? 'stroke-selected-dark' : 'stroke-disabled'}
                />
              </div>
              <Text
                Tag="span"
                text={elem.text}
                size="md"
                color={clicked === ind ? 'white' : 'gray'}
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
