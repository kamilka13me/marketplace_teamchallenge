import { FC } from 'react';

import { Product } from '../../model/types/product';
import ProductCard from '../ProductCard/ProductCard';
import ProductCardSkeleton from '../ProductCard/ProductCardSkeleton';

import arrowRight from '@/shared/assets/icons/arrow-right.svg?react';
import { getRouteProducts } from '@/shared/const/routes';
import { Icon } from '@/shared/ui/Icon';
import Link from '@/shared/ui/Link/Link';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  title: string;
  products: Product[];
  dark?: boolean;
  isLoading: boolean;
  className?: string;
  searchParams?: string;
}

const ProductSectionLayout: FC<Props> = (props) => {
  const { title, products, isLoading, dark = false, className, searchParams } = props;

  function renderLoadingSkeletons() {
    return (
      Array(4)
        .fill(null)
        // eslint-disable-next-line react/no-array-index-key
        .map((_, i) => <ProductCardSkeleton key={i} />)
    );
  }

  return (
    <div className={`${className} w-full`}>
      <Text
        size="xl"
        Tag="h2"
        text={title}
        bold
        className={`${dark && '!text-main-white'} lg:text-3xl mb-4 lg:mb-6`}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[7px] ">
        {isLoading
          ? renderLoadingSkeletons()
          : products?.map((prod) => (
              <ProductCard dark={dark} key={prod._id} product={prod} />
            ))}
      </div>
      <VStack justify="end" align="center" className="w-full mt-6 lg:mt-8 relative ">
        <Link
          to={getRouteProducts() + searchParams}
          className="group relative flex items-center"
        >
          <Text
            Tag="span"
            text="Дивитись більше"
            size="md"
            className={`${dark && '!text-main-white'} lg:text-2xl`}
          />
          <Icon
            Svg={arrowRight}
            className={`w-[20px] h-[20px] xl:w-[20px] xl:h-[20px] fill-black ml-1 mt-1 ${dark && '!fill-main-white'}`}
          />
        </Link>
      </VStack>
    </div>
  );
};

export default ProductSectionLayout;
