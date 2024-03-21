import React, { FC, useEffect, useRef, useState } from 'react';

import { Category } from '@/enteties/Category';
import close from '@/shared/assets/icons/cancel.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import { Button } from '@/shared/ui/Button';
import { CategoryLink } from '@/shared/ui/CategoryLink';
import { Icon } from '@/shared/ui/Icon';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalCategoryMobile: FC<Props> = (props) => {
  const { isOpen, setIsOpen } = props;

  const [currentSub, setCurrentSub] = useState<number | null>(null);
  const [currentSubSub, setCurrentSubSub] = useState<number | null>(null);
  const [width, setWidth] = useState(0);

  const modalCategoriesRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useAxios<Category[]>(ApiRoutes.CATEGORY);

  useEffect(() => {
    if (width > 1024) {
      setIsOpen();
      setCurrentSub(null);
      setCurrentSubSub(null);
    }

    const outsideClickHandler = (event: MouseEvent | TouchEvent) => {
      if (modalCategoriesRef.current?.contains(event.target as Node)) {
        return;
      }
      setIsOpen();
      setCurrentSub(null);
      setCurrentSubSub(null);
    };

    document.addEventListener('touchstart', outsideClickHandler);

    return () => {
      document.removeEventListener('touchstart', outsideClickHandler);
    };
  }, [isOpen, setIsOpen, width]);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setWidth]);

  const renderCategories = () => (
    <ul className="flex flex-col gap-2 mt-[22px] max-h-[520px] overflow-auto">
      {data?.map((item, i) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
        <li key={item._id} onClick={() => setCurrentSub(i)}>
          <CategoryLink isLink={false} category={item} />
        </li>
      ))}
    </ul>
  );

  const renderSubCategories = () => (
    <ul className="flex flex-col gap-2 mt-[22px] max-h-[520px] overflow-auto">
      {data &&
        currentSub !== null &&
        data[currentSub]?.subcategories.map((item, i) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
          <li
            key={item._id}
            onClick={() => {
              setCurrentSubSub(i);
            }}
          >
            <CategoryLink isLink={false} category={item} />
          </li>
        ))}
    </ul>
  );

  const renderSubSubCategories = () => (
    <ul className="flex flex-col gap-2 mt-[22px] max-h-[520px] overflow-auto">
      {data &&
        currentSub !== null &&
        currentSubSub !== null &&
        data[currentSub]?.subcategories[currentSubSub]?.subcategories.map((item) => (
          <li key={item._id}>
            <CategoryLink category={item} />
          </li>
        ))}
    </ul>
  );

  if (isLoading) {
    return null;
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isOpen && (
        <div
          ref={modalCategoriesRef}
          className="fixed bottom-0 bg-white left-0 right-0 top-[123px] w-full min-h-[100vh_-_160px] overflow-auto px-4 pt-[22px] z-[999]"
        >
          <VStack justify="between" align="center">
            <Text Tag="h3" text="Всі товари" size="xl" bold />
            <Button
              variant="clear"
              onClick={() => {
                setIsOpen();
                setCurrentSub(null);
                setCurrentSubSub(null);
              }}
            >
              <Icon Svg={close} />
            </Button>
          </VStack>
          <div className="h-[2px] bg-gradient-to-r from-0% from-[rgba(224,225,226,0)] via-50% via-[rgba(224,225,226,1)] to-100% to-[rgba(224,225,226,0)] my-[22px]" />
          {currentSub === null && currentSubSub === null && renderCategories()}
          {currentSub !== null && currentSubSub === null && renderSubCategories()}
          {currentSub !== null && currentSubSub !== null && renderSubSubCategories()}
        </div>
      )}
    </>
  );
};

export default ModalCategoryMobile;
