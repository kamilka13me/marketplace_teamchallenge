import { FC, useEffect, useState } from 'react';

import { fetchAllUsers, usersActions } from '@/enteties/User';
import {
  getIsUsersLoading,
  getUsersLength,
  getUsersLimit,
  getUsersOffset,
} from '@/enteties/User/model/selectors/getUsersSelectors';
import { fetchNextUsers } from '@/enteties/User/model/services/fetchNextUsers';
import { fetchPrevUsers } from '@/enteties/User/model/services/fetchPrevUsers';
import { getUsers } from '@/enteties/User/model/slice/usersSlice';
import AdminManagingUsersController from '@/features/adminManagingUsers/ui/AdminManagingUsersController';
import ManagingUserActionModal from '@/features/adminManagingUsers/ui/ManagingUserActionModal';
import MobileAdminManagingUsers from '@/features/adminManagingUsers/ui/MobileAdminManagingUsers';
import search from '@/shared/assets/icons/search.svg?react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import Pagination from '@/shared/ui/Pagination/Pagination';
import { HStack } from '@/shared/ui/Stack';

const AdminManagingUsers: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useState('');
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [isRecoveryPasswordModalOpen, setIsRecoveryPasswordModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const data = useAppSelector(getUsers.selectAll);
  const isLoading = useAppSelector(getIsUsersLoading);
  const offset = useAppSelector(getUsersOffset);
  const totalUsers = useAppSelector(getUsersLength);
  const limit = useAppSelector(getUsersLimit);

  const handleClickPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    dispatch(usersActions.setOffset((pageNumber - 1) * limit));
    dispatch(fetchAllUsers({}));
  };

  const fetchNext = () => {
    setCurrentPage((prev) => prev + 1);

    dispatch(fetchNextUsers());
  };

  const fetchPrev = () => {
    setCurrentPage((prev) => prev - 1);

    dispatch(fetchPrevUsers());
  };

  useEffect(() => {
    dispatch(fetchAllUsers({}));
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsBanModalOpen(false);
      setIsRecoveryPasswordModalOpen(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isBanModalOpen, isRecoveryPasswordModalOpen]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <HStack align="center" gap="5" className="w-full">
      {isBanModalOpen && <ManagingUserActionModal actionType="ban" />}
      {isRecoveryPasswordModalOpen && (
        <ManagingUserActionModal actionType="recovery-password" />
      )}

      <div className="text-main-white bg-dark-grey p-4 rounded-2xl w-full">
        <div className="lg:max-w-[346px]">
          <div className="flex flex-nowrap items-center w-full lg:w-auto mb-5">
            <Input
              name="searchInput"
              type="text"
              variant="search"
              value={searchParams}
              onChange={(e) => setSearchParams(e.currentTarget.value)}
              className="min-h-[38px] w-full bg-selected-dark"
              classNameBlockWrap="w-full"
            />
            <Button
              variant="primary"
              className="rounded-l-none !px-[14px] py-[9px]"
              type="submit"
              onClick={() => {
                dispatch(usersActions.setSearchString(searchParams));
                dispatch(usersActions.setOffset(0));
                dispatch(fetchAllUsers({}));
              }}
            >
              <Icon Svg={search} width={20} height={20} />
            </Button>
          </div>
        </div>

        <HStack gap="2" className="w-full lg:hidden">
          {data.map((user) => (
            <MobileAdminManagingUsers
              key={user._id}
              user={user}
              showBanModal={() => setIsBanModalOpen(true)}
              showRecoveryPasswordModal={() => setIsRecoveryPasswordModalOpen(true)}
            />
          ))}
        </HStack>

        <table className="table-auto overflow-scroll w-full hidden lg:inline">
          <thead className="">
            <tr className="bg-selected-dark rounded-2xl">
              <th className="!font-normal text-start p-[10px] text-lg w-[171px] rounded-l-2xl">
                ID користувача
              </th>
              <th className="!font-normal text-start p-[10px] text-lg w-[188px]">
                Імʼя користувача
              </th>
              <th className="!font-normal text-start p-[10px] text-lg w-[160px]">
                Email
              </th>
              <th className="!font-normal text-start p-[10px] text-lg w-[168px]">
                Телефон{' '}
              </th>
              <th className="!font-normal text-start p-[10px] text-lg w-[164px]">
                Дата взаємодії
              </th>
              <th className="!font-normal p-[10px] text-lg w-[102px] rounded-r-2xl">
                Дії
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.map((user) => (
              <tr
                key={user?._id}
                className="!font-normal  text-start even:bg-selected-dark "
              >
                <th
                  onClick={() => {
                    copyToClipboard(user?._id || '');
                  }}
                  className="cursor-pointer !font-normal text-start  p-[10px] w-[171px] rounded-l-2xl relative group"
                >
                  {user?._id?.slice(10, 24)}
                  <span className="absolute left-1/2 top-[40px] text-sm mt-1 p-2 bg-dark-grey text-main-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {user?._id}
                  </span>
                </th>
                <th
                  onClick={() => {
                    copyToClipboard(user?.username || '');
                  }}
                  className="cursor-pointer !font-normal text-start  px-[10px] py-5 w-[188px] relative group "
                >
                  {user?.username?.slice(0, 12)}
                  {user?.username?.length > 12 && (
                    <span className="absolute left-1/2 top-[40px] text-sm mt-1 p-2 bg-dark-grey text-main-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      {user?.username}
                    </span>
                  )}
                </th>
                <th
                  onClick={() => {
                    copyToClipboard(user?.email || '');
                  }}
                  className="cursor-pointer relative group !font-normal text-start  px-[10px] py-5 w-[160px]"
                >
                  {user?.email?.slice(0, 12)}
                  {user?.email?.length > 12 && (
                    <span className="absolute left-1/2 top-[40px] text-sm mt-1 p-2 bg-dark-grey text-main-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      {user?.email}
                    </span>
                  )}
                </th>
                <th className="cursor-pointer !font-normal text-start  px-[10px] py-5 w-[168px]">
                  {user?.phoneNumber}
                </th>
                <th className="!font-normal text-start  px-[10px] py-5 w-[164px]">
                  {user?.activity?.date?.slice(0, 10)}
                </th>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th className="!font-normal w-[102px] rounded-r-2xl">
                  <AdminManagingUsersController
                    currentUser={user}
                    showBanModal={() => setIsBanModalOpen(true)}
                    showRecoveryPasswordModal={() => setIsRecoveryPasswordModalOpen(true)}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          dataLength={totalUsers}
          itemsPerPage={limit}
          currentPage={currentPage}
          setPage={handleClickPage}
          offset={offset}
          fetchNext={fetchNext}
          fetchPrev={fetchPrev}
        />
      </div>
    </HStack>
  );
};

export default AdminManagingUsers;
