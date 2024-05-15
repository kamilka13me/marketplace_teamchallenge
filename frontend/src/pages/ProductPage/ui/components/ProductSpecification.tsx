import { FC } from 'react';

import { Disclosure } from '@headlessui/react';

import { Product } from '@/enteties/Product';
import arrowRight from '@/shared/assets/icons/arrow-right.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  product: Product;
}

const ProductSpecification: FC<Props> = (props) => {
  const { product } = props;

  return (
    <HStack gap="8" className=" bg-dark-grey h-full w-full lg:w-[646px] rounded-2xl p-4">
      <Text Tag="h4" text="Опис товару" size="4xl" color="white" font="ibm-plex-sans" />
      <HStack gap="4" className="w-full">
        {product?.specifications.map((spec, i) => (
          <Disclosure key={i}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100">
                  <Text Tag="span" text={spec.specification} size="xl" color="white" />
                  <Icon
                    Svg={arrowRight}
                    className={`${open ? '-rotate-90' : 'rotate-90'} w-9 h-9 !fill-main-white duration-300 lg:w-6 lg:h-6`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="text-grey text-md">
                  {spec.specificationDescription}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </HStack>
    </HStack>
  );
};

export default ProductSpecification;
