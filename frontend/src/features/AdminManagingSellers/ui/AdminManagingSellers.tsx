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
import ActiveSellerModal from '@/features/AdminManagingSellers/ui/ActiveSellerModal';
import AdminManagingSellersController from '@/features/AdminManagingSellers/ui/AdminManagingSellersController';
import AdminManagingSellersNavbar from '@/features/AdminManagingSellers/ui/AdminManagingSellersNavbar';
import BanSellerModal from '@/features/AdminManagingSellers/ui/BanSellerModal';
import SellerInfoForm from '@/features/AdminManagingSellers/ui/SellerInfoForm';
import SellerStatusBadge from '@/features/AdminManagingSellers/ui/SellerStatusBadge';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { BlockModal } from '@/shared/ui/BlockModal';
import Pagination from '@/shared/ui/Pagination/Pagination';
import { IRangeDate } from '@/widgets/ListingSort/ui/components/ListingSearchCalendar';

const AdminManagingSellers: FC = () => {
  const [isSellerInfoOpen, setIsSellerInfoOpen] = useState(false);
  const [currentSellerId, setCurrentSellerId] = useState<string | null>(null);
  const [banModalOpen, setBanModalOpen] = useState(false);
  const [currentSellerName, setCurrentSellerName] = useState<string | null>(null);
  const [showBanSellerModal, setShowBanSellerModal] = useState(false);
  const [showActiveSellerModal, setShowActiveSellerModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [state, setState] = useState<IRangeDate[]>([
    {
      startDate: new Date(),
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

  if (!isSellerInfoOpen) {
    return (
      <div className="text-main-white bg-dark-grey rounded-2xl p-4 w-full">
        <AdminManagingSellersNavbar dateState={state} setDateState={setState} />
        {!isLoading && (
          <table className="table-auto overflow-scroll w-full hidden lg:inline">
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
            <tbody>
              {sellers?.map((seller) => (
                <tr
                  key={seller._id}
                  className="!font-normal  text-start even:bg-selected-dark "
                >
                  <th className="!font-normal text-start p-[10px] text-lg w-[174px]  rounded-l-2xl">
                    {seller?.username.slice(0, 12)}
                  </th>
                  <th className="!font-normal text-start p-[10px] text-lg w-[154px]">
                    {seller?._id?.slice(10, 24)}
                  </th>
                  <th className="relative !font-normal text-start p-[10px] text-lg w-[174px]">
                    {seller?.email?.slice(0, 12)}
                  </th>
                  <th className="!font-normal text-start p-[10px] text-lg w-[174px]">
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
                      openForm={() => openSellerForm(seller._id)}
                      openSellerActiveModal={() => {
                        setCurrentSellerId(seller._id);
                        setCurrentSellerName(seller.username);
                        setShowActiveSellerModal(true);
                      }}
                      openBanModal={() => {
                        setCurrentSellerId(seller._id);
                        setCurrentSellerName(seller.username);
                        setShowBanSellerModal(true);
                        setBanModalOpen(true);
                      }}
                    />
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}

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
        showActiveteForm={() => setShowActiveSellerModal(true)}
        sellerId={currentSellerId || ''}
      />
    );
  }
};

export default AdminManagingSellers;
