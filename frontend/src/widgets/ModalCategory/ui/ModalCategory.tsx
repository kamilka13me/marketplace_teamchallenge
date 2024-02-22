import { FC } from 'react';

import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Sidebar } from '@/widgets/Sidebar';

interface Props {
  showModalCategory: boolean;
}

const ModalCategory: FC<Props> = (props: Props) => {
  const { showModalCategory } = props;

  return (
    <div
      className={
        showModalCategory
          ? 'hidden'
          : 'absolute z-[900] top-[100px] left-0 right-0 max-w-[1328px] pl-2 pt-9 pb-6 mx-auto rounded-b-2xl bg-white-200'
      }
    >
      <VStack>
        <Sidebar />

        <HStack gap="2" className="ml-5 mr-[73px]">
          <Text
            Tag="p"
            text="Популярні товари"
            className="font-semibold size text-[18px]"
          />
          {Array(10)
            .fill(null)
            .map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <VStack key={i} justify="between" align="center" className="w-full">
                <VStack gap="2" align="center">
                  <a
                    className=" text-[18px] leading-[40px]"
                    href="/marketplace_teamchallenge/frontend/public"
                  >
                    Lorem ipsum dolor
                  </a>
                </VStack>
              </VStack>
            ))}
        </HStack>

        <HStack gap="2" className="mr-[73px]">
          <Text
            Tag="p"
            text="Популярні товари"
            className="font-semibold size text-[18px]"
          />
          {Array(10)
            .fill(null)
            .map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <VStack key={i} justify="between" align="center" className="w-full">
                <VStack gap="2" align="center">
                  <a
                    className=" text-[18px] leading-[40px]"
                    href="/marketplace_teamchallenge/frontend/public"
                  >
                    Lorem ipsum dolor
                  </a>
                </VStack>
              </VStack>
            ))}
        </HStack>

        <HStack gap="2" className="mr-[73px]">
          <Text
            Tag="p"
            text="Популярні товари"
            className="font-semibold size text-[18px]"
          />
          {Array(10)
            .fill(null)
            .map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <VStack key={i} justify="between" align="center" className="w-full">
                <VStack gap="2" align="center">
                  <a
                    className=" text-[18px] leading-[40px]"
                    href="/marketplace_teamchallenge/frontend/public"
                  >
                    Lorem ipsum dolor
                  </a>
                </VStack>
              </VStack>
            ))}
        </HStack>

        <HStack gap="2" className="">
          <Text
            Tag="p"
            text="Популярні товари"
            className="font-semibold size text-[18px]"
          />
          {Array(10)
            .fill(null)
            .map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <VStack key={i} justify="between" align="center" className="w-full">
                <VStack gap="2" align="center">
                  <a
                    className=" text-[18px] leading-[40px]"
                    href="/marketplace_teamchallenge/frontend/public"
                  >
                    Lorem ipsum dolor
                  </a>
                </VStack>
              </VStack>
            ))}
        </HStack>
      </VStack>
    </div>
  );
};

export default ModalCategory;
