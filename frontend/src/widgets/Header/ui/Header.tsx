import { FC } from 'react';

import allProducts from '@/shared/assets/icons/allProducts.svg?react';
import en from '@/shared/assets/icons/en.svg?react';
import like from '@/shared/assets/icons/like.svg?react';
import logo from '@/shared/assets/icons/logo.svg?react';
// import cancel from '@/shared/assets/icons/cancel.svg?react';
import person from '@/shared/assets/icons/person.svg?react';
import search from '@/shared/assets/icons/search.svg?react';
import ua from '@/shared/assets/icons/ua.svg?react';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { Link } from '@/shared/ui/Link';
import { HStack, VStack } from '@/shared/ui/Stack';

interface Props {}

const Header: FC<Props> = () => {
  return (
    <div className="bg-gray-900">
      <Container>
        <VStack align="center" justify="between" className="py-4">
          <Icon Svg={logo} width={202} height={68} />

          <Button variant="fill" className="ml-[131px]">
            <VStack align="center" gap="1">
              <Icon Svg={allProducts} width={24} height={24} />
              Всі товари
            </VStack>
          </Button>

          <VStack className="ml-6 mr-5 hover:drop-shadow-custom-primary duration-300">
            <Input
              name="searchInput"
              type="text"
              variant="search"
              placeholder="Я шукаю..."
            />
            <Button variant="search">
              <Icon Svg={search} width={20} height={20} />
            </Button>
          </VStack>

          <VStack gap="1" className="mr-[75px]">
            <Link to="/" className="group duration-300 text-amber-50 w-[86px]">
              <HStack align="center" className="gap-1.5 group-hover:text-primary">
                <Icon
                  Svg={person}
                  width={28}
                  height={28}
                  className="stroke-white group-hover:stroke-primary"
                />
                Кабінет
              </HStack>
            </Link>

            <Link to="/" className="group duration-300 text-amber-50 w-[86px]">
              <HStack align="center" className="gap-1.5 group-hover:text-primary">
                <Icon
                  Svg={like}
                  width={28}
                  height={28}
                  className="stroke-white group-hover:stroke-primary"
                />
                Список
              </HStack>
            </Link>
          </VStack>

          <VStack align="center" className="gap-[7.5px]">
            <Icon
              clickable
              onClick={() => {}}
              Svg={ua}
              width={24}
              height={18}
              className="stroke-white"
            />
            <div className="h-6 border-r-[1px] border-solid border-primary" />
            <Icon
              clickable
              onClick={() => {}}
              Svg={en}
              width={22}
              height={18}
              className="stroke-white"
            />
          </VStack>
        </VStack>
      </Container>
    </div>
  );
};

export default Header;
