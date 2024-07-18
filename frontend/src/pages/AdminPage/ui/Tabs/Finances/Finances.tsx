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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showModal, setShowModal] = useState<boolean>(false);
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
      setShowModal(false);
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
    setShowModal((prevShowModal) => !prevShowModal);
  };

  return (
    <div className="w-full">
      {showList && (
        <div>
          <div className="bg-dark-grey px-4 py-[9px] rounded-2xl mb-5 flex flex-col gap-5 justify-between lg:flex-row lg:gap-0">
            <h1 className="text-white text-[18px] flex items-center">
              Керування підписками
            </h1>
            <ListingSearchInput setInputData={(value) => setInputData(value)} />
          </div>
          <div className="bg-dark-grey rounded-2xl mb-5 max-w-[1024px]">
            <ul className="text-white text-[18px] flex justify-between md:justify-start gap-10 xl:gap-[160px] lg:gap-[140px] bg-selected-dark py-2 rounded-lg px-4">
              <li className="flex gap-0 md:gap-[170px] lg:gap-[120px] xl:gap-[220px] mr-0 md:mr-10">
                <div className="hidden md:block text-center whitespace-nowrap">
                  Назва компанії
                </div>
                <div className="hidden md:flex justify-center lg:mr-text-center">ID</div>
                <div className="flex whitespace-nowrap md:hidden mr-1">ID та ім’я</div>
              </li>
              <li className="flex gap-6 md:gap-[120px] lg:gap-[120px] xl:gap-[160px]">
                <div className="text-center whitespace-nowrap hidden md:block">
                  Тарифний план
                </div>
                <div className="text-center whitespace-nowrap md:hidden">Тарифний</div>
                <div className="text-center">Дія</div>
              </li>
            </ul>

            <ul>
              {isLoading && (
                <li className="px-4 py-2 text-white text-center">Loading...</li>
              )}
              {!isLoading &&
                data &&
                data.sellers &&
                data.sellers.length > 0 &&
                data.sellers.map((seller, index) => (
                  <li
                    key={seller._id}
                    className={`px-4 py-2 flex ${index % 2 === 0 ? 'bg-dark-grey' : 'bg-selected-dark'}`}
                  >
                    <div className="flex gap-2 flex-1 border-[1px]">
                      <div
                        className={`hidden lg:flex w-[64px] mr-5 text-white justify-center rounded-lg px-[15px] py-3 ${
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
                      <div className="flex flex-col md:flex-row gap-2 md:gap-10 lg:gap-[85px] xl:gap-[150px]">
                        <p className="text-white flex flex-1 items-center w-[90px]">
                          {seller.generalName}
                        </p>
                        <th
                          className="flex items-center cursor-pointer !font-normal text-start text-white rounded-l-2xl relative group"
                          onClick={() => {
                            navigator.clipboard.writeText(seller?._id || '');
                          }}
                        >
                          №{seller._id.slice(0, 10).split('-').reverse().join('.')}
                          <span className="absolute left-1/2 top-[40px] text-sm mt-1 p-2 bg-dark-grey text-main-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            {seller?._id}
                          </span>
                        </th>
                      </div>
                    </div>
                    <div className="flex gap-5 md:gap-[100px] lg:gap-[120px] xl:gap-[150px]">
                      <div className="flex items-center">
                        <div
                          className={`w-[136px] h-[30px] flex justify-center items-center rounded-lg ${getTariffClass(
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
                          <>
                            <Icon
                              Svg={action}
                              width={40}
                              height={59}
                              onClick={() => toggleModal(index)}
                              className="lg:rotate-90 cursor-pointer"
                            />
                            {activeIndex === index && (
                              <HStack
                                justify="center"
                                className="py-3 px-2 bg-shadow-footer absolute left-[300px] md:left-[580px] lg:left-[580px] z-10 rounded-lg w-[196px] h-[68px]"
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
                                    className="fill-main-dark w-[25px] h-[25px] "
                                  />
                                  Змінити тариф
                                </button>
                              </HStack>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
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
