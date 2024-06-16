import { useEffect, useState } from 'react';

import AdminSubscription from './component/AdminSubscription';

import { $api } from '@/shared/api/api';
import Cancel from '@/shared/assets/icons/cancel.svg?react';
import Exclamation from '@/shared/assets/icons/exclamation.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import { Icon } from '@/shared/ui/Icon';
import { ModalWindow } from '@/shared/ui/ModalWindow';
import Pagination from '@/shared/ui/Pagination/Pagination';
import { Text } from '@/shared/ui/Text';
import ListingSearchInput from '@/widgets/ListingSort/ui/components/ListingSearchInput';

export interface Seller {
  _id: string;
  sellerId: {
    _id: string;
  };
  generalName: string;
  subscribe: string;
}

export interface SellerRes {
  totalCount: number;
  sellers: Seller[];
}

const Finances = () => {
  const [inputData, setInputData] = useState<string>('');
  const [isTarifOpen, setIsTarifOpen] = useState<boolean>(false);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [close, setClose] = useState<boolean>(false);
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

  const createUrlQuery = (
    limit: number | undefined,
    offset: number | undefined,
    inputData: string | undefined,
  ) => {
    let url = `?`;

    if (limit) url += `limit=${limit}&`;
    if (offset) url += `offset=${offset}&`;
    if (inputData) url += `search=${inputData}&`;

    return url;
  };

  const [offset, setOffset] = useState(0);

  const limit = 7;
  const currentPage = offset / limit + 1;

  const { data, isLoading, refetch } = useAxios<SellerRes>(
    `${ApiRoutes.SELLER}${createUrlQuery(limit, offset, inputData.trim())}`,
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputData, offset]);

  const openTarifModal = (seller: Seller) => {
    setSelectedSeller(seller);
    setIsTarifOpen(true);
  };

  const fetchNext = () => setOffset(offset + limit);
  const fetchPrev = () => setOffset(offset - limit);
  const handleClickPage = (pageNumber: number) => setOffset(limit * (pageNumber - 1));

  const updateTariff = async (sellerId: string, newTariff: string) => {
    const API_URL = `${ApiRoutes.SELLER}/${sellerId}`;

    try {
      await $api.put(API_URL, { subscribe: newTariff });

      setIsTarifOpen(false);
      setSelectedSeller(null);
      setIsSuccessful(true);
      refetch();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Помилка під час оновлення тарифного плану:', error);
    }
  };

  const getTariffClass = (tariff: string): string => {
    const normalizedTariff = tariff.toLowerCase();

    switch (normalizedTariff) {
      case 'basic':
        return 'bg-selected-yellow';
      case 'standart':
        return 'bg-grey';
      case 'premium':
        return 'bg-secondary-yellow';
      default:
        return '';
    }
  };

  return (
    <div>
      <div className="bg-dark-grey px-4 py-[9px] rounded-2xl mb-5 flex justify-between">
        <h1 className="text-white text-[18px] flex items-center">Керування підписками</h1>
        <ListingSearchInput setInputData={(value) => setInputData(value)} />
      </div>
      <div className="bg-dark-grey rounded-2xl mb-5 w-[982px]">
        <ul className="text-white text-[18px] flex bg-selected-dark p-2 rounded-lg px-4">
          <li className="mr-[150px] text-center">Назва компанії</li>
          <li className="mr-[250px] text-center">ID</li>
          <li className="mr-[150px] text-center">Тарифний план</li>
          <li className="text-center">Дія</li>
        </ul>
        <ul>
          {isLoading && <li className="px-4 py-2 text-white text-center">Loading...</li>}
          {!isLoading &&
            data &&
            data.sellers &&
            data.sellers.length > 0 &&
            data.sellers.map((seller, index) => (
              <li
                key={seller._id}
                className={`px-4 py-2 flex ${index % 2 === 0 ? 'bg-dark-grey' : 'bg-selected-dark'}`}
              >
                <div className="flex gap-2 flex-1">
                  <div
                    className={`w-[64px] text-white flex justify-center rounded-lg px-[15px] py-3 ${
                      index % 2 === 0 ? 'bg-selected-dark' : 'bg-dark-grey'
                    }`}
                  >
                    <Text
                      Tag="p"
                      text={seller.generalName.charAt(0)}
                      size="4xl"
                      align="center"
                      color="white"
                    />
                  </div>
                  <p className="text-white flex items-center">{seller.generalName}</p>
                </div>
                <p className="text-white flex items-center flex-1">{seller._id}</p>
                <div className="flex items-center flex-1">
                  <div
                    className={`w-[136px] h-[30px] flex justify-center items-center rounded-lg ${getTariffClass(
                      seller.subscribe,
                    )}`}
                  >
                    {seller.subscribe}
                  </div>
                </div>
                <div className="flex items-center flex-2">
                  <button
                    type="button"
                    className="text-main hover:text-secondary-yellow focus:text-secondary-yellow text-sm border border-main hover:border-secondary-yellow focus:border-secondary-yellow px-4 py-1.5 w-[136px] h-[30px] rounded-lg"
                    onClick={() => openTarifModal(seller)}
                  >
                    Змінити тариф
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
      {isTarifOpen && selectedSeller && (
        <ModalWindow
          onCloseFunc={() => {
            setIsTarifOpen(false);
            setSelectedSeller(null);
          }}
          className="!bg-dark-grey rounded-2xl animate-open-forms-modal"
        >
          <div className="flex justify-end">
            <Icon
              Svg={Cancel}
              fill="white"
              onClick={() => {
                setIsTarifOpen(false);
                setSelectedSeller(null);
              }}
            />
          </div>

          <AdminSubscription
            close={close}
            setClose={setClose}
            seller={selectedSeller}
            onPlanSelect={(newPlan) => updateTariff(selectedSeller.sellerId._id, newPlan)}
          />
        </ModalWindow>
      )}

      {isSuccessful && (
        <ModalWindow
          onCloseFunc={() => setIsSuccessful(false)}
          className="bg-selected-dark rounded-2xl animate-open-forms-modal px-[24px] py-5"
        >
          <div className="flex justify-end mb-[18px]">
            <Icon Svg={Cancel} fill="white" onClick={() => setIsSuccessful(false)} />
          </div>
          <div className="flex justify-center mb-3">
            <Icon Svg={Exclamation} className="fill-secondary-yellow" />
          </div>
          <p className="text-disabled mb-7">Тарифний план змінено!</p>
        </ModalWindow>
      )}

      <Pagination
        dataLength={data?.totalCount || 0}
        itemsPerPage={limit}
        currentPage={currentPage}
        setPage={handleClickPage}
        offset={offset}
        fetchNext={fetchNext}
        fetchPrev={fetchPrev}
      />
    </div>
  );
};

export default Finances;
