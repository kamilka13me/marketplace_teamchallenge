import { useState } from 'react';

import block from '@/shared/assets/icons/block.svg?react';
import reject from '@/shared/assets/icons/reject.svg?react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

const ListingDropDownBtn = () => {
  const [clicked, setClicked] = useState<React.SetStateAction<number>>();

  const btnArr = [
    { id: 5, text: 'Відхилені', svg: reject },
    { id: 6, text: 'Заблоковані', svg: block },
  ];

  return (
    <ul className="bg-selected-dark flex justify-center items-end flex-col h-[8vh] p-[7px] rounded-2xl absolute right-0 top-[8vh] md:hidden">
      {btnArr.map((elem, ind) => {
        return (
          <li
            key={elem.id}
            className={`${elem.id === 2 && ' hidden md:block'} 
              ${elem.id === 3 && ' hidden md:block'}
              w-full
              `}
          >
            <Button
              variant="clear"
              className={`${clicked === ind && 'bg-selected-dark text-white'}
                  ${elem.id === 4 && ' md:hidden'} group flex items-center justify-around
                    p-[7px] w-full
                     rounded-[8px]`}
              onClick={() => setClicked(elem.id)}
            >
              <Icon
                aria-hidden="true"
                Svg={elem.svg}
                width={24}
                height={24}
                className={clicked === ind ? 'stroke-white' : 'stroke-disabled'}
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
    </ul>
  );
};

export default ListingDropDownBtn;
