import { ChangeEvent, FC, useEffect, useState } from 'react';

import { t } from 'i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import search from '@/shared/assets/icons/search.svg?react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';

interface Props {}

const HeaderSearchInput: FC<Props> = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [inputData, setInputData] = useState<string>('');

  useEffect(() => {
    setInputData(searchParams.get('name') || '');
  }, [searchParams]);

  const onSubmitSearch = () => {
    navigate(`/products?name=${inputData}`);
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputData(e.target.value);
  };

  return (
    <div className="flex flex-nowrap items-center w-full lg:w-auto hover:drop-shadow-custom-primary duration-300">
      <Input
        name="searchInput"
        type="text"
        variant="search"
        value={inputData}
        placeholder={t('Я шукаю')}
        onChange={onChangeInput}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmitSearch();
          }
        }}
        className="min-h-[38px] w-full lg:min-w-[395px] xl:min-w-[443px]"
        classNameBlockWrap="w-full"
      />
      <Button
        variant="primary"
        className="rounded-l-none !px-[14px] py-[9px]"
        type="submit"
        onClick={onSubmitSearch}
      >
        <Icon Svg={search} width={20} height={20} />
      </Button>
    </div>
  );
};

export default HeaderSearchInput;
