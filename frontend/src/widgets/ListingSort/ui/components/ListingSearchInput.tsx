import { FC, useState } from 'react';

import { t } from 'i18next';

import search from '@/shared/assets/icons/search.svg?react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';

interface ListingSearchInputProps {
  setInputData: (e: string) => void;
}

const ListingSearchInput: FC<ListingSearchInputProps> = ({ setInputData }) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    setInputData(value);
  };

  return (
    <div className="flex flex-nowrap items-center hover:drop-shadow-custom-primary">
      <Input
        name="searchInput"
        type="text"
        variant="search"
        placeholder={t('Номер ID')}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleSubmit}
        className="min-h-[38px] rounded-l-[8px] bg-selected-dark !text-white placeholder-light-grey"
        classNameBlockWrap="w-full"
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
