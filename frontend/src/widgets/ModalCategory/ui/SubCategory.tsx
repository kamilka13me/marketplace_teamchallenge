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
    <div>
      {data.map((item) => (
        <div key={item._id}>
          <NavLink
            to={`${getRouteProducts()}?category=${item._id}`}
            className={`capitalize ${isFirstSubCategory && 'font-bold'}`}
          >
            {item.name}
          </NavLink>
          <SubCategory data={item.subcategories} />
        </div>
      ))}
    </div>
  );
};

export default SubCategory;
