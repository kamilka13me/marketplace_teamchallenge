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
  isLoading: boolean;
  setSearchParams: () => void;
}

const ProductSectionLayout: FC<Props> = (props) => {
  const { title, products, isLoading, setSearchParams } = props;

  function renderLoadingSkeletons() {
    return (
      Array(4)
        .fill(null)
        // eslint-disable-next-line react/no-array-index-key
        .map((_, i) => <ProductCardSkeleton key={i} />)
    );
  }

  return (
    <div className="w-full">
      <Text size="xl" Tag="h2" text={title} bold className="lg:text-3xl mb-4 lg:mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[7px] ">
        {isLoading
          ? renderLoadingSkeletons()
          : products?.map((prod) => <ProductCard key={prod._id} product={prod} />)}
      </div>
      <VStack justify="end" align="center" className="w-full mt-6 lg:mt-8 relative ">
        <Link
          to={getRouteProducts()}
          className="group relative flex items-center"
          onClick={setSearchParams}
        >
          <Text Tag="span" text="Дивитись більше" size="md" className="lg:text-2xl" />
          <div
            className="hidden xl:block absolute -z-[1] w-[56px] h-[56px] -top-[15px] -right-[17px]
            group-hover:top-[11px]
            group-hover:-right-[24px]
            group-hover:w-[12px]
            group-hover:h-[12px]
            ease-out
            duration-200
            bg-secondary rounded-full cursor-pointer"
          />
          <div className="hidden xl:block absolute -top-[22px] left-[165px] w-5 h-5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 duration-300" />
          <div className="hidden xl:block absolute -top-[22px] left-[200px] w-[14px] h-[14px] bg-secondary rounded-full opacity-0 group-hover:opacity-100 duration-300" />
          <div className="hidden xl:block absolute -z-[1] -top-[4px] -right-[4px] w-8 h-8 bg-secondary rounded-full opacity-0 group-hover:opacity-100 duration-300" />
          <Icon Svg={arrowRight} className="w-[20px] h-[20px]  xl:w-[20px] xl:h-[20px]" />
        </Link>
      </VStack>
    </div>
  );
};

export default ProductSectionLayout;
