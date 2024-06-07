import { FC, useState } from 'react';

import { adminOffersActions } from '@/features/managingOffers';
import search from '@/shared/assets/icons/search.svg?react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';

interface Props {
  setInputData?: (e: string) => void;
  placeholder?: string;
}

const ListingSearchInput: FC<Props> = (props) => {
  const { setInputData, placeholder } = props;

  const [value, setValue] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (setInputData) {
      setInputData(value);
    } else {
      dispatch(adminOffersActions.setSellerId(value));
    }
  };

  return (
    <div className="flex flex-nowrap items-center hover:drop-shadow-custom-primary">
      <Input
        name="searchInput"
        type="text"
        variant="search"
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
        className="min-h-[38px] rounded-l-[8px] bg-selected-dark !text-white placeholder-light-grey !w-full"
        classNameBlockWrap="w-full sm:!min-w-[172px]"
      />
      <Button
        variant="primary"
        className="rounded-l-none lg:!px-[14px] py-[9px]"
        onClick={handleSubmit}
      >
        <Icon Svg={search} width={20} height={20} />
      </Button>
    </div>
  );
};

export default ListingSearchInput;
