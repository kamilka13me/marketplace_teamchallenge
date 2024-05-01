import { FC } from 'react';

import { countDiscount, Product } from '@/enteties/Product';
import { quantityCalc } from '@/enteties/Product/ui/ProductCard/ProductCard';
import { Rating } from '@/enteties/Rating';
import { Button } from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  product: Product;
  size?: 'medium' | 'big';
}

const ProductDescription: FC<Props> = (props) => {
  const { product, size = 'big' } = props;

  return (
    <HStack className="bg-dark-grey px-4 py-8 rounded-2xl max-w-[646px] h-[514px] w-full">
      <div className="h-[80px] w-full overflow-hidden">
        <Text
          Tag="h3"
          text={product?.name || ''}
          size="4xl"
          font="ibm-plex-sans"
          className={`text-ellipsis ${size === 'medium' ? '!text-xl !leading-[26px]' : ''}`}
          color="white"
        />
      </div>

      <div className="mt-2">
        <Rating rating={4} />
      </div>

      {product?.condition && (
        <div className="bg-green px-2 rounded-lg mt-3 leading-[0px] py-[2px]">
          <Text Tag="span" text={product?.condition || ''} size="xs" color="white" />
        </div>
      )}

      <VStack gap="1" className="mt-[14px]">
        <Text Tag="p" text="Бренд:" size="lg" color="white" />
        <Text Tag="span" text={product?.brand || 'Відсутній'} size="lg" color="white" />
      </VStack>

      <div>
        <Text
          Tag="p"
          text={
            'Екран ноутбука 13.3" Retina (2560x1600) WQXGA глянсовий / Apple M1 / RAM 8 ГБ SSD 256 ГБ / Apple M1 Graphics / камера HD / Wi-Fi / Bluetooth / USB-C / без дисковода / macOS Big Sur / 1.29 кг / сірий'
          }
          size="md"
          color="gray-light"
        />
      </div>

      <div className="mt-6">
        <VStack gap="1" align="center" className="">
          <Text
            size="4xl"
            font="ibm-plex-sans"
            Tag="p"
            text={countDiscount(product?.price, product?.discount || 0).toString()}
            color="white"
            className=""
          />
          <Text
            size="2xl"
            font="ibm-plex-sans"
            Tag="span"
            text="грн"
            color="white"
            className="mt-1"
          />
        </VStack>
        {product?.discount && (
          <VStack gap="1" align="center" className="-mt-1">
            <Text
              size="sm"
              font="ibm-plex-sans"
              Tag="p"
              text={product?.price.toFixed(0).toString() || ''}
              className="line-through font-semibold lg:text-lg"
              color="gray"
            />
            <Text font="ibm-plex-sans" size="sm" Tag="span" text="грн" color="gray" />
          </VStack>
        )}
        <Text
          Tag="p"
          size="sm"
          text={quantityCalc(product?.quantity || 0).text}
          color={quantityCalc(product?.quantity || 0).color}
          className=""
        />
      </div>
      <Button
        variant="primary"
        className={` h-[52px] mt-6 ${size === 'medium' ? 'w-full' : 'w-[319px]'}`}
      >
        Додати в обране
      </Button>
    </HStack>
  );
};

export default ProductDescription;
