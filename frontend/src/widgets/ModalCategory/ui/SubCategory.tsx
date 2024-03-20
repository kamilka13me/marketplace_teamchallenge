import React from 'react';

import { NavLink } from 'react-router-dom';

import { Category } from '@/enteties/Category';
import { getRouteProducts } from '@/shared/const/routes';

interface SubCategoryProps {
  data: Category[];
  closeModal: () => void;
  isFirstSubCategory?: boolean;
}

const SubCategory = (props: SubCategoryProps) => {
  const { data, isFirstSubCategory, closeModal } = props;

  const chunkArray = (arr: Category[], size: number) => {
    const chunks = [];

    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }

    return chunks;
  };

  const chunks = chunkArray(data, Math.ceil(data.length / 4));

  if (!data) {
    return null;
  }

  return (
    <div className={`${isFirstSubCategory && 'grid grid-cols-4'} `}>
      {chunks.map((chunk, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ul key={index}>
          {chunk.map((item) => (
            <li key={item._id}>
              <NavLink
                to={`${getRouteProducts()}?category=${item._id}`}
                className={`capitalize truncate ${isFirstSubCategory && 'font-bold '}`}
                onClick={() => closeModal()}
              >
                {item.name}
              </NavLink>
              <SubCategory closeModal={closeModal} data={item.subcategories} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default SubCategory;
