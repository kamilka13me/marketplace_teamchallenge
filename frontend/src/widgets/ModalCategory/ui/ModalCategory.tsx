import React, { FC, useEffect, useRef, useState } from 'react';

import { Transition } from '@headlessui/react';

import SubCategory from './SubCategory';

import { Category } from '@/enteties/Category';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import { CategoryLink } from '@/shared/ui/CategoryLink';

interface Props {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalCategory: FC<Props> = (props) => {
  const { isOpen, setIsOpen } = props;

  const modalCategoriesRef = useRef<HTMLDivElement>(null);

  const { data, error, isLoading } = useAxios<Category[]>(ApiRoutes.CATEGORY);
  const [currentCategory, setCurrentCategory] = useState<number | null>(null);

  useEffect(() => {
    const clickOutside = (event: MouseEvent | TouchEvent) => {
      if (modalCategoriesRef.current?.contains(event.target as Node)) {
        return;
      }
      setIsOpen();
    };

    document.addEventListener('mousedown', clickOutside);
    document.addEventListener('touchstart', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
      document.removeEventListener('touchstart', clickOutside);
    };
  }, [modalCategoriesRef, setIsOpen]);
  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Some Error</>;
  }

  return (
    <>
      <div
        ref={modalCategoriesRef}
        className="absolute top-[100px] max-w-[1328px] w-full z-50"
      >
        <Transition
          show={isOpen}
          enter="transition-all duration-100 ease-out"
          enterFrom="-translate-y-10 opcity-0"
          enterTo="translate-y-0 opcity-100"
          leave="transition-all duration-100 ease-in-out"
          leaveFrom="translate-y-0 opcity-100"
          leaveTo="-translate-y-full opacity-0"
        >
          <div className="flex gap-5 pt-9 pl-2 pb-6 bg-white  whitespace-nowrap rounded-b-2xl">
            <ul className="w-[313px] flex flex-col gap-2 px-[13px]">
              {data?.map((item, i) => (
                <li
                  key={item._id}
                  onMouseEnter={() => setCurrentCategory(i)}
                  className="max-w-[313px] relative"
                >
                  <CategoryLink category={item} />
                </li>
              ))}
            </ul>
            <div>
              {data && (
                <SubCategory
                  data={data[currentCategory!]?.subcategories as Category[]}
                  isFirstSubCategory
                />
              )}
            </div>
          </div>
        </Transition>
      </div>
      {isOpen && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div
          className="fixed left-0 right-0 bottom-0 z-10 bg-black/20 top-[100px]"
          onClick={setIsOpen}
        />
      )}
    </>
  );
};

export default ModalCategory;
