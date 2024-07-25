import { FC, useEffect, useState } from 'react';

import {
  getIsSellersLoading,
  getSellersLimit,
  getSellersOffset,
  getTotalSellers,
} from '@/enteties/Seller/model/selectors/getSellersSelectors';
import { fetchNextSellers } from '@/enteties/Seller/model/services/fetchNextSellers';
import { fetchPrevSellers } from '@/enteties/Seller/model/services/fetchPrevSellers';
import { fetchAllSellers } from '@/enteties/Seller/model/services/getAllSellers';
import { getSellers, sellersActions } from '@/enteties/Seller/model/slice/sellersSlice';
import { SellerStatus } from '@/enteties/Seller/model/types/seller';
import ActiveSellerModal from '@/features/AdminManagingSellers/ui/ActiveSellerModal';
import AdminManagingSellersController from '@/features/AdminManagingSellers/ui/AdminManagingSellersController';
import AdminManagingSellersNavbar from '@/features/AdminManagingSellers/ui/AdminManagingSellersNavbar';
import BanSellerModal from '@/features/AdminManagingSellers/ui/BanSellerModal';
import SellerInfoForm from '@/features/AdminManagingSellers/ui/SellerInfoForm';
import SellerStatusBadge from '@/features/AdminManagingSellers/ui/SellerStatusBadge';
import { $api } from '@/shared/api/api';
import calendar from '@/shared/assets/icons/calendar.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { BlockModal } from '@/shared/ui/BlockModal';
import { Icon } from '@/shared/ui/Icon';
import Pagination from '@/shared/ui/Pagination/Pagination';
import { formatDate } from '@/shared/utils/formatDate';
import { IRangeDate } from '@/widgets/ListingSort/ui/components/ListingSearchCalendar';

const AdminManagingSellers: FC = () => {
  const [isSellerInfoOpen, setIsSellerInfoOpen] = useState(false);
  const [currentSellerId, setCurrentSellerId] = useState<string | null>(null);
  const [currentSellerStatus, setCurrentSellerStatus] = useState<SellerStatus | null>(
    null,
  );
  const [banModalOpen, setBanModalOpen] = useState(false);
  const [currentSellerName, setCurrentSellerName] = useState<string | null>(null);
  const [showBanSellerModal, setShowBanSellerModal] = useState(false);
  const [showActiveSellerModal, setShowActiveSellerModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [state, setState] = useState<IRangeDate[]>([
    {
      startDate: new Date(0),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const limit = useAppSelector(getSellersLimit);
  const totalSellers = useAppSelector(getTotalSellers);
  const offset = useAppSelector(getSellersOffset);

  const dispatch = useAppDispatch();

  const handleClickPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    dispatch(sellersActions.setOffset((pageNumber - 1) * limit));
    dispatch(fetchAllSellers({}));
  };

  const fetchNext = () => {
    setCurrentPage((prev) => prev + 1);

    dispatch(fetchNextSellers());
  };

  const fetchPrev = () => {
    setCurrentPage((prev) => prev - 1);

    dispatch(fetchPrevSellers());
  };

  const sellers = useAppSelector(getSellers.selectAll);
  const isLoading = useAppSelector(getIsSellersLoading);

  const openSellerForm = (id: string) => {
    setCurrentSellerId(id);
    setIsSellerInfoOpen(true);
  };

  useEffect(() => {
    dispatch(fetchAllSellers({}));
  }, [dispatch, state]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!isSellerInfoOpen) {
    return (
      <div className="w-full">
        <div className="text-main-white bg-dark-grey rounded-2xl lg:p-4 w-full">
          <AdminManagingSellersNavbar dateState={state} setDateState={setState} />
          {!isLoading && (
            <>
              <table className="table-auto overflow-scroll w-full hidden lg:table">
                <thead>
                  <tr className="bg-selected-dark rounded-2xl">
                    <th className="!font-normal text-start p-[10px] text-lg w-[174px] rounded-l-2xl">
                      Імʼя продавця
                    </th>
                    <th className="!font-normal text-start p-[10px] text-lg w-[154px]">
                      ID Продавця
                    </th>
                    <th className="!font-normal text-start p-[10px] text-lg w-[174px]">
                      Email
                    </th>
                    <th className="!font-normal text-start p-[10px] text-lg w-[174px]">
                      Дата реєстрації
                    </th>
                    <th className="!font-normal text-center p-[10px] text-lg w-[162px]">
                      Статус
                    </th>
                    <th className="!font-normal p-[10px] text-start text-lg w-[100px] rounded-r-2xl">
                      Дії
                    </th>
                  </tr>
                </thead>

                <tbody className="text-md">
                  {sellers?.map((seller) => (
                    <tr
                      key={seller._id}
                      className="cursor-pointer !font-normal  text-start even:bg-selected-dark "
                    >
                      <th
                        onClick={() => {
                          copyToClipboard(seller?.username);
                        }}
                        className="cursor-pointer !font-normal text-start p-[10px] w-[174px] rounded-l-2xl relative group"
                      >
                        {seller?.username.slice(0, 12)}
                        {seller?.username?.length > 12 && (
                          <span className="absolute left-1/2 top-[40px] text-sm mt-1 p-2 bg-dark-grey text-main-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            {seller?.username}
                          </span>
                        )}
                      </th>
                      <th
                        onClick={() => {
                          copyToClipboard(seller?._id);
                        }}
                        className="cursor-pointer !font-normal text-start p-[10px] w-[154px] relative group"
                      >
                        {seller?._id?.slice(10, 24)}
                        <span className="absolute left-1/2 top-[40px] text-sm mt-1 p-2 bg-dark-grey text-main-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          {seller?._id}
                        </span>
                      </th>
                      <th
                        onClick={() => {
                          copyToClipboard(seller?.email);
                        }}
                        className="!font-normal text-start p-[10px] w-[174px] relative group"
                      >
                        {seller?.email?.slice(0, 12)}
                        {seller?.email?.length > 12 && (
                          <span className="absolute left-1/2 top-[40px] text-sm mt-1 p-2 bg-dark-grey text-main-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            {seller?.email}
                          </span>
                        )}
                      </th>
                      <th className="!font-normal text-start p-[10px] w-[174px]">
                        {seller?.created_at.slice(0, 10)}
                      </th>
                      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                      <th className="!font-normal p-[10px] text-lg w-[162px]">
                        <SellerStatusBadge status={seller.accountStatus} />
                      </th>
                      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                      <th className=" !font-normal  text-lg w-[100px]  rounded-r-2xl">
                        <AdminManagingSellersController
                          userId={seller._id}
                          sellerIsActive={seller.accountStatus}
                          openForm={() => {
                            openSellerForm(seller._id);
                            setCurrentSellerStatus(seller.accountStatus);
                          }}
                          openSellerActiveModal={() => {
                            setCurrentSellerId(seller._id);
                            setCurrentSellerName(seller.username);
                            setShowActiveSellerModal(true);
                          }}
                          openBanModal={() => {
                            setCurrentSellerId(seller._id);
                            setCurrentSellerName(seller.username);
                            setBanModalOpen(true);
                          }}
                        />
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile adaptive for table */}
              <div className="w-full lg:hidden flex flex-col gap-[12px]">
                {sellers?.map((seller) => (
                  <div
                    key={seller._id}
                    className="bg-selected-dark rounded-2xl p-[20px] flex flex-col gap-[8px]"
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center gap-[5px]">
                        <Icon
                          Svg={calendar}
                          fill="#C6C6C6"
                          className="w-[12px] h-[13px]"
                        />
                        <span className="text-disabled text-[14px] font-[400]">
                          {formatDate(seller?.created_at)}
                        </span>
                      </div>
                      <SellerStatusBadge status={seller.accountStatus} />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col text-[14px]">
                        <span>{seller?.username}</span>
                        <span>ID {seller?._id}</span>
                        <span>{seller?.email}</span>
                      </div>
                      <div>
                        <AdminManagingSellersController
                          userId={seller._id}
                          openForm={() => {
                            openSellerForm(seller._id);
                            setCurrentSellerStatus(seller.accountStatus);
                          }}
                          sellerIsActive={seller.accountStatus}
                          openSellerActiveModal={() => {
                            setCurrentSellerId(seller._id);
                            setCurrentSellerName(seller.username);
                            setShowActiveSellerModal(true);
                          }}
                          openBanModal={() => {
                            setCurrentSellerId(seller._id);
                            setCurrentSellerName(seller.username);
                            setBanModalOpen(true);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <Pagination
          dataLength={totalSellers}
          itemsPerPage={limit}
          currentPage={currentPage}
          setPage={handleClickPage}
          offset={offset}
          fetchNext={fetchNext}
          fetchPrev={fetchPrev}
        />

        {showActiveSellerModal && (
          <ActiveSellerModal
            sellerName={currentSellerName || ''}
            sellerId={currentSellerId || ''}
            onClose={() => setShowActiveSellerModal(false)}
          />
        )}

        {showBanSellerModal && (
          <BanSellerModal
            sellerName={currentSellerName || ''}
            sellerId={currentSellerId || ''}
            onClose={() => setShowBanSellerModal(false)}
          />
        )}

        {banModalOpen && (
          <BlockModal
            title="Ви впевнені?"
            text={`Ви дісно хочете заблокувати користувача ID${currentSellerId}?`}
            blockHandler={async () => {
              try {
                await $api.patch(`${ApiRoutes.USER}/${currentSellerId}/status`, {
                  accountStatus: 'blocked',
                });
              } catch (e) {
                // eslint-disable-next-line no-console
                console.log(e);
              } finally {
                dispatch(fetchAllSellers({}));
                setBanModalOpen(false);
                setShowBanSellerModal(true);
              }
            }}
            onClose={() => setBanModalOpen(false)}
          />
        )}
      </div>
    );
  }

  if (isSellerInfoOpen) {
    return (
      <SellerInfoForm
        closeForm={() => {
          setIsSellerInfoOpen(false);
        }}
        currentSellerStatus={currentSellerStatus}
        showActiveteForm={() => setShowActiveSellerModal(true)}
        sellerId={currentSellerId || ''}
      />
    );
  }
};

export default AdminManagingSellers;
