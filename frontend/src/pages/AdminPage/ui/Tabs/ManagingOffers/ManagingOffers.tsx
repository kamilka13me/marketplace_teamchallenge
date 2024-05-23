import { FC, useState } from 'react';

import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { ListingByDate, ListingSort } from '@/widgets/ListingSort';
import ListingDataMap from '@/widgets/ListingSort/ui/components/ListingDataMap';

export interface SpecyfyingSortingProps {
  isCheckedAscending: boolean;
  isCheckedDescending: boolean;
  setIsCheckedAscending: (e: boolean) => void;
  setIsCheckedDescending: (e: boolean) => void;
}

const ManagingOffers: FC = () => {
  const [inputData, setInputData] = useState<string>('');
  const [isCheckedAscending, setIsCheckedAscending] = useState(false);
  const [isCheckedDescending, setIsCheckedDescending] = useState(false);

  return (
    <section className="lg:flex flex-col w-full lg:gap-4 bg-dark-grey lg:bg-transparent rounded-2xl hidden">
      <ListingSort />
      <HStack gap="4" className="p-4 bg-dark-grey rounded-2xl ">
        <ListingByDate
          setInputData={setInputData}
          isCheckedAscending={isCheckedAscending}
          isCheckedDescending={isCheckedDescending}
          setIsCheckedAscending={setIsCheckedAscending}
          setIsCheckedDescending={setIsCheckedDescending}
        />
        <table className="w-full border-separate border-spacing-0">
          <thead className="mb-1 bg-selected-dark rounded-2xl">
            <tr>
              <th aria-label="Дата" className="w-[125px] p-2.5 font-normal text-start">
                <Text Tag="span" text="Дата" size="lg" color="white"/>
              </th>
              <th
                aria-label="ID Продавця"
                className="w-[140px] p-2.5 font-normal text-start"
              >
                <Text Tag="span" text="ID Продавця" size="lg" color="white" />
              </th>
              <th
                aria-label="Назва товару"
                className="w-[259px] font-normal p-2.5 text-start"
              >
                <Text
                  Tag="span"
                  text="Назва товару"
                  size="lg"
                  color="white"
                  className="max-w-[220px] max-h-12 overflow-hidden whitespace-nowrap overflow-ellipsis "
                />
              </th>
              <th
                aria-label="ID Товару"
                className="w-[120px] font-normal p-2.5 text-start"
              >
                <Text Tag="span" text="ID Товару" size="lg" color="white" />
              </th>
              <th aria-label="Ціна" className="w-[140px] font-normal p-2.5 text-start">
                <Text Tag="span" text="Ціна" size="lg" color="white" />
              </th>
              <th aria-label="Дії" className="w-[70px] font-normal p-2.5 text-start">
                <Text Tag="span" text="Дії" size="lg" color="white" />
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {offers.map((offer) => (
              <tr className="h-[76px] mb-1 even:bg-selected-dark odd:bg-transparent rounded-2xl">
                <td aria-label="Дата" className="pl-2.5 rounded-l-2xl">
                  <Text Tag="p" text={offer.date} size="md" color="white" />
                </td>
                <td aria-label="ID Продавця" className="pl-2.5">
                  <Text Tag="p" text={offer.sellerId} size="md" color="white" />
                </td>
                <td aria-label="Назва товару" className="pl-2.5">
                  <Text
                    Tag="p"
                    text={offer.productName}
                    size="md"
                    color="white"
                  />
                </td>
                <td aria-label="ID Товару" className="pl-2.5">
                  <Text Tag="p" text={offer.productId} size="md" color="white" />
                </td>
                <td aria-label="Ціна" className="pl-2.5">
                  <Text Tag="p" text={offer.productPrice} size="md" color="white" />
                </td>
                <td aria-label="Дії" className="rounded-r-2xl">
                  <Icon
                    Svg={action}
                    width={40}
                    height={59}
                    className="rotate-90 cursor-pointer"
                    //   onClick={() => }
                  />
                </td>
              </tr>
            ))} */}
            {/* ********************************* */}
            {/* <tr className="h-[76px] mb-1 even:bg-selected-dark odd:bg-transparent rounded-2xl">
              <td aria-label="Дата" className="pl-2.5 rounded-l-2xl">
                <Text Tag="p" text="25.04.2024" size="md" color="white" />
              </td>
              <td aria-label="ID Продавця" className="pl-2.5">
                <Text Tag="p" text="395151287888" size="md" color="white" />
              </td>
              <td aria-label="Назва товару" className="pl-2.5">
                <Text
                  Tag="p"
                  text="Ноутбук Apple MacBook Air M1 8/256GB 2022"
                  size="md"
                  color="white"
                />
              </td>
              <td aria-label="ID Товару" className="pl-2.5">
                <Text Tag="p" text="39519889" size="md" color="white" />
              </td>
              <td aria-label="Ціна" className="pl-2.5">
                <Text Tag="p" text="46 228 грн" size="md" color="white" />
              </td>
              <td aria-label="Дії" className="rounded-r-2xl">
                <OfferController
                  editHandler={editHandler}
                  publishHandler={publishHandler}
                  rejectHandler={rejectHandler}
                  blockHandler={blockHandler}
                />
              </td>
            </tr> */}
            {/* ******************************************* */}
            <ListingDataMap id={inputData}
            isCheckedAscending={isCheckedAscending}
             isCheckedDescending={isCheckedDescending}
            />
          </tbody>
        </table>
      </HStack>
      {/* <Pagination
        dataLength={totalProducts}
        itemsPerPage={limit}
        currentPage={currentPage}
        setPage={handleClick}
        offset={offset}
        fetchPrev={fetchPrev}
        fetchNext={fetchNext}
      /> */}
    </section>
  );
};

export default ManagingOffers;
