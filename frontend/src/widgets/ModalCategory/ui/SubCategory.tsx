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

  if (!data) {
    return null;
  }

  return (
    <ul className={`${isFirstSubCategory && 'grid grid-cols-4'} `}>
      {data.map((item) => (
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
  );
};

export default SubCategory;
