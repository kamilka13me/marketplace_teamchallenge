import React, { FC, SVGProps, useState, VFC, Fragment, useLayoutEffect } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { NavLink, useNavigate } from 'react-router-dom';

import { userActions } from '@/enteties/User';
import arrow from '@/shared/assets/icons/arrow-right.svg?react';
import logout from '@/shared/assets/icons/logout.svg?react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

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
  renderContent: FC[];
}

const ProfileSidebar: FC<Props> = (props) => {
  const { setTab, tab, tabs, renderContent } = props;

  const RenderContent = renderContent[tab];

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(() => {
    if (tab === 0) {
      setSelectedTab(tabs[0]);
    } else if (tab === 1) {
      setSelectedTab(tabs[1]);
    } else if (tab === 2) {
      setSelectedTab(tabs[2]);
    } else if (tab === 3) {
      setSelectedTab(tabs[3]);
    } else if (tab === 4) {
      setSelectedTab(tabs[4]);
    } else if (tab === 5) {
      setSelectedTab(tabs[5]);
    } else {
      setSelectedTab(tabs[0]);
    }
  }, [tab, tabs]);

  return (
    <div className="md:hidden flex flex-col justify-between px-3 py-5 rounded-2xl bg-dark-grey w-full min-h-[568px] whitespace-nowrap">
      <div>
        <HStack align="center" justify="between" className="gap-[6px] h-full w-full">
          <div className="relative w-full z-40">
            <Listbox value={selectedTab} onChange={setSelectedTab}>
              <Listbox.Button
                className="relative w-full rounded-lg bg-selected-dark pl-4 pr-[22px] py-3"
                onClick={() => setIsOpen(!isOpen)}
              >
                {selectedTab && (
                  <VStack align="center" gap="4">
                    <div className="bg-main p-[7px] rounded-md">
                      <Icon
                        Svg={selectedTab?.icon}
                        width={16}
                        height={16}
                        className="stroke-dark-grey"
                      />
                    </div>

                    <Text
                      className={`${selectedTab ? '!text-main-white' : '!text-disabled'} whitespace-normal`}
                      Tag="p"
                      text={selectedTab?.title}
                      size="md"
                    />
                    <Icon
                      Svg={arrow}
                      className={`ml-auto fill-main-white ${isOpen ? 'rotate-90' : '-rotate-90'}`}
                      width={30}
                      height={30}
                    />
                  </VStack>
                )}
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 h-auto w-full overflow-auto rounded-md bg-selected-dark">
                  {tabs.map((item, index) => (
                    <Listbox.Option
                      as={NavLink}
                      to={item?.urlId}
                      key={item?.id}
                      value={item}
                      onClick={() => setTab(index)}
                      className="relative flex px-4 py-3"
                    >
                      <VStack align="center" gap="4">
                        <div className="p-[7px]">
                          <Icon
                            Svg={item?.icon}
                            width={16}
                            height={16}
                            className={`${tab === index ? 'stroke-disabled' : 'stroke-dark-grey'}`}
                          />
                        </div>
                        <Text
                          className={`${tab === index ? '!text-main-white' : '!text-disabled'} whitespace-normal`}
                          Tag="p"
                          text={item?.title}
                          size="md"
                        />
                      </VStack>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>

          {RenderContent && <RenderContent />}
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
