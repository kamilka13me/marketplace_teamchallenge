/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';

import AdminSubscription from './component/AdminSubscription';

import { $api } from '@/shared/api/api';
import Cancel from '@/shared/assets/icons/cancel.svg?react';
import action from '@/shared/assets/icons/edit.svg?react';
import Exclamation from '@/shared/assets/icons/exclamation.svg?react';
import Subs from '@/shared/assets/icons/subs.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';
import { Icon } from '@/shared/ui/Icon';
import { ModalWindow } from '@/shared/ui/ModalWindow';
import Pagination from '@/shared/ui/Pagination/Pagination';
import { HStack } from '@/shared/ui/Stack';
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showList, setShowList] = useState<boolean>(true);

  const createUrlQuery = (
    limit: number | undefined,
    offset: number | undefined,
    inputData: string | undefined,
  ) => {
    let url = `?`;

    if (limit) url += `limit=${limit}&`;
    if (offset) url += `offset=${offset}&`;
    if (inputData) url += `search=${inputData}`;

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
  }, [offset]);

  useEffect(() => {
    setOffset(0);
  }, [inputData]);

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
      setShowList(true);
      setActiveIndex(null);
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

  const toggleModal = (index: number) => {
    setActiveIndex(index);
  };

  const sellerIdRow = (sellerId: string | undefined) => {
    return (
      <div
        className="flex items-center cursor-pointer !font-normal text-start text-white rounded-l-2xl relative group"
        onClick={() => {
          navigator.clipboard.writeText(sellerId || '');
        }}
      >
        №{sellerId?.slice(0, 10).split('-').reverse().join('.')}
        <span className="absolute left-1/2 top-[40px] text-sm mt-1 p-2 bg-dark-grey text-main-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          {sellerId}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full">
      {showList && (
        <div>
          <div className="bg-dark-grey px-4 py-[9px] rounded-2xl mb-5 flex flex-col gap-5 justify-between lg:flex-row lg:gap-0">
            <h1 className="text-white text-[20px] lg:text-[18px] flex items-center">
              Керування підписками
            </h1>
            <ListingSearchInput setInputData={(value) => setInputData(value)} />
          </div>

          <div className="bg-dark-grey rounded-2xl mb-5 max-w-[1024px]">
            <div className="text-white text-[14px] lg:text-[18px] flex justify-between bg-selected-dark py-2 rounded-lg px-4">
              <span className="w-1/4 hidden lg:block whitespace-nowrap">
                Назва компанії
              </span>

              <div className="w-1/3 lg:w-1/4">
                <span className="hidden lg:flex justify-center">ID</span>
                <span className="flex lg:hidden whitespace-nowrap">ID та ім’я</span>
              </div>

              <div className="w-1/3 lg:w-1/4 text-center">
                <span className="pl-[60px] hidden lg:block whitespace-nowrap">
                  Тарифний план
                </span>
                <span className="lg:hidden">Тариф</span>
              </div>

              <span className="w-1/3 lg:w-1/4 text-end lg:text-center mr-[10px]">
                Дія
              </span>
            </div>

            <div>
              {isLoading && (
                <span className="px-4 py-2 text-white text-center">Loading...</span>
              )}
              {!isLoading &&
                data &&
                data.sellers &&
                data.sellers.length > 0 &&
                data.sellers.map((seller, index) => (
                  <div
                    key={seller._id}
                    className={`text-[12px] lg:text-[16px] px-4 py-2 flex justify-between ${index % 2 === 0 ? 'bg-dark-grey' : 'bg-selected-dark'}`}
                  >
                    <div className="flex gap-2">
                      <div
                        className={`hidden lg:flex w-[64px] text-white justify-center rounded-lg px-[15px] py-3 ${
                          index % 2 === 0 ? 'bg-selected-dark' : 'bg-dark-grey'
                        }`}
                      >
                        <Text
                          Tag="p"
                          text={seller.generalName.charAt(0).toUpperCase()}
                          size="4xl"
                          align="center"
                          color="white"
                        />
                      </div>

                      <div className="flex flex-col justify-center">
                        <div className="lg:hidden">{sellerIdRow(seller?._id)}</div>
                        <span className="text-disabled lg:text-white w-[110px] lg:w-[150px] whitespace-nowrap overflow-hidden overflow-ellipsis">
                          {seller.generalName}
                        </span>
                      </div>
                    </div>

                    <div className="hidden lg:flex">{sellerIdRow(seller?._id)}</div>

                    <div className="flex items-center">
                      <div
                        className={`w-[112px] lg:w-[136px] h-[24px] lg:h-[30px] text-[12px] lg:text-[16px] flex justify-center items-center rounded-lg ${getTariffClass(
                          seller.subscribe,
                        )}`}
                      >
                        {seller.subscribe}
                      </div>
                    </div>

                    <div className="flex items-center">
                      {window.innerWidth >= 1024 ? (
                        <button
                          type="button"
                          className="text-main hover:text-secondary-yellow focus:text-secondary-yellow text-sm border border-main hover:border-secondary-yellow focus:border-secondary-yellow px-4 py-1.5 w-[136px] h-[30px] rounded-lg"
                          onClick={() => openTarifModal(seller)}
                        >
                          Змінити тариф
                        </button>
                      ) : (
                        <div className="relative">
                          <Icon
                            Svg={action}
                            width={40}
                            height={59}
                            onClick={() => toggleModal(index)}
                            className="rotate-90 cursor-pointer"
                          />
                          {activeIndex === index && (
                            <HStack
                              justify="center"
                              className="py-3 px-2 bg-shadow-footer absolute right-[-17px] top-[-4px] z-10 rounded-lg w-[196px] h-[68px]"
                            >
                              <button
                                type="button"
                                className="text-main-dark text-sm border border-main hover:border-secondary-yellow focus:border-secondary-yellow px-4 py-1.5 w-[180px] h-[44px] rounded-lg bg-secondary-yellow flex items-center gap-2.5"
                                onClick={() => {
                                  openTarifModal(seller);
                                  setShowList(false);
                                }}
                              >
                                <Icon
                                  Svg={Subs}
                                  className="stroke-main-dark w-[25px] h-[25px]"
                                />
                                Змінити тариф
                              </button>
                            </HStack>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {isTarifOpen &&
        selectedSeller &&
        (window.innerWidth >= 1024 ? (
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
              onPlanSelect={(newPlan) =>
                updateTariff(selectedSeller.sellerId._id, newPlan)
              }
            />
          </ModalWindow>
        ) : (
          <AdminSubscription
            close={close}
            setClose={setClose}
            seller={selectedSeller}
            onPlanSelect={(newPlan) => updateTariff(selectedSeller.sellerId._id, newPlan)}
          />
        ))}

      {isSuccessful && (
        <ModalWindow
          onCloseFunc={() => setIsSuccessful(false)}
          className="bg-selected-dark rounded-2xl animate-open-forms-modal px-[24px] py-5"
        >
          <div className="flex justify-end mb-[18px]">
            <Icon Svg={Cancel} fill="white" onClick={() => setIsSuccessful(false)} />
          </div>
          <div className="flex justify-center mb-3">
            <Icon
              Svg={Exclamation}
              width={32}
              height={32}
              className="fill-secondary-yellow"
            />
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
