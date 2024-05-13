import { FC, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import HeaderSearchInput from './components/HeaderSearchInput';

import { getUserAuthData, getWishlist, userActions } from '@/enteties/User';
import { actionLogin } from '@/features/userAuth';
import { ForgottenPasswordForm } from '@/features/userAuth/ui/ForgottenPasswordForm';
import { LoginForm } from '@/features/userAuth/ui/LoginForm';
import { RegistrationForm } from '@/features/userAuth/ui/RegistrationForm';
import allProducts from '@/shared/assets/icons/allProducts.svg?react';
import burger from '@/shared/assets/icons/burger.svg?react';
import cancel from '@/shared/assets/icons/cancel.svg?react';
import en from '@/shared/assets/icons/en.svg?react';
import like from '@/shared/assets/icons/like.svg?react';
import logo from '@/shared/assets/icons/logo.svg?react';
import person from '@/shared/assets/icons/person.svg?react';
import ua from '@/shared/assets/icons/ua.svg?react';
import {
  getAdminProfile,
  getRouteMain,
  getRouteProfile,
  getSellerProfile,
} from '@/shared/const/routes';
import { Container } from '@/shared/layouts/Container';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Link } from '@/shared/ui/Link';
import { ModalWindow } from '@/shared/ui/ModalWindow';
import { HStack, VStack } from '@/shared/ui/Stack';
import { BurgerMenu } from '@/widgets/BurgerMenu';
import { ModalCategory } from '@/widgets/ModalCategory';

interface Props {}

const Header: FC<Props> = () => {
  const { t, i18n } = useTranslation();

  const categoryButtonRef = useRef<HTMLButtonElement>(null);
  const burgerButtonRef = useRef<HTMLButtonElement>(null);

  const [showModalCategory, setShowModalCategory] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentForm, setCurrentForm] = useState<number>(0);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  const { wishlist } = useAppSelector(getWishlist);
  const user = useAppSelector(getUserAuthData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onAllProductsClick = (): void => {
    setShowModalCategory((prevState) => !prevState);
  };

  const onHandleClickPortal = (): void => {
    setShowModal(!showModal);
    setCurrentForm(0);
    dispatch(actionLogin.resetError());
    dispatch(userActions.resetError());
  };

  const onToggleForm = (index: number) => {
    setCurrentForm(index);
    dispatch(actionLogin.resetError());
    dispatch(userActions.resetError());
  };

  const onOfficeBtnClick = (): void => {
    if (user?.role === 'user') {
      navigate(getRouteProfile('info'));
    } else if (user?.role === 'seller') {
      navigate(getSellerProfile('dashboard'));
    } else if (user?.role === 'admin') {
      navigate(getAdminProfile('users'));
    } else {
      setShowModal(!showModal);
    }
  };

  const onWishListBtnClick = (): void => {
    if (user) {
      navigate(getRouteProfile('wishlist'));
    } else {
      setShowModal(!showModal);
    }
  };

  const onUaChange = (): void => {
    i18n.changeLanguage('ua').then(() => {});
  };

  const onEnChange = (): void => {
    i18n.changeLanguage('en').then(() => {});
  };

  const onHandleClickBurger = (): void => {
    setShowBurgerMenu(!showBurgerMenu);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-main-dark">
      <Container>
        <VStack
          align="center"
          className="justify-center lg:justify-between py-4 lg:py-6 xl:py-4"
        >
          <Link to={getRouteMain()}>
            <Icon
              Svg={logo}
              className="hidden lg:block lg:w-[152px] lg:h-[52px] xl:w-[202px] xl:h-[68px]"
            />
          </Link>

          <VStack align="center" className="w-full lg:w-auto">
            <VStack
              gap="4"
              className="w-full flex-col-reverse items-end lg:items-center lg:flex-row lg:mr-[25px] xl:mr-[75px]"
            >
              <Button
                id="all-category-button"
                aria-controls="all-category-modal"
                ref={categoryButtonRef}
                variant="primary"
                aria-haspopup
                aria-expanded={showModalCategory}
                className="hidden lg:block all-products-button text-[14px] py-[7px] w-[126px]"
                onClick={onAllProductsClick}
              >
                <VStack align="center" gap="1">
                  <Icon
                    aria-hidden="true"
                    Svg={showModalCategory ? cancel : allProducts}
                    width={24}
                    height={24}
                  />
                  {t('Всі товари')}
                </VStack>
              </Button>

              <HeaderSearchInput />

              <VStack
                gap="1"
                className="flex-row-reverse lg:flex-row items-center justify-between w-full lg:w-auto"
              >
                <Button
                  variant="clear"
                  className="hidden lg:block group duration-300 text-amber-50 lg:w-[76px] xl:w-[86px]"
                  onClick={onOfficeBtnClick}
                >
                  <HStack
                    align="center"
                    className="gap-1.5 group-hover:text-main duration-300"
                  >
                    <Icon
                      Svg={person}
                      width={28}
                      height={28}
                      className="stroke-main-white group-hover:stroke-main duration-300"
                    />
                    <span>{t('Кабінет')}</span>
                  </HStack>
                </Button>

                <Button
                  variant="clear"
                  className="group duration-300 text-amber-50 w-[28px] lg:w-[76px] xl:w-[86px]"
                  onClick={onWishListBtnClick}
                >
                  <HStack
                    align="center"
                    className="relative gap-1.5 group-hover:text-main duration-300"
                  >
                    <Icon
                      Svg={like}
                      className="lg:w-[28px] lg:h-[28px] stroke-main-white group-hover:stroke-main duration-300"
                    />

                    <div
                      className={
                        wishlist?.length < 1
                          ? 'hidden'
                          : 'absolute right-0 lg:right-[24px] xl:right-[29px] flex justify-items-center items-center bg-main border-[1.5px] border-main-dark rounded-full'
                      }
                    >
                      <span
                        className={
                          wishlist?.length < 1
                            ? 'hidden'
                            : 'outfit font-normal min-w-[10px] m-[2px] text-center text-main-dark text-[10px] leading-[10px]'
                        }
                      >
                        {wishlist?.length}
                      </span>
                    </div>
                    <span className="hidden lg:block">{t('Список')}</span>
                  </HStack>
                </Button>
                <VStack className="block lg:hidden" align="center" gap="4">
                  <Button
                    id="burger-menu-button"
                    aria-controls="burger-menu"
                    ref={burgerButtonRef}
                    variant="clear"
                    aria-haspopup
                    aria-expanded={showBurgerMenu}
                    onClick={onHandleClickBurger}
                    className="lg:hidden"
                  >
                    <Icon Svg={burger} />
                  </Button>
                  <Link to={getRouteMain()}>
                    <Icon Svg={logo} width={110} height={38} />
                  </Link>
                </VStack>
              </VStack>
            </VStack>

            <VStack align="center" className="gap-[7.5px]">
              <Icon
                clickable
                onClick={onUaChange}
                Svg={ua}
                width={24}
                height={18}
                className={
                  i18n.language === 'ua'
                    ? 'hidden lg:block opacity-50 duration-200'
                    : 'hidden lg:block'
                }
              />
              <div className="hidden lg:block h-6 border-r-[1px] border-solid border-main" />
              <Icon
                clickable
                onClick={onEnChange}
                Svg={en}
                width={22}
                height={18}
                className={
                  i18n.language === 'en'
                    ? 'hidden lg:block opacity-50 duration-200'
                    : 'hidden lg:block'
                }
              />
            </VStack>
          </VStack>
        </VStack>

        <ModalCategory
          modalButtonRef={categoryButtonRef}
          setClose={() => setShowModalCategory(false)}
          isOpen={showModalCategory}
        />

        <BurgerMenu
          burgerButtonRef={burgerButtonRef}
          isOpen={showBurgerMenu}
          setModalLoginForm={() => setShowModal(true)}
          setModalRegistrationForm={() => {
            setCurrentForm(1);
            setShowModal(true);
          }}
          setClose={() => setShowBurgerMenu(false)}
        />
      </Container>

      {showModal && (
        <ModalWindow
          onCloseFunc={onHandleClickPortal}
          className="px-4 md:px-8 py-6 md:py-10 h-full md:h-auto w-screen md:w-auto rounded-none md:rounded-2xl animate-open-forms-modal"
        >
          <VStack align="center" justify="between">
            <span className="outfit text-right text-main-dark text-[20px] md:text-[32px] leading-[24px] md:leading-[28px] font-semibold">
              {currentForm !== 1 && t('Вхід')}
              {currentForm === 1 && t('Реєстрація')}
            </span>
            <Icon
              clickable
              onClick={onHandleClickPortal}
              Svg={cancel}
              width={24}
              height={24}
              className="fill-selected-dark hover:transition hover:rotate-90 hover:duration-300 duration-300"
            />
          </VStack>
          {currentForm === 0 && (
            <LoginForm onToggleForm={onToggleForm} onCloseModal={onHandleClickPortal} />
          )}
          {currentForm === 1 && (
            <RegistrationForm
              onToggleForm={onToggleForm}
              onCloseModal={onHandleClickPortal}
            />
          )}
          {currentForm === 2 && (
            <ForgottenPasswordForm
              onToggleForm={onToggleForm}
              onCloseModal={onHandleClickPortal}
            />
          )}
        </ModalWindow>
      )}
    </header>
  );
};

export default Header;
