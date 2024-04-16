import React, { FC, SVGProps, useEffect, useState, VFC, Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { NavLink, useNavigate } from 'react-router-dom';

import { getUserAuthData, userActions } from '@/enteties/User';
import arrow from '@/shared/assets/icons/arrow-right.svg?react';
import logout from '@/shared/assets/icons/logout.svg?react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { PersonalDataForms } from '@/widgets/PersonalDataForms';
import { WishlistProfileTab } from '@/widgets/WishlistProfileTab';

export interface ITab {
  id: number;
  title: string;
  urlId: string;
  icon: VFC<SVGProps<SVGSVGElement>> | string;
}

interface Props {
  tabs: ITab[];
  tab: number;
  setTab: (index: number) => void;
}

const ProfileSidebar: FC<Props> = (props) => {
  const { setTab, tab, tabs } = props;

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const user = useAppSelector(getUserAuthData);

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col justify-between px-3 lg:px-4 py-5 lg:py-8 rounded-2xl bg-dark-grey w-full lg:max-w-[282px] h-auto whitespace-nowrap">
      <div>
        <VStack align="center" gap="4" className="hidden lg:flex px-4">
          <div className="flex justify-center items-center w-[56px] h-[56px] rounded-full bg-selected-dark">
            <Text
              Tag="p"
              text={`${user?.username?.[0] || ''}${user?.surname?.[0] || ''}`}
              size="md"
              align="center"
              color="white"
            />
          </div>
          <Text
            Tag="p"
            text={`${user?.username || ''} ${user?.surname || ''}`}
            size="md"
            align="center"
            color="white"
          />
        </VStack>
        <div className="hidden lg:block h-[2px] bg-gradient-to-r from-0% from-[rgba(224,225,226,0)] via-50% via-[rgba(224,225,226,1)] to-100% to-[rgba(224,225,226,0)] mt-6" />
        <HStack
          align="center"
          justify="between"
          className="gap-[6px] h-full w-full lg:mt-6"
        >
          {windowWidth <= 1024 ? (
            <div className="w-full">
              <div className="relative mt-1 z-40">
                <Listbox value={selectedTab} onChange={setSelectedTab}>
                  <Listbox.Button
                    className="relative w-full h-[54px] cursor-default rounded-lg bg-stone-900 pl-3 pr-10  py-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span className="flex gap-4 truncate text-white !focus:text-white-transparent-70">
                      {selectedTab && (
                        <div className="mr-2 bg-main p-[7px] rounded-md stroke-dark-grey">
                          <Icon Svg={selectedTab.icon} width={16} height={16} />
                        </div>
                      )}
                      <p className="text-md">
                        {selectedTab ? selectedTab.title : 'Select option'}
                      </p>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      {isOpen ? (
                        <Icon
                          Svg={arrow}
                          className="fill-white -rotate-90"
                          aria-hidden="true"
                        />
                      ) : (
                        <Icon
                          Svg={arrow}
                          className="fill-white rotate-90"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-stone-900 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm left-0">
                      {tabs.map((item, index) => (
                        <Listbox.Option
                          key={item.id}
                          value={item}
                          disabled={false}
                          onClick={() => setTab(index)}
                          className={({ active }) =>
                            `relative cursor-default select-none py-4 pl-4 pr-4 ${
                              active ? 'text-white' : 'text-light-grey'
                            }`
                          }
                        >
                          <div className="flex gap-4">
                            <Icon
                              Svg={item?.icon}
                              width={16}
                              height={16}
                              className={`${tab === index ? 'stroke-dark-grey' : 'stroke-disabled '}`}
                            />
                            {item.title}
                          </div>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </Listbox>
              </div>
              {selectedTab && selectedTab === tabs[0] && <PersonalDataForms />}
              {selectedTab && selectedTab === tabs[1] && <WishlistProfileTab />}
            </div>
          ) : (
            <ul className="flex flex-col gap-[6px] w-full lg:mb-[42px]">
              {tabs.map((item, index) => (
                <li
                  key={item?.id}
                  className={`px-4 py-3 ${tab === index && 'bg-selected-dark'} rounded-2xl min-w-[234px]`}
                >
                  <NavLink to={item?.urlId} className="flex">
                    <Button variant="clear" onClick={() => setTab(index)}>
                      <VStack align="center" gap="4">
                        <div
                          className={`${tab === index && 'bg-main'} p-[7px] rounded-md`}
                        >
                          <Icon
                            Svg={item?.icon}
                            width={16}
                            height={16}
                            className={`${tab === index ? 'stroke-dark-grey' : 'stroke-disabled '}`}
                          />
                        </div>
                        <Text
                          className={`${tab === index ? '!text-main-white' : '!text-disabled'} whitespace-normal`}
                          Tag="p"
                          text={item?.title}
                          size="md"
                        />
                      </VStack>
                    </Button>
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </HStack>
      </div>
      <Button
        variant="clear"
        className="justify-self-end px-4 py-3"
        onClick={() => {
          dispatch(userActions.logout());
          navigate(0);
        }}
      >
        <VStack align="center" gap="4">
          <div className="p-[7px]">
            <Icon
              Svg={logout}
              width={16}
              height={16}
              className={`stroke-disabled stroke-2 `}
            />
          </div>
          <Text className="!text-disabled mt-[3px]" Tag="p" text="Вихід" size="md" />
        </VStack>
      </Button>
    </div>
  );
};

export default ProfileSidebar;
