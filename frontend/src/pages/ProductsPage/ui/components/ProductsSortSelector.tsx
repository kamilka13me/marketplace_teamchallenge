import { FC } from 'react';

import { useSearchParams } from 'react-router-dom';

import arrowDown from '@/shared/assets/icons/arrow_down.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

interface Props {}

const ProductsSortSelector: FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy');
  const sortDirection = searchParams.get('sortDirection');

  const defaultSort = sortBy && sortDirection ? `${sortBy} ${sortDirection}` : 'nosort';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (value === 'nosort') return;
    const sortBy = value.split(' ')[0];
    const sortDirection = value.split(' ')[1];

    if (sortBy) searchParams.set('sortBy', sortBy);
    if (sortDirection) searchParams.set('sortDirection', sortDirection);
    setSearchParams(searchParams);
  };

  return (
    <span className="flex relative items-center gap-2">
      <Text
        Tag="span"
        text="Сортувати за:"
        size="lg"
        color="primary"
        className="font-semibold"
      />
      <select
        className="focus:outline-none appearance-none pl-2 pr-7 text-base font-normal"
        id="cars"
        name="cars"
        defaultValue={defaultSort}
        onChange={handleChange}
      >
        <option value="nosort" disabled hidden>
          Обрати опцію
        </option>
        <option value="rating -1">Рейтингом</option>
        <option value="TotalPrice 1">Зростаням ціни</option>
        <option value="TotalPrice -1">Зменшеням ціни</option>
      </select>
      <Icon
        aria-hidden="true"
        Svg={arrowDown}
        className="h-4 w-4 duration-75 absolute pointer-events-none right-0 top-3.5"
      />
    </span>
  );
};

export default ProductsSortSelector;
