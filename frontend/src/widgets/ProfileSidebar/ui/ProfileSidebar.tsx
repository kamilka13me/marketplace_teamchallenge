import React, { FC } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';

import { getUserAuthData, userActions } from '@/enteties/User';
import like from '@/shared/assets/icons/like.svg?react';
import logout from '@/shared/assets/icons/logout.svg?react';
import person from '@/shared/assets/icons/person.svg?react';
import { getRouteProfile } from '@/shared/const/routes';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

const tabs = [
  {
    id: 1,
    title: 'Персональні дані',
    urlId: 'info',
    icon: person,
  },
  {
    id: 2,
    title: 'Список бажань',
    urlId: 'wishlist',
    icon: like,
  },
];

interface Props {
  tab: number;
  setTab: (index: number) => void;
}

const ProfileSidebar: FC<Props> = (props) => {
  const { setTab, tab } = props;

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const user = useAppSelector(getUserAuthData);

  return (
    <div className="flex flex-col px-4 pt-8 pb-[15px] rounded-2xl bg-dark-grey w-[266px] h-[568px] whitespace-nowrap">
      <VStack align="center" gap="4" className="px-4">
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
      <div className="h-[2px] bg-gradient-to-r from-0% from-[rgba(224,225,226,0)] via-50% via-[rgba(224,225,226,1)] to-100% to-[rgba(224,225,226,0)] mt-6" />
      <HStack align="center" justify="between" className="gap-[6px] h-full w-full mt-6">
        <ul className="flex flex-col gap-[6px] w-full">
          {tabs.map((item, index) => (
            <li
              key={item.id}
              className={`px-4 py-3 ${tab === index && 'bg-selected-dark'} rounded-2xl min-w-[234px]`}
            >
              <NavLink to={getRouteProfile(item.urlId)} className="flex">
                <Button variant="clear" onClick={() => setTab(index)}>
                  <VStack align="center" gap="4">
                    <div className={`${tab === index && 'bg-main'} p-[7px] rounded-md`}>
                      <Icon
                        Svg={item.icon}
                        width={16}
                        height={16}
                        className={`${tab === index ? 'stroke-dark-grey' : 'stroke-disabled '} stroke-2 `}
                      />
                    </div>
                    <Text
                      className={`${tab === index ? '!text-main-white' : '!text-disabled'} `}
                      Tag="p"
                      text={item.title}
                      size="md"
                    />
                  </VStack>
                </Button>
              </NavLink>
            </li>
          ))}
        </ul>
        <Button
          variant="clear"
          className="self-start px-[17px]"
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
      </HStack>
    </div>
  );
};

export default ProfileSidebar;
