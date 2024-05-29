import { FC, Fragment, useEffect, useState } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { useSearchParams } from 'react-router-dom';

import arrowDown from '@/shared/assets/icons/arrow_down.svg?react';
import mageFilter from '@/shared/assets/icons/mage_filter.svg?react';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

const sorter = [
  { name: 'За рейтингом', value: 'rating -1' },
  { name: 'Ціна, від найвищої', value: 'TotalPrice -1' },
  { name: 'Ціна, від найнижчої', value: 'TotalPrice 1' },
];

interface Props {
  openFilterModal: () => void;
}

const ProductsSortSelector: FC<Props> = (props) => {
  const { openFilterModal } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy');
  const sortDirection = searchParams.get('sortDirection');
  const selectSortFromUrl =
    sortBy && sortDirection
      ? sorter.find((sort) => sort.value === `${sortBy} ${sortDirection}`)
      : undefined;

  const [selected, setSelected] = useState(
    selectSortFromUrl || { name: 'Обрати опцію', value: 'nosort' },
  );

  useEffect(() => {
    if (selected?.value === 'nosort') return;
    const sortBy = selected?.value.split(' ')[0];
    const sortDirection = selected?.value.split(' ')[1];

    if (sortBy) searchParams.set('sortBy', sortBy);
    if (sortDirection) searchParams.set('sortDirection', sortDirection);
    setSearchParams(searchParams);
  }, [searchParams, selected, setSearchParams]);

  return (
    <span className="flex relative items-center justify-between gap-2">
      <Button
        variant="clear"
        onClick={openFilterModal}
        className="flex justify-center items-center gap-2 lg:hidden w-[100px] h-8"
      >
        <Text Tag="span" text="Фільтр" size="sm" color="dark" />
        <Icon Svg={mageFilter} className="!stroke-selected-dark" />
      </Button>

      <Text
        Tag="span"
        text="Сортувати за:"
        size="lg"
        color="primary"
        className="font-semibold hidden lg:block"
      />

      <div className="w-[188px] lg:w-[175px]">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-painter rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
              <span className="block truncate text-sm lg:text-md font-normal">
                {selected?.name}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <Icon
                  aria-hidden="true"
                  Svg={arrowDown}
                  className="h-4 w-4 duration-75 absolute pointer-events-none right-0 top-[9px] lg:top-[13px]"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none lg:text-md">
                {sorter.map((sort, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active, selected }) =>
                      `relative cursor-pointer select-none py-2 pl-4 pr-4 ${
                        active || selected ? 'text-main' : 'text-gray-900'
                      }`
                    }
                    value={sort}
                  >
                    {({ selected }) => (
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {sort.name}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </span>
  );
};

export default ProductsSortSelector;
