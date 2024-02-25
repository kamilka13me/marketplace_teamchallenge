import { FC, useEffect, useState } from 'react';

import axios from 'axios';
import { NavLink } from 'react-router-dom';

import { Category } from '@/enteties/Category';
import arrowRight from '@/shared/assets/icons/arrow-right.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { VStack } from '@/shared/ui/Stack';

interface Props {
  category: Category;
}

const SidebarCategoryLink: FC<Props> = (props) => {
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
    <li className="flex justify-between items-center w-full group">
      <VStack gap="2" justify="center" align="center">
        {!svgIsLoading && Svg !== null && (
          // eslint-disable-next-line react/no-danger
          <div className="sidebarSvg" dangerouslySetInnerHTML={{ __html: Svg }} />
        )}
        <NavLink
          to="/"
          className="group-hover:font-bold duration-75 text-[18px] leading-[40px]"
        >
          {category.name}
        </NavLink>
      </VStack>
      <div>
        <Icon
          Svg={arrowRight}
          className="group-hover:w-[26px] group-hover:h-[26px] duration-75"
        />
      </div>
    </li>
  );
};

export default SidebarCategoryLink;
