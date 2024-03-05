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
      <Text size="3xl" Tag="h2" text={title} bold className="mb-6" />
      <VStack gap="5">
        {isLoading
          ? renderLoadingSkeletons()
          : products?.map((prod) => <ProductCard key={prod._id} product={prod} />)}
      </VStack>
      <VStack justify="end" align="center" className="w-full mt-8 relative ">
        <Link
          to={getRouteProducts()}
          className="group relative flex items-center text-[24px] tracking-[0.16px] leading-[18px]"
          onClick={setSearchParams}
        >
          Дивитись більше
          <div className="absolute -z-[1] w-[56px] h-[56px] -top-[15px] -right-[17px] group-hover:-top-[4px] group-hover:-right-[4px] bg-secondary rounded-full cursor-pointer origin-center group-hover:w-8 group-hover:h-8 duration-300" />
          <div className="absolute -top-[22px] left-[165px] w-5 h-5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 duration-300" />
          <div className="absolute -top-[22px] left-[200px] w-[14px] h-[14px] bg-secondary rounded-full opacity-0 group-hover:opacity-100 duration-300" />
          <div className="absolute top-[23px] left-[224px] w-[12px] h-[12px] bg-secondary rounded-full opacity-0 group-hover:opacity-100 duration-300" />
          <Icon Svg={arrowRight} className="w-[24px] h-[24px]" />
        </Link>
      </VStack>
    </div>
  );
};

export default ProductSectionLayout;
