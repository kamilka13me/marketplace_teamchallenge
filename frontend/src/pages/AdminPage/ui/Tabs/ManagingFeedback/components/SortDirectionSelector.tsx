import { FC, useState } from 'react';

import checked from '@/shared/assets/icons/checked-gold.svg?react';
import sort from '@/shared/assets/icons/sort-date.svg?react';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

interface Props {
  sortDirection: '-1' | '1';
  setSortDirection: (sortDirection: '-1' | '1') => void;
}

const SortDirectionSelector: FC<Props> = (props) => {
  const { sortDirection, setSortDirection } = props;

  const [sortingOpen, setSortingOpen] = useState(false);

  return (
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
        <div className="absolute top-10 left-0 w-[274px] h-[84px] bg-selected-dark hover:drop-shadow-custom-primary rounded-[8px] flex items-center justify-evenly flex-col z-50">
          <div className="w-[100%] h-[28px] p-[2px_12px] flex items-center justify-center gap-[8px]">
            <Checkbox
              name="sort"
              type="checkbox"
              classNameLabel="text-disabled text-[14px] has-[:checked]:text-selected-yellow hover:text-light-grey"
              className="w-[24px] h-[24px] border-[1px] border-light-grey rounded-[3px] hover:border-main checked:border-main focus:outline-none hover:cursor-pointer text-sm"
              classNameIcon="ml-[2px] w-[20px]"
              icon={checked}
              label="За датою: від старих до нових"
              onChange={() => setSortDirection('-1')}
              checked={sortDirection === '-1'}
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
              label="За датою: від нових до старих"
              onChange={() => setSortDirection('1')}
              checked={sortDirection === '1'}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDirectionSelector;
