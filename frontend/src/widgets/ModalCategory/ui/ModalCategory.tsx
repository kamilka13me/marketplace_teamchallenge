import React, { FC, useState } from 'react';

import SubCategory from './SubCategory';

import { Category } from '@/enteties/Category';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import { CategoryLink } from '@/shared/ui/CategoryLink';

interface Props {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalCategory: FC<Props> = (props: Props) => {
  const { isOpen, setIsOpen } = props;
  const { data, error, isLoading } = useAxios<Category[]>(ApiRoutes.CATEGORY);
  const [currentCategory, setCurrentCategory] = useState(0);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Some Error</>;
  }

  return (
    isOpen && (
      <>
        <div className="absolute flex gap-5 top-[100px] pt-9 pl-2 pb-6 bg-white z-50 whitespace-nowrap max-w-[1328px] w-full rounded-b-2xl">
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
                data={data[currentCategory]?.subcategories as Category[]}
                isFirstSubCategory
              />
            )}
          </div>
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-black/20"
          onClick={setIsOpen}
        />
      </>
    )
  );
};

export default ModalCategory;
