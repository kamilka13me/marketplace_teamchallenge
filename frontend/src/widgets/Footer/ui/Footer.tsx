import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import facebook from '@/shared/assets/icons/facebook.svg?react';
import instagram from '@/shared/assets/icons/instagram.svg?react';
import linkedin from '@/shared/assets/icons/linkedin.svg?react';
import logo from '@/shared/assets/icons/logo.svg?react';
import { getRouteMain } from '@/shared/const/routes';
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

  return (
    <footer className="bg-gray-900 mt-0 overflow-hidden relative">
      <Container>
        <div className="z-10 w-[550px] h-[550px] origin-top-left rotate-[120deg] bg-neutral-900 rounded-[217px] absolute left-[33%]  top-[-20%]" />
        <div className="w-[550px] h-[550px] origin-top-left rotate-[120deg] bg-neutral-900 rounded-[217px] absolute right-[-40%] top-[100%]" />
        <div className="z-20 relative">
          <VStack align="start" justify="around" className="pt-12">
            <HStack align="start" justify="between" className="w-1/2">
              <Link to={getRouteMain()}>
                <Icon Svg={logo} width={202} height={68} />
              </Link>
              <Text
                size="md"
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
              <Button
                variant="fill"
                className="w-[313px] h-[52px] mt-[26px] mb-[77px] text-[16px]"
              >
                Стати продавцем
              </Button>
            </HStack>
            <VStack align="start" justify="between" className=" gap-5 w-1/2">
              {footerLinks.map((titleLink, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <HStack key={i} gap="6">
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
            className="border-t-2 border-white pt-6 mb-5"
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
