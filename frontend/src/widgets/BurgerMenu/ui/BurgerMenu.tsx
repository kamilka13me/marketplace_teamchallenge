import React, { FC, RefObject, useEffect, useRef } from 'react';

import { Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';

import allProducts from '@/shared/assets/icons/allProducts.svg?react';
import cancelWhite from '@/shared/assets/icons/cancel-white.svg?react';
import enBlack from '@/shared/assets/icons/en-black.svg?react';
import logo from '@/shared/assets/icons/logo.svg?react';
import person from '@/shared/assets/icons/person.svg?react';
import uaBlack from '@/shared/assets/icons/ua-black.svg?react';
import { getRouteMain } from '@/shared/const/routes';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Link } from '@/shared/ui/Link';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  burgerButtonRef: RefObject<HTMLButtonElement> | null;
  isOpen: boolean;
  setClose: () => void;
  setModalLoginForm: () => void;
  setModalRegistrationForm: () => void;
}

const BurgerMenu: FC<Props> = (props) => {
  const {
    isOpen,
    setClose,
    setModalLoginForm,
    setModalRegistrationForm,
    burgerButtonRef,
  } = props;

  const { t, i18n } = useTranslation();

  const burgerDataRef = useRef<HTMLDivElement>(null);

  const onClickLogin = (): void => {
    setClose();
    setModalLoginForm();
  };

  const onClickRegistation = (): void => {
    setClose();
    setModalRegistrationForm();
  };

  const onUaChange = (): void => {
    i18n.changeLanguage('ua').then(() => {});
  };

  const onEnChange = (): void => {
    i18n.changeLanguage('en').then(() => {});
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        burgerDataRef.current?.contains(event.target as Node) ||
        burgerButtonRef?.current?.contains(event.target as Node)
      ) {
        document.body.classList.add('overflow-hidden');

        return;
      }

      if (event.target === document.querySelector('#outside-burger')) {
        document.body.classList.remove('overflow-hidden');
        setClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        document.body.classList.remove('overflow-hidden');
        setClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setClose, burgerDataRef, burgerButtonRef, isOpen]);

  return (
    <>
      <Transition
        show={isOpen}
        enter="ease-in-out duration-500"
        enterFrom="opacity-0 translate-y-[-242px]"
        enterTo="opacity-100 translate-y-0"
        leave="ease-in-out duration-500"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-[-242px]"
        className="absolute lg:hidden w-full top-0 left-1/2 transform -translate-x-1/2 z-[99]"
      >
        <div
          id="burger-menu"
          aria-labelledby="burger-menu-button"
          ref={burgerDataRef}
          className="min-w-[375px]"
        >
          <HStack
            justify="between"
            className="min-h-[124px] p-4 rounded-t-2xl bg-gray-900"
          >
            <VStack align="center" justify="between" className="w-full">
              <Link to={getRouteMain()}>
                <Icon Svg={logo} width={110} height={38} />
              </Link>
              <Icon
                clickable
                onClick={() => {
                  setClose();
                  document.body.classList.remove('overflow-hidden');
                }}
                Svg={cancelWhite}
                width={24}
                height={24}
              />
            </VStack>
            <VStack align="center" className="gap-[22px]">
              <Link to={getRouteMain()}>
                <Icon Svg={person} width={28} height={28} className="stroke-white" />
              </Link>
              <VStack align="center" className="gap-[7.5px]">
                <Button variant="clear" onClick={onClickLogin}>
                  <span className="outfit font-normal text-base text-white">
                    {t('Вхід')}
                  </span>
                </Button>
                <div className="h-6 border-r-[1px] border-solid border-primary" />
                <Button variant="clear" onClick={onClickRegistation}>
                  <span className="outfit font-normal text-base text-white">
                    {t('Реєстрація')}
                  </span>
                </Button>
              </VStack>
            </VStack>
          </HStack>
          <HStack justify="between" className="min-h-[118px] p-4 rounded-b-2xl bg-white">
            <Button
              variant="fill"
              onClick={() => {}}
              className="relative w-full h-[38px] text-center"
            >
              <Icon
                aria-hidden="true"
                Svg={allProducts}
                width={24}
                height={24}
                className="absolute top-[7px] left-[16px]"
              />
              <Text
                Tag="span"
                text={t('Всі категорії')}
                size="sm"
                className="font-semibold"
                font="outfit"
              />
            </Button>
            <VStack align="center" className="gap-[48px]">
              <Text
                Tag="span"
                text={t('Мова')}
                size="sm"
                className="font-semibold"
                font="outfit"
              />
              <VStack align="center" className="gap-[7.5px]">
                <Icon
                  clickable
                  onClick={onUaChange}
                  Svg={uaBlack}
                  width={22}
                  height={22}
                  className={i18n.language === 'ua' ? 'opacity-50 duration-200' : ''}
                />
                <div className="h-6 border-r-[1px] border-solid border-primary" />
                <Icon
                  clickable
                  onClick={onEnChange}
                  Svg={enBlack}
                  width={21}
                  height={22}
                  className={i18n.language === 'en' ? 'opacity-50 duration-200' : ''}
                />
              </VStack>
            </VStack>
          </HStack>
        </div>
      </Transition>
      {isOpen && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div
          id="outside-burger"
          className="fixed lg:hidden top-0 left-0 w-screen h-screen z-[98] bg-black-transparent-50"
          onClick={setClose}
        />
      )}
    </>
  );
};

export default BurgerMenu;
