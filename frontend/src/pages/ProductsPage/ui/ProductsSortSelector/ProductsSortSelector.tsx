import { FC } from 'react';

import { useSearchParams } from 'react-router-dom';

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
    <span className="flex items-center gap-1">
      <span className="font-semibold text-lg">Сортувати за:</span>
      <select
        className="focus:outline-none"
        id="cars"
        name="cars"
        defaultValue={defaultSort}
        onChange={handleChange}
      >
        <option value="nosort" disabled hidden>
          Обрати опцію
        </option>
        <option value="price 1">Зростаням ціни</option>
        <option value="price -1">Зменшеням ціни</option>
      </select>
    </span>
  );
};

export default ProductsSortSelector;
