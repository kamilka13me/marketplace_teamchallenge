import { FC } from 'react';

import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

const ManagingOffers: FC = () => {
  return (
    <section className="flex flex-col gap-4 w-full">
      <ul className="bg-dark-grey flex justify-between py-2 px-4 rounded-2xl">
        <li>
          <Text Tag="span" text="Всі" size="md" color="white" />
        </li>
        <li>
          <Text Tag="span" text="Опубліковані" size="md" color="white" />
        </li>
        <li>
          <Text Tag="span" text="Відхилені" size="md" color="white" />
        </li>
        <li>
          <Text Tag="span" text="Заблоковані" size="md" color="white" />
        </li>
      </ul>
      <HStack gap="4" className="p-4 bg-dark-grey rounded-2xl ">
        <VStack className="">
          <Text Tag="span" text="Сортування за" size="md" color="white" />
        </VStack>
        <table>
          <thead>
            <tr>
              <th aria-label="Дата">
                <Text Tag="span" text="Дата" size="lg" color="white" />
              </th>
              <th aria-label="ID Продавця">
                <Text Tag="span" text="ID Продавця" size="lg" color="white" />
              </th>
              <th aria-label="Назва товару">
                <Text Tag="span" text="Назва товару" size="lg" color="white" />
              </th>
              <th aria-label="ID Товару">
                <Text Tag="span" text="ID Товару" size="lg" color="white" />
              </th>
              <th aria-label="Ціна">
                <Text Tag="span" text="Ціна" size="lg" color="white" />
              </th>
              <th aria-label="Дії">
                <Text Tag="span" text="Дії" size="lg" color="white" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td aria-label="Дата">
                <Text Tag="p" text="placeholder" size="md" color="white" />
              </td>
              <td aria-label="ID Продавця">
                <Text Tag="p" text="placeholder" size="md" color="white" />
              </td>
              <td aria-label="Назва товару">
                <Text Tag="p" text="placeholder" size="md" color="white" />
              </td>
              <td aria-label="ID Товару">
                <Text Tag="p" text="placeholder" size="md" color="white" />
              </td>
              <td aria-label="Ціна">
                <Text Tag="p" text="placeholder" size="md" color="white" />
              </td>
              <td aria-label="Дії">
                <Text Tag="p" text="placeholder" size="md" color="white" />
              </td>
            </tr>
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
