import { FC } from 'react';

import { Link } from 'react-router-dom';

import facebook from '@/shared/assets/icons/facebook.svg?react';
import instagram from '@/shared/assets/icons/instagram.svg?react';
import linkedin from '@/shared/assets/icons/linkedin.svg?react';
import logo from '@/shared/assets/icons/logo.svg?react';
import bigPeach from '@/shared/assets/img/bigPeach.svg?react';
import { getRouteMain } from '@/shared/const/routes';
import { Container } from '@/shared/layouts/Container';
import { Icon } from '@/shared/ui/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

const SafariPage: FC = () => {
  return (
    <div className="flex flex-col mx-auto min-h-screen overflow-auto bg-main-dark">
      <header className="fixed top-0 left-0 right-0 py-[16px]">
        <Container>
          <Link to={getRouteMain()}>
            <Icon Svg={logo} className="w-[150px] h-[50px] lg:w-[202px] lg:h-[68px]" />
          </Link>
        </Container>
      </header>

      <main className="flex-1">
        <Container className="flex justify-center h-[350px] lg:h-[700px]">
          <Icon
            Svg={bigPeach}
            className="absolute top-[100px] lg:top-[0px] w-[350px] h-[350px] lg:w-[800px] lg:h-[800px]"
          />
          <span className="text-white text-[20px] lg:text-[40px] font-outfit pt-[260px]">
            Safari is not supported.
          </span>
        </Container>
      </main>

      <footer className="overflow-hidden relative pt-[40px]">
        <Container className="relative">
          <div className="w-[550px] h-[550px] origin-top-left rotate-[120deg] bg-neutral-900 rounded-[217px] absolute left-[78%] md:left-[38%] top-[-35%]" />
          <div className="w-[550px] h-[550px] origin-top-left rotate-[120deg] bg-neutral-900 rounded-[217px] hidden lg:block absolute left-[125%] top-[110%]" />
          <div className="flex flex-col gap-[20px] lg:gap-[165px] relative z-10">
            <HStack align="start" justify="between" className="w-1/2">
              <Link to={getRouteMain()}>
                <Icon
                  Svg={logo}
                  className="w-[150px] h-[50px] lg:w-[202px] lg:h-[68px]"
                />
              </Link>

              <Text
                size="md"
                Tag="p"
                color="white"
                text="Дізнавайтесь першими про акції та новини"
                className="mt-4 lg:mt-6 w-[339px]"
              />

              <VStack align="center" justify="between" className=" gap-4 mt-4">
                <Icon Svg={facebook} width={36} height={36} className="cursor-pointer" />
                <Icon Svg={instagram} width={36} height={36} className="cursor-pointer" />
                <Icon Svg={linkedin} width={36} height={36} className="cursor-pointer" />
              </VStack>
            </HStack>

            <VStack
              className="border-t-2 border-main-white pt-6 mb-5"
              align="center"
              justify="center"
            >
              <Text
                size="sm"
                Tag="h6"
                color="white"
                text="© 2024 PEACH, All rights reserved. "
              />
            </VStack>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default SafariPage;
