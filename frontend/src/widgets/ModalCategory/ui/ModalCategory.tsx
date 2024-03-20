import React, { FC, RefObject, useEffect, useRef, useState } from 'react';

import { Transition } from '@headlessui/react';

import SubCategory from './SubCategory';

import { Category } from '@/enteties/Category';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import { CategoryLink } from '@/shared/ui/CategoryLink';
import { VStack } from '@/shared/ui/Stack';

interface Props {
  modalButtonRef: RefObject<HTMLButtonElement> | null;
  isOpen: boolean;
  setClose: () => void;
}

const ModalCategory: FC<Props> = (props) => {
  const { isOpen, setClose, modalButtonRef } = props;

  const modalCategoriesRef = useRef<HTMLDivElement>(null);
  const listItemRef = useRef<HTMLUListElement>(null);

  const { data, error, isLoading } = useAxios<Category[]>(ApiRoutes.CATEGORY);
  const [currentCategory, setCurrentCategory] = useState<number>(0);

  useEffect(() => {
    const outsideClickHandler = (event: MouseEvent | TouchEvent) => {
      if (
        modalCategoriesRef.current?.contains(event.target as Node) ||
        modalButtonRef?.current?.contains(event.target as Node)
      ) {
        return;
      }
      setClose();
    };

    const escapeKeyHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setClose();
      }
    };

    document.addEventListener('mousedown', outsideClickHandler);
    document.addEventListener('touchstart', outsideClickHandler);
    document.addEventListener('keydown', escapeKeyHandler);

    return () => {
      document.removeEventListener('touchstart', outsideClickHandler);
      document.removeEventListener('mousedown', outsideClickHandler);
      document.removeEventListener('keydown', escapeKeyHandler);
    };
  }, [setClose, modalCategoriesRef, modalButtonRef, isOpen]);

  if (isLoading) {
    return null;
  }

  if (error) {
    return <>Some Error</>;
  }

  return (
    <>
      <div
        id="all-category-modal"
        aria-labelledby="all-category-button"
        ref={modalCategoriesRef}
        className={`absolute top-[100px] max-w-[1328px] h-[580px] overflow-hidden w-full z-[99] ${!isOpen && 'hidden'}`}
      >
        <Transition
          show={isOpen}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <VStack
            gap="5"
            className="pt-9 pl-2 pb-6 bg-white-200 whitespace-nowrap rounded-b-2xl"
          >
            <ul
              ref={listItemRef}
              className="w-[323px] h-[520px] overflow-auto flex flex-col gap-2 px-[13px]"
            >
              {data?.map((item, i) => (
                <li
                  key={item._id}
                  onMouseEnter={() => setCurrentCategory(i)}
                  className={`max-w-[313px] relative ${currentCategory === i && 'font-bold'}`}
                >
                  <CategoryLink category={item} closeModal={setClose} />
                </li>
              ))}
            </ul>
            <div className="overflow-auto h-[500px] w-full">
              {data && (
                <SubCategory
                  closeModal={setClose}
                  data={data[currentCategory!]?.subcategories as Category[]}
                  isFirstSubCategory
                />
              )}
            </div>
          </VStack>
        </Transition>
      </div>
      {isOpen && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div
          className="fixed left-0 right-0 bottom-0 top-[100px] z-[98] bg-black-transparent-50"
          onClick={setClose}
        />
      )}
    </>
  );
};

export default ModalCategory;
