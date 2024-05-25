import { useState } from 'react';

import ListingDropDownBtn from './components/ListingDropDownBtn';

import allListing from '@/shared/assets/icons/allListing.svg?react';
import block from '@/shared/assets/icons/block.svg?react';
import dropdown from '@/shared/assets/icons/listing-dropdown.svg?react';
import published from '@/shared/assets/icons/published.svg?react';
import reject from '@/shared/assets/icons/reject.svg?react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

const ListingSort = () => {
  const [clicked, setClicked] = useState<React.SetStateAction<number>>();
  const [dropDownOpen, setDropDownOpen] = useState<React.SetStateAction<boolean>>(false);

  const btnArr = [
    { id: 0, text: 'Всі', svg: allListing },
    { id: 1, text: 'Опубліковані', svg: published },
    { id: 2, text: 'Відхилені', svg: reject },
    { id: 3, text: 'Заблоковані', svg: block },
    { id: 4, text: 'Відхилен', svg: dropdown },
  ];

  return (
    <ul className="bg-dark-grey flex justify-between sm:px-3 py-5 md:rounded-2xl min-w-full relative">
      {btnArr.map((elem, ind) => {
        return (
          <li
            key={elem.id}
            className={`${elem.id === 2 && ' hidden md:block'} 
          ${elem.id === 3 && ' hidden md:block'}
          `}
          >
            <Button
              variant="clear"
              className={`${clicked === ind && 'bg-selected-dark text-white'}
              ${elem.id === 4 && ' md:hidden'}
                hover:bg-selected-dark group flex items-center justify-start gap-[6px] 
                p-[4px_8px] md:p-[4px_12px] xl:w-[180px] h-[48px]
                 rounded-[8px] md:rounded-[16px]`}
              onClick={() => {
                // eslint-disable-next-line no-unused-expressions
                elem.id !== 4
                  ? setClicked(elem.id)
                  : // eslint-disable-next-line no-sequences
                    setDropDownOpen((prev: boolean) => !prev),
                  setClicked(elem.id);
              }}
            >
              <Icon
                aria-hidden="true"
                Svg={elem.svg}
                width={elem.svg === allListing ? 30 : 24}
                height={elem.svg === allListing ? 30 : 24}
                className={
                  // eslint-disable-next-line no-nested-ternary
                  elem.svg === allListing
                    ? ''
                    : clicked === ind
                      ? 'stroke-white'
                      : 'stroke-disabled'
                }
              />
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
