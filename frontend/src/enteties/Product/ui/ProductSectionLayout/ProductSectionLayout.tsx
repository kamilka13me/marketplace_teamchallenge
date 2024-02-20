import { FC } from 'react';

import { Product } from '@/enteties/Product';
import ProductCard from '@/enteties/Product/ui/ProductCard/ProductCard';
import arrowRight from '@/shared/assets/icons/arrow-right.svg?react';
import { Container } from '@/shared/ui/Container';
import { Icon } from '@/shared/ui/Icon';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  title: string;
  products: Product[];
}

const ProductSectionLayout: FC<Props> = (props) => {
  const { title, products } = props;

  return (
    <Container>
      <Text Tag="h2" text={title} bold className="!text-[24px] !leading-[24px] mb-6" />
      <VStack gap="5">
        {products.map((prod) => (
          <ProductCard key={prod._id} product={prod} />
        ))}
      </VStack>
      <VStack justify="end" align="center" className="w-full mt-8 relative right-4">
        <a
          href="/"
          className="group relative text-[24px] tracking-[0.16px] leading-[18px]"
        >
          Дивитись більше
          <div className="absolute -z-[1] w-[56px] h-[56px] -top-[15px] -right-[40px] group-hover:-top-[4px] group-hover:-right-[28px] bg-secondary rounded-full cursor-pointer origin-center group-hover:w-8 group-hover:h-8 duration-300" />
          <div className="absolute -top-[22px] left-[165px] w-5 h-5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 duration-300" />
          <div className="absolute -top-[22px] left-[200px] w-[14px] h-[14px] bg-secondary rounded-full opacity-0 group-hover:opacity-100 duration-300" />
          <div className="absolute top-[23px] left-[224px] w-[12px] h-[12px] bg-secondary rounded-full opacity-0 group-hover:opacity-100 duration-300" />
        </a>
        <Icon Svg={arrowRight} className="relative left-[1px] top-[2px]" />
      </VStack>
    </Container>
  );
};

export default ProductSectionLayout;
