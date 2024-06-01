/* eslint-disable no-console */
import { FC, Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';

import CategorySelect from './CategorySelect';

import { Category } from '@/enteties/Category';
import arrowClear from '@/shared/assets/icons/arrow_clear.svg?react';
import { Icon } from '@/shared/ui/Icon';

interface Props {
  categoryArr: Category[] | null;
  selected: Category | null;
  setSelected: (category: Category | null) => void;
  addButton: { text: string; open: () => void };
  categoryLimit: number;
  disabled?: boolean;
}

const CategorySelector: FC<Props> = (props) => {
  const { categoryArr, selected, setSelected, addButton, categoryLimit, disabled } =
    props;

  return (
    <span className="flex relative items-center gap-2 w-full">
      <div className="w-full lg:w-[240px] h-[44px]">
        <Listbox value={selected} onChange={setSelected} disabled={disabled}>
          {({ open }) => (
            <div className="relative">
              <Listbox.Button
                className={`relative w-full cursor-painter ${open && !disabled ? 'rounded-t-lg' : 'rounded-lg'} bg-selected-dark py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}
              >
                <span className="block truncate text-base font-normal">
                  {selected ? selected?.name : 'Обрати'}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <Icon
                    aria-hidden="true"
                    Svg={arrowClear}
                    className="h-4 w-4 duration-75 absolute pointer-events-none right-[20px] top-[13px] stroke-white"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className={`${disabled && 'hidden'} absolute z-10 max-h-[450px] w-full overflow-auto rounded-b-md bg-selected-dark py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm`}
                >
                  {categoryArr &&
                    categoryArr.map((category, categoryIdx) => (
                      <Listbox.Option
                        key={categoryIdx}
                        className="relative cursor-pointer select-none py-2 pl-4 pr-4 text-white"
                        value={category}
                      >
                        {({ selected }) => (
                          <CategorySelect category={category} selected={selected} />
                        )}
                      </Listbox.Option>
                    ))}

                  {categoryArr && categoryArr?.length < categoryLimit && (
                    <button
                      type="button"
                      onClick={() => {
                        addButton.open();
                        setSelected(null);
                      }}
                      className="w-full py-2 flex justify-items-start pl-[16px]"
                    >
                      <span className="text-main text-[14px] font-outfit font-semibold">
                        {addButton.text}
                      </span>
                    </button>
                  )}
                </Listbox.Options>
              </Transition>
            </div>
          )}
        </Listbox>
      </div>
    </span>
  );
};

export default CategorySelector;
