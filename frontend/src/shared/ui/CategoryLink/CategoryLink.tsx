import { FC, useEffect, useState } from 'react';

import axios from 'axios';
import { NavLink } from 'react-router-dom';

import { Category } from '@/enteties/Category';
import arrowRight from '@/shared/assets/icons/arrow-right.svg?react';
import { getRouteProducts } from '@/shared/const/routes';
import { Icon } from '@/shared/ui/Icon';
import { VStack } from '@/shared/ui/Stack';

interface Props {
  category: Category;
}

const CategoryLink: FC<Props> = (props) => {
  const { category } = props;
  const [Svg, setSvg] = useState<string | null>(null); // Initialize data with null
  const [svgIsLoading, setSvgIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.BASE_URL}${category.image}`);

        setSvg(response.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      } finally {
        setSvgIsLoading(false);
      }
    };

    fetchData();
  }, [category.image]);

  return (
    <div className="flex justify-between items-center w-full group">
      <VStack gap="2" justify="center" align="center">
        {!svgIsLoading && Svg !== null && (
          <div
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: Svg }}
            className="sidebarSvg w-6 h-6 flex justify-center items-center"
          />
        )}
        <NavLink
          to={`${getRouteProducts()}?category=${category._id}`}
          className="group-hover:font-bold duration-75 text-[18px] leading-[40px]"
        >
          {category.name}
        </NavLink>
      </VStack>
      <div>
        <Icon
          aria-hidden="true"
          Svg={arrowRight}
          className="group-hover:w-[26px] group-hover:h-[26px] duration-75"
        />
      </div>
    </div>
  );
};

export default CategoryLink;
