import { ChangeEvent, FC, FormEventHandler, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { getWishlist } from '@/enteties/User/model/selectors/getUserAuthData';
import allProducts from '@/shared/assets/icons/allProducts.svg?react';
import cancel from '@/shared/assets/icons/cancel.svg?react';
import en from '@/shared/assets/icons/en.svg?react';
import like from '@/shared/assets/icons/like.svg?react';
import logo from '@/shared/assets/icons/logo.svg?react';
import person from '@/shared/assets/icons/person.svg?react';
import search from '@/shared/assets/icons/search.svg?react';
import ua from '@/shared/assets/icons/ua.svg?react';
import { getRouteMain } from '@/shared/const/routes';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { Link } from '@/shared/ui/Link';
import { HStack, VStack } from '@/shared/ui/Stack';
import { ModalCategory } from '@/widgets/ModalCategory';

interface Props {}

const Header: FC<Props> = () => {
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [inputData, setInputData] = useState<string>('');

  const counterWishlist: string = '2';

  const { wishlist } = useAppSelector(getWishlist);

  const onAllProductsClick = (): void => {
    setShowModal(!showModal);
  };

  const onSubmitSearch: FormEventHandler<HTMLFormElement> = (
    e: ChangeEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setInputData('');
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputData(e.target.value);
  };

  const onUaChange = (): void => {
    i18n.changeLanguage('ua').then(() => {});
  };

  const onEnChange = (): void => {
    i18n.changeLanguage('en').then(() => {});
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-gray-900">
      <Container>
        <VStack align="center" justify="between" className="py-4">
          <Link to={getRouteMain()}>
            <Icon Svg={logo} width={202} height={68} />
          </Link>

          <Button
            variant="fill"
            className="ml-[131px] all-products-button"
            onClick={onAllProductsClick}
          >
            <VStack align="center" gap="1">
              <Icon Svg={showModal ? cancel : allProducts} width={24} height={24} />
              {t('Всі товари')}
            </VStack>
          </Button>

          <form
            onSubmit={onSubmitSearch}
            className="flex flex-nowrap items-center ml-6 mr-5 hover:drop-shadow-custom-primary duration-300"
            autoComplete="off"
          >
            <Input
              name="searchInput"
              type="text"
              variant="search"
              value={inputData}
              placeholder={t('Я шукаю')}
              onChange={onChangeInput}
            />
            <Button
              variant="search"
              type="submit"
              onClick={() => {
                setInputData('');
              }}
            >
              <Icon Svg={search} width={20} height={20} />
            </Button>
          </form>

          <VStack gap="1" className="mr-[75px]">
            <Link to="/" className="group duration-300 text-amber-50 w-[86px]">
              <HStack align="center" className="gap-1.5 group-hover:text-primary">
                <Icon
                  Svg={person}
                  width={28}
                  height={28}
                  className="stroke-white group-hover:stroke-primary"
                />
                {t('Кабінет')}
              </HStack>
            </Link>

            <Link to="/" className="group duration-300 text-amber-50 w-[86px]">
              <HStack
                align="center"
                className="relative gap-1.5 group-hover:text-primary"
              >
                <Icon
                  Svg={like}
                  width={28}
                  height={28}
                  className="stroke-white group-hover:stroke-primary"
                />
                <div
                  className={
                    wishlist.length < 1
                      ? 'hidden'
                      : 'absolute right-[29px] flex justify-items-center items-center bg-primary border-[1.5px] border-gray-900 rounded-full'
                  }
                >
                  <span
                    className={
                      counterWishlist < '1'
                        ? 'hidden'
                        : 'outfit font-normal min-w-[10px] m-[2px] text-center text-black text-[10px] leading-[10px]'
                    }
                  >
                    {wishlist.length}
                  </span>
                </div>
                {t('Список')}
              </HStack>
            </Link>
          </VStack>

          <VStack align="center" className="gap-[7.5px]">
            <Icon
              clickable
              onClick={onUaChange}
              Svg={ua}
              width={24}
              height={18}
              className={i18n.language === 'ua' ? 'opacity-50' : ''}
            />
            <div className="h-6 border-r-[1px] border-solid border-primary" />
            <Icon
              clickable
              onClick={onEnChange}
              Svg={en}
              width={22}
              height={18}
              className={i18n.language === 'en' ? 'opacity-50' : ''}
            />
          </VStack>
        </VStack>

        <ModalCategory activeModal={showModal} />
      </Container>
    </header>
  );
};

export default Header;
