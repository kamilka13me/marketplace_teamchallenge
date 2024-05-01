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
    <HStack gap="8" className=" bg-dark-grey max-w-[646px] w-full rounded-2xl p-4">
      <Text Tag="h4" text="Опис товару" size="4xl" color="white" font="ibm-plex-sans" />
      {product?.specifications.map((spec, i) => (
        <Disclosure key={i}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100">
                <Text Tag="span" text={spec.specification} size="xl" color="white" />
                <Icon
                  Svg={arrowRight}
                  className={`${open ? 'rotate-90' : '-rotate-90'} !fill-main-white duration-300`}
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
  );
};

export default ProductSpecification;
