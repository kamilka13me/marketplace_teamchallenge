import { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import facebook from '@/shared/assets/icons/facebook.svg?react';
import instagram from '@/shared/assets/icons/instagram.svg?react';
import linkedin from '@/shared/assets/icons/linkedin.svg?react';
import logo from '@/shared/assets/icons/logo.svg?react';
import { getRouteMain, getSellerRegistration } from '@/shared/const/routes';
import { Container } from '@/shared/layouts/Container';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Link } from '@/shared/ui/Link';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface FooterLinkProps {
  title: string;
  links: {
    text: string;
    link: string;
  }[];
}

const footerLinks: FooterLinkProps[] = [
  {
    title: 'Інформація',
    links: [
      {
        text: 'Про нас',
        link: '/',
      },
      {
        text: 'Контакти',
        link: '/',
      },
      {
        text: 'Усі категорії FAQs',
        link: '/',
      },
      {
        text: 'FAQs',
        link: '/',
      },
    ],
  },
  {
    title: 'Допомога',
    links: [
      {
        text: 'Оплата та доставка',
        link: '/',
      },
      {
        text: "Зворотний зв'язок",
        link: '/',
      },
      {
        text: 'Гарантія',
        link: '/',
      },
      {
        text: 'Повернення товару',
        link: '/',
      },
    ],
  },
  {
    title: 'Сервіси',
    links: [
      {
        text: 'Бонусний рахунок',
        link: '/',
      },
      {
        text: 'Подарункові сертифікати',
        link: '/',
      },
      {
        text: 'Корпоративним клієнтам',
        link: '/',
      },
    ],
  },
];

interface Props {}

const Footer: FC<Props> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <footer className="bg-main-dark overflow-hidden relative">
      <Container>
        <div className="z-10 w-[550px] h-[550px] origin-top-left rotate-[120deg] bg-neutral-900 rounded-[217px] absolute left-[33%] top-[-20%] " />
        <div className="w-[550px] h-[550px] origin-top-left rotate-[120deg] bg-neutral-900 rounded-[217px] absolute right-[-40%] top-[100%] " />
        <div className="z-20 relative">
          <VStack className="flex-col lg:flex-row items-start justify-center lg:justify-around pt-4 lg:pt-12">
            <HStack align="start" justify="between" className="w-1/2">
              <Link to={getRouteMain()}>
                <Icon className="w-[110px] lg:w-[220px]" Svg={logo} height={68} />
              </Link>
              <Text
                size="md"
                Tag="p"
                color="white"
                text={t('Дізнавайтесь першими про акції та новини')}
                className="mt-4 lg:mt-6 w-[339px]"
              />
              <VStack align="center" justify="between" className=" gap-4 mt-4">
                <Icon Svg={facebook} width={36} height={36} />
                <Icon Svg={instagram} width={36} height={36} />
                <Icon Svg={linkedin} width={36} height={36} />
              </VStack>
              <Button
                variant="primary"
                className="w-[313px] h-[52px] mt-[26px] mb-10 lg:mb-[77px] text-[16px]"
                onClick={() => {
                  navigate(getSellerRegistration());
                }}
              >
                Стати продавцем
              </Button>
            </HStack>
            <VStack
              align="start"
              wrap="wrap"
              className="gap-[33px] lg:gap-5 w-full lg:w-1/2 justify-normal lg:justify-between grid grid-cols-2 sm:grid-cols-3 mb-12 lg:mb-[115px]"
            >
              {footerLinks.map((titleLink, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <HStack className="w-full lg:max-w-[202px]" key={i} gap="6">
                  <Text size="xl" Tag="h4" color="white" text={t(titleLink.title)} />
                  {titleLink.links.map((link, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Link key={i} to={link.link}>
                      <Text size="md" Tag="h6" color="white" text={t(link.text)} />
                    </Link>
                  ))}
                </HStack>
              ))}
            </VStack>
          </VStack>
          <VStack
            className="border-t-2 border-main-white pt-6 mb-5"
            align="center"
            justify="center"
          >
            <Text
              size="sm"
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
