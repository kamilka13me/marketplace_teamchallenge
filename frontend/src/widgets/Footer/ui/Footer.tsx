import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import facebook from '@/shared/assets/icons/facebook.svg?react';
import instagram from '@/shared/assets/icons/instagram.svg?react';
import linkedin from '@/shared/assets/icons/linkedin.svg?react';
import logo from '@/shared/assets/icons/logo.svg?react';
import { getRouteMain } from '@/shared/const/routes';
import { Container } from '@/shared/ui/Container';
import { Icon } from '@/shared/ui/Icon';
import { Link } from '@/shared/ui/Link';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {}

const Footer: FC<Props> = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 mt-0 overflow-hidden relative">
      <Container>
        <div className="z-10 w-[550px] h-[550px] origin-top-left rotate-[120deg] bg-neutral-900 rounded-[217px] absolute left-[33%]  top-[-20%]" />
        <div className="w-[550px] h-[550px] origin-top-left rotate-[120deg] bg-neutral-900 rounded-[217px] absolute right-[-40%] top-[100%]" />
        <div className="z-20 relative">
          <VStack align="start" justify="around" className="pt-12 pb-9">
            <HStack align="start" justify="between" className="w-1/2">
              <Link to={getRouteMain()}>
                <Icon Svg={logo} width={202} height={68} />
              </Link>
              <Text
                Tag="p"
                color="white"
                text={t('Дізнавайтесь першими про акції та новини')}
                className="mt-6"
              />
              <VStack align="center" justify="between" className=" gap-4 mt-4">
                <Icon Svg={facebook} width={36} height={36} />
                <Icon Svg={instagram} width={36} height={36} />
                <Icon Svg={linkedin} width={36} height={36} />
              </VStack>
            </HStack>
            <VStack align="start" justify="between" className=" gap-5 w-1/2">
              <HStack className="gap-3">
                <Text Tag="h4" color="white" text={t('Інформація')} />
                <Link to={getRouteMain()}>
                  <Text Tag="h6" color="white" text={t('Про нас')} />
                </Link>
                <Link to={getRouteMain()}>
                  <Text Tag="h6" color="white" text={t('Контакти')} />
                </Link>
                <Link to={getRouteMain()}>
                  <Text Tag="h6" color="white" text={t('Усі категорії')} />
                </Link>
                <Link to={getRouteMain()}>
                  <Text Tag="h6" color="white" text={t('FAQs')} />
                </Link>
              </HStack>
              <HStack className="gap-3">
                <Text Tag="h4" color="white" text={t('Допомога')} />
                <Link to={getRouteMain()}>
                  <Text Tag="h6" color="white" text={t('Оплата та доставка')} />
                </Link>
                <Link to={getRouteMain()}>
                  <Text Tag="h6" color="white" text={t("Зворотний зв'язок")} />
                </Link>
                <Link to={getRouteMain()}>
                  <Text Tag="h6" color="white" text={t('Гарантія')} />
                </Link>
                <Link to={getRouteMain()}>
                  <Text Tag="h6" color="white" text={t('Повернення товару')} />
                </Link>
              </HStack>
              <HStack className="gap-3">
                <Text Tag="h4" color="white" text={t('Сервіси')} />
                <Link to={getRouteMain()}>
                  <Text Tag="h6" color="white" text={t('Бонусний рахунок')} />
                </Link>
                <Link to={getRouteMain()}>
                  <Text Tag="h6" color="white" text={t('Подарункові сертифікати')} />
                </Link>
                <Link to={getRouteMain()}>
                  <Text Tag="h6" color="white" text={t('Корпоративним клієнтам')} />
                </Link>
              </HStack>
            </VStack>
          </VStack>
          <VStack
            className="border-t-2 border-white pt-6 mt-28 mb-5"
            align="center"
            justify="center"
          >
            <Text
              Tag="h6"
              color="white"
              text={t('© 2024 PEACH, All rights reserved. ')}
            />
          </VStack>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
