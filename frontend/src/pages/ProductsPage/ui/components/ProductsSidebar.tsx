import { FC } from 'react';

import { Disclosure } from '@headlessui/react';

import arrowDown from '@/shared/assets/icons/arrow_down.svg?react';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

interface Props {}

const ProductsSidebar: FC<Props> = () => {
  return (
    <div className="w-full px-4 py-2 shadow-custom-base rounded-2xl">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex relative w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <Text
                  Tag="span"
                  text="Категорія"
                  size="md"
                  color="primary"
                  className="font-semibold"
                />
                <Icon
                  aria-hidden="true"
                  Svg={arrowDown}
                  className={`h-4 w-4 duration-75 absolute pointer-events-none right-0 top-3.5 ${open ? 'rotate-180 transform' : ''}`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                If youre unhappy with your purchase for any reason, email us within 90
                days and well refund you in full, no questions asked.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex relative w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <Text
                  Tag="span"
                  text="Підкатегорія"
                  size="md"
                  color="primary"
                  className="font-semibold"
                />
                <Icon
                  aria-hidden="true"
                  Svg={arrowDown}
                  className={`h-4 w-4 duration-75 absolute pointer-events-none right-0 top-3.5 ${open ? 'rotate-180 transform' : ''}`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                No.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex relative w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <Text
                  Tag="span"
                  text="Розділ"
                  size="md"
                  color="primary"
                  className="font-semibold"
                />
                <Icon
                  aria-hidden="true"
                  Svg={arrowDown}
                  className={`h-4 w-4 duration-75 absolute pointer-events-none right-0 top-3.5 ${open ? 'rotate-180 transform' : ''}`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                No.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex relative w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <Text
                  Tag="span"
                  text="Продавець"
                  size="md"
                  color="primary"
                  className="font-semibold"
                />
                <Icon
                  aria-hidden="true"
                  Svg={arrowDown}
                  className={`h-4 w-4 duration-75 absolute pointer-events-none right-0 top-3.5 ${open ? 'rotate-180 transform' : ''}`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                No.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex relative w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <Text
                  Tag="span"
                  text="Ціна"
                  size="md"
                  color="primary"
                  className="font-semibold"
                />
                <Icon
                  aria-hidden="true"
                  Svg={arrowDown}
                  className={`h-4 w-4 duration-75 absolute pointer-events-none right-0 top-3.5 ${open ? 'rotate-180 transform' : ''}`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                No.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex relative w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <Text
                  Tag="span"
                  text="Рейтинг"
                  size="md"
                  color="primary"
                  className="font-semibold"
                />
                <Icon
                  aria-hidden="true"
                  Svg={arrowDown}
                  className={`h-4 w-4 duration-75 absolute pointer-events-none right-0 top-3.5 ${open ? 'rotate-180 transform' : ''}`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                No.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default ProductsSidebar;
