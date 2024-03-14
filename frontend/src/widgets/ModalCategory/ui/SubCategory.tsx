import React from 'react';

import { NavLink } from 'react-router-dom';

import { Category } from '@/enteties/Category';
import { getRouteProducts } from '@/shared/const/routes';

interface SubCategoryProps {
  data: Category[];
  isFirstSubCategory?: boolean;
}

const SubCategory = (props: SubCategoryProps) => {
  const { data, isFirstSubCategory } = props;

  if (!data) {
    return null;
  }

  return (
    <ul
      className={`${isFirstSubCategory && 'grid grid-flow-row auto-rows-max grid-cols-4'} `}
    >
      {data.map((item) => (
        <li key={item._id}>
          <NavLink
            to={`${getRouteProducts()}?category=${item._id}`}
            className={`capitalize truncate ${isFirstSubCategory && 'font-bold '}`}
          >
            {item.name}
          </NavLink>
          <SubCategory data={item.subcategories} />
        </li>
      ))}
    </ul>
  );
};

export default SubCategory;
