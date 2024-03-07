import React, { FC, RefObject, useEffect, useRef, useState } from 'react';

import { Transition } from '@headlessui/react';

import SubCategory from './SubCategory';

import { Category } from '@/enteties/Category';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import { CategoryLink } from '@/shared/ui/CategoryLink';

interface Props {
  modalButtonRef: RefObject<HTMLButtonElement> | null;
  isOpen: boolean;
  setClose: () => void;
}

const ModalCategory: FC<Props> = (props) => {
  const { isOpen, setClose, modalButtonRef } = props;

  const modalCategoriesRef = useRef<HTMLDivElement>(null);

  const { data, error, isLoading } = useAxios<Category[]>(ApiRoutes.CATEGORY);
  const [currentCategory, setCurrentCategory] = useState<number | null>(null);

  useEffect(() => {
    const outsideClickHandler = (event: MouseEvent) => {
      if (
        modalCategoriesRef.current?.contains(event.target as Node) ||
        modalButtonRef?.current?.contains(event.target as Node)
      ) {
        return;
      }
      setClose();
    };

    document.addEventListener('mousedown', outsideClickHandler);

    return () => document.removeEventListener('mousedown', outsideClickHandler);
  }, [setClose, modalCategoriesRef, modalButtonRef]);

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
        className="absolute top-[100px] max-w-[1328px] w-full z-[99]"
      >
        <Transition
          show={isOpen}
          enter="transition-all duration-300 ease-out"
          enterFrom="-translate-y-full opacity-0"
          enterTo="translate-y-0 opcity-100"
          leave="transition-all duration-100 ease-in-out"
          leaveFrom="translate-y-0 opcity-100"
          leaveTo="-translate-y-20 opacity-0"
        >
          <div className="flex gap-5 pt-9 pl-2 pb-6 bg-white  whitespace-nowrap rounded-b-2xl">
            <ul className="w-[313px] flex flex-col gap-2 px-[13px]">
              {data?.map((item, i) => (
                <li
                  key={item._id}
                  onMouseEnter={() => setCurrentCategory(i)}
                  className="max-w-[313px] relative"
                >
                  <ul>
                    <CategoryLink category={item} />
                  </ul>
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
          className="fixed left-0 right-0 bottom-0 top-0 z-[98] bg-black/20 "
          onClick={setClose}
        />
      )}
    </>
  );
};

export default ModalCategory;
