import { FC, useEffect, useState } from 'react';

import axios from 'axios';
import { NavLink } from 'react-router-dom';

import { Category } from '@/enteties/Category';
import arrowRight from '@/shared/assets/icons/arrow-right.svg?react';
import { getRouteProducts } from '@/shared/const/routes';
import { Icon } from '@/shared/ui/Icon';
import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  category: Category;
  closeModal?: () => void;
  isLink?: boolean;
}

const CategoryLink: FC<Props> = (props) => {
  const { category, closeModal, isLink = true } = props;
  const [Svg, setSvg] = useState<string | null>(null); // Initialize data with null
  const [svgIsLoading, setSvgIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${category.image}`);

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

  const renderCategoryLink = () => (
    <>
      <VStack gap="2" justify="center" align="center">
        {!svgIsLoading && Svg !== null ? (
          <div
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: Svg }}
            className="sidebarSvg w-6 h-6 flex justify-center items-center"
          />
        ) : (
          <Skeleton width={24} height={24} />
        )}

        <Text
          Tag="p"
          size="lg"
          text={category.name}
          className="group-hover:font-bold duration-75 text-[18px] leading-[40px] cursor-pointer"
        />
      </VStack>
      <div>
        <Icon
          aria-hidden="true"
          Svg={arrowRight}
          className="group-hover:w-[26px] group-hover:h-[26px] duration-75 fill-black"
        />
      </div>
    </>
  );

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isLink ? (
        <NavLink
          to={`${getRouteProducts()}?category=${category._id}`}
          className="flex justify-between items-center w-full group whitespace-nowrap"
          onClick={() => closeModal && closeModal()}
        >
          {renderCategoryLink()}
        </NavLink>
      ) : (
        <div className="flex justify-between items-center w-full whitespace-nowrap">
          {renderCategoryLink()}
        </div>
      )}
    </>
  );
};

export default CategoryLink;
