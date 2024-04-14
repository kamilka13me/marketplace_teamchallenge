import React, { FC, useEffect } from 'react';

// import { getSellerProductsPageIsLoading } from '@/features/managingProducts/model/selectors/sellerProductsPageSelectors';
import { fetchNextSellerProductsPage } from '@/features/managingProducts/model/services/fetchNextSellerProductsPage';
import { fetchSellerProductsList } from '@/features/managingProducts/model/services/getSellerProducts';
import { getSellerProducts } from '@/features/managingProducts/model/slice/sellerProductsSlice';
import edit from '@/shared/assets/icons/edit-2.svg?react';
import trashbin from '@/shared/assets/icons/trashbin.svg?react';
import { getRouteProduct } from '@/shared/const/routes';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Icon } from '@/shared/ui/Icon';
import { Image } from '@/shared/ui/Image';
import { Link } from '@/shared/ui/Link';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

const ManagingProducts: FC = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(getSellerProducts.selectAll);
  // const isLoading = useAppSelector(getSellerProductsPageIsLoading);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch(fetchSellerProductsList({}));
  }, [dispatch]);

  const fetchNext = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch(fetchNextSellerProductsPage());
  };

  return (
    <div className="w-full bg-dark-grey l">
      <table className="border-separate border-spacing-[20px] ">
        <thead className="">
          <tr className="">
            <th className="w-[44px]">
              <label htmlFor="all selector" className="relative" aria-label="checkbox">
                <input
                  type="checkbox"
                  className="peer relative appearance-none cursor-pointer w-6 h-6 border-[1px] border-light-grey rounded focus:outline-none"
                />
                <span className="absolute text-main-white transition-opacity opacity-0 left-[3px] -top-[7px] pointer-events-none peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 stroke-[0.1px]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </label>
            </th>
            <th className="w-[217px] !font-normal text-left p-4">Назва товару</th>
            <th className="w-[96px] !font-normal text-left p-4">Ціна</th>
            <th className="w-[142px] !font-normal text-left p-4">Термін акції</th>
            <th className="w-[111px] !font-normal text-left p-4">Кількість</th>
            <th className="w-[134px] !font-normal text-left p-4">Статус</th>
            <th className="w-[70px] !font-normal text-left p-4">Дії</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr className="" key={product._id}>
              <th>
                <label htmlFor="inputcheckbox" className="relative" aria-label="checkbox">
                  <input
                    type="checkbox"
                    className="peer relative appearance-none cursor-pointer w-6 h-6 border-[1px] border-light-grey rounded focus:outline-none"
                  />
                  <span className="absolute text-main-white transition-opacity opacity-0 left-[2.5px] -top-[6px] pointer-events-none peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 stroke-[0.1px]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </label>
              </th>
              <th className="!font-normal" aria-label="Назва товару">
                <VStack className="w-full" gap="2">
                  <div className="w-[68px] h-[68px]">
                    <Image width="100%" height="100%" src="/" alt="" />
                  </div>

                  <Link
                    to={getRouteProduct(`${product?._id}`)}
                    className="h-[44px] w-[141px] self-center overflow-hidden"
                  >
                    <Text
                      Tag="span"
                      text={product?.name}
                      size="md"
                      className="text-ellipsis text-left"
                      color="white"
                    />
                  </Link>
                </VStack>
              </th>
              <th className="!font-normal">{product?.price}</th>
              <th className="!font-normal" aria-label="Термін акції">
                <Text
                  Tag="p"
                  text={product?.discount_start.slice(0, 10)}
                  size="sm"
                  color="white"
                />
                <Text
                  Tag="p"
                  text={product?.discount_end.slice(0, 10)}
                  size="sm"
                  color="white"
                />
              </th>
              <th className="!font-normal">{product?.quantity}</th>
              <th className="!font-normal">Опубліковано</th>
              <th aria-label="Дії">
                <VStack gap="2">
                  <Icon Svg={edit} />
                  <Icon Svg={trashbin} />
                </VStack>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={fetchNext}>
        prev
      </button>
      <button type="button" onClick={fetchNext}>
        next
      </button>
    </div>
  );
};

export default ManagingProducts;
