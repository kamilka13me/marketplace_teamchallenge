import { FC, useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import MobileProductController from './MobileProductController';

import { countDiscount, deleteProductsById } from '@/enteties/Product';
import { ProductForm } from '@/features/createProduct';
import { ProductStatuses } from '@/features/managingProducts';
import {
  getSellerProductsPageIsLoading,
  getSellerProductsPageLimit,
  getSellerProductsPageOffset,
  getSellerProductsPageSortBy,
  getSellerProductsPageSortDirection,
  getTotalSellerProducts,
} from '@/features/managingProducts/model/selectors/sellerProductsPageSelectors';
import { fetchNextSellerProductsPage } from '@/features/managingProducts/model/services/fetchNextSellerProductsPage';
import { fetchPrevSellerProductsPage } from '@/features/managingProducts/model/services/fetchPrevSellerProductsPage';
import { fetchSellerProductsList } from '@/features/managingProducts/model/services/getSellerProducts';
import { initSellerProductsPage } from '@/features/managingProducts/model/services/initSellerProductsPage';
import {
  getSellerProducts,
  sellerProductsPageActions,
} from '@/features/managingProducts/model/slice/sellerProductsSlice';
import SellerProductStatusBadge from '@/features/managingProducts/ui/SellerProductStatusBadge';
import edit from '@/shared/assets/icons/edit-2.svg?react';
import plus from '@/shared/assets/icons/plus.svg?react';
import sortArrows from '@/shared/assets/icons/sort-arrows.svg?react';
import trashbin from '@/shared/assets/icons/trashbin.svg?react';
import { getRouteProduct } from '@/shared/const/routes';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Image } from '@/shared/ui/Image';
import { Link } from '@/shared/ui/Link';
import Pagination from '@/shared/ui/Pagination/Pagination';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

const ManagingProducts: FC = () => {
  const [selectedProductsIds, setSelectedProductsIds] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const products = useAppSelector(getSellerProducts.selectAll);
  const isLoading = useAppSelector(getSellerProductsPageIsLoading);
  const limit = useAppSelector(getSellerProductsPageLimit);
  const sortBy = useAppSelector(getSellerProductsPageSortBy);
  const sortDirection = useAppSelector(getSellerProductsPageSortDirection);
  const offset = useAppSelector(getSellerProductsPageOffset);
  const totalProducts = useAppSelector(getTotalSellerProducts);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setSelectedProductsIds([]);
    dispatch(sellerProductsPageActions.setOffset((pageNumber - 1) * limit));
  };

  const deleteByIdHandler = (ids: string[]) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProductsById(ids))
        .unwrap()
        .then(() => {
          dispatch(fetchSellerProductsList({ replace: true }));
        })
        .catch(() => {});
      setSelectedProductsIds([]);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsFormOpen(false);
  }, []);

  useEffect(() => {
    dispatch(initSellerProductsPage(searchParams));
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(fetchSellerProductsList({}));
  }, [dispatch, offset, sortBy, sortDirection]);

  const fetchNext = () => {
    setCurrentPage((prev) => prev + 1);
    setSelectedProductsIds([]);

    dispatch(fetchNextSellerProductsPage());
  };

  const fetchPrev = () => {
    setCurrentPage((prev) => prev - 1);
    setSelectedProductsIds([]);

    dispatch(fetchPrevSellerProductsPage());
  };

  const renderProducts = () => {
    if (windowWidth >= 1024) {
      return (
        <table className="border-separate border-spacing-y-1">
          <thead className="bg-selected-dark">
            <tr className="">
              <th className="w-[64px]">
                <label htmlFor="all selector" className="relative" aria-label="checkbox">
                  <input
                    checked={selectedProductsIds.length > 0}
                    type="checkbox"
                    className="peer relative appearance-none cursor-pointer w-6 h-6 border-[1px] border-light-grey rounded focus:outline-none"
                    onChange={(e) => {
                      if (e.target.checked) {
                        const allProductIds = products.map((product) => product._id);

                        setSelectedProductsIds(allProductIds);
                      } else {
                        setSelectedProductsIds([]);
                      }
                    }}
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
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th className="w-[237px] !font-normal text-left px-[10px] py-4">
                <VStack align="center" gap="1">
                  <Text Tag="p" text="Назва товару" size="lg" color="white" />
                  <Icon
                    Svg={sortArrows}
                    width={11}
                    height={11}
                    className="mt-1 cursor-pointer"
                    onClick={() => {
                      dispatch(sellerProductsPageActions.setSortBy('name'));
                      dispatch(
                        sellerProductsPageActions.setSortDirection(
                          sortDirection === '-1' ? '1' : '-1',
                        ),
                      );
                    }}
                  />
                </VStack>
              </th>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th className="w-[116px] !font-normal text-left px-[10px] py-4 ">
                <VStack align="center" gap="1">
                  <Text Tag="p" text="Ціна" size="lg" color="white" />
                  <Icon
                    Svg={sortArrows}
                    width={11}
                    height={11}
                    className="mt-1 cursor-pointer"
                    onClick={() => {
                      dispatch(sellerProductsPageActions.setSortBy('price'));
                      dispatch(
                        sellerProductsPageActions.setSortDirection(
                          sortDirection === '-1' ? '1' : '-1',
                        ),
                      );
                    }}
                  />
                </VStack>
              </th>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th className="w-[162px] !font-normal text-left px-[10px] py-4 ">
                <VStack align="center" gap="1">
                  <Text
                    Tag="p"
                    text="Термін акції"
                    size="lg"
                    color="white"
                    className="whitespace-nowrap"
                  />
                  <Icon
                    Svg={sortArrows}
                    width={11}
                    height={11}
                    className="mt-1 cursor-pointer"
                    onClick={() => {
                      dispatch(sellerProductsPageActions.setSortBy('discount_start'));
                      dispatch(
                        sellerProductsPageActions.setSortDirection(
                          sortDirection === '-1' ? '1' : '-1',
                        ),
                      );
                    }}
                  />
                </VStack>
              </th>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th className="w-[131px] !font-normal text-left px-[10px] py-4">
                <VStack align="center" gap="1">
                  <Text Tag="p" text="Кількість" size="lg" color="white" />
                  <Icon
                    Svg={sortArrows}
                    width={11}
                    height={11}
                    className="mt-1 cursor-pointer"
                    onClick={() => {
                      dispatch(sellerProductsPageActions.setSortBy('quantity'));
                      dispatch(
                        sellerProductsPageActions.setSortDirection(
                          sortDirection === '-1' ? '1' : '-1',
                        ),
                      );
                    }}
                  />
                </VStack>
              </th>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th className="w-[154px] !font-normal text-left px-[10px] py-4">
                <Text Tag="p" text="Статус" size="lg" color="white" />
              </th>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th className="w-[90px] !font-normal text-left px-[10px] py-4">
                <Text Tag="p" text="Дії" size="lg" color="white" />
              </th>
            </tr>
          </thead>
          {isLoading ? (
            <>...</>
          ) : (
            <tbody>
              {products?.map((product) => {
                return (
                  <tr
                    className="even:bg-selected-dark odd:bg-transparent"
                    key={product._id}
                  >
                    <th className="">
                      <label
                        htmlFor="inputcheckbox"
                        className="relative"
                        aria-label="checkbox"
                      >
                        <input
                          checked={selectedProductsIds.includes(product._id)}
                          type="checkbox"
                          className="peer relative appearance-none cursor-pointer w-6 h-6 border-[1px] border-light-grey rounded focus:outline-none"
                          onChange={() => {
                            const productId = product._id;

                            setSelectedProductsIds((prevIds) =>
                              prevIds.includes(productId)
                                ? prevIds.filter((id) => id !== productId)
                                : [...prevIds, productId],
                            );
                          }}
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
                    <th
                      className="!font-normal px-[10px] text-left"
                      aria-label="Назва товару"
                    >
                      <VStack className="w-full" gap="2">
                        <div className="relative flex justify-center items-center w-[68px] h-[68px]">
                          {product.discount && product.discount !== 0 ? (
                            <div className="absolute right-0 top-0 bg-error-red rounded-2xl px-1">
                              <Text
                                Tag="span"
                                text="Sale"
                                size="xs"
                                color="white"
                                className="leading-[0px]"
                              />
                            </div>
                          ) : (
                            // eslint-disable-next-line react/jsx-no-useless-fragment
                            <></>
                          )}
                          <Image
                            width="68px"
                            height="68px"
                            src={`${product?.images[0]}`}
                            alt="product-card"
                          />
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
                    <th className="!font-normal px-[10px] text-left ">
                      <HStack>
                        {product?.discount && product?.discount !== 0 ? (
                          <VStack gap="1" align="center" className="mt-1">
                            <Text
                              size="md"
                              Tag="p"
                              text={countDiscount(product.price, product.discount)}
                              color="white"
                            />
                            <Text
                              font="ibm-plex-sans"
                              size="md"
                              Tag="span"
                              text="грн"
                              color="white"
                            />
                          </VStack>
                        ) : (
                          // eslint-disable-next-line react/jsx-no-useless-fragment
                          <></>
                        )}
                        <VStack gap="1" align="center">
                          <Text
                            size={`${product?.discount && product?.discount !== 0 ? 'sm' : 'md'}`}
                            Tag="p"
                            text={product?.price.toString() || ''}
                            className={`${product?.discount && product?.discount !== 0 && 'line-through'}`}
                            color={`${product?.discount && product?.discount !== 0 ? 'gray' : 'white'}`}
                          />
                          <Text
                            size={`${product?.discount && product?.discount !== 0 ? 'sm' : 'md'}`}
                            font="ibm-plex-sans"
                            Tag="span"
                            text="грн"
                            color={`${product?.discount && product?.discount !== 0 ? 'gray' : 'white'}`}
                          />
                        </VStack>
                      </HStack>
                    </th>
                    <th
                      className="!font-normal px-[10px] text-left"
                      aria-label="Термін акції"
                    >
                      {product?.discount && product?.discount !== 0 ? (
                        <>
                          <Text
                            Tag="p"
                            text={product?.discount_start?.slice(0, 10)}
                            size="sm"
                            color="white"
                          />
                          <Text
                            Tag="p"
                            text={product?.discount_end?.slice(0, 10)}
                            size="sm"
                            color="white"
                          />
                        </>
                      ) : (
                        <Text Tag="p" text="Відсутній" size="md" color="gray-light" />
                      )}
                    </th>
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <th className="!font-normal px-[10px] text-left">
                      <Text
                        size="md"
                        Tag="p"
                        text={product?.quantity.toString()}
                        className=""
                        color="white"
                      />
                    </th>
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <th className="!font-normal px-[10px] text-left">
                      <SellerProductStatusBadge
                        status={product?.status as ProductStatuses}
                      />
                    </th>
                    <th aria-label="Дії" className="px-[10px] text-left">
                      <VStack gap="2">
                        <Icon Svg={edit} className="cursor-pointer" />
                        <Icon
                          Svg={trashbin}
                          className="cursor-pointer"
                          onClick={() => deleteByIdHandler([product?._id])}
                        />
                      </VStack>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      );
    }

    return (
      <>
        <VStack gap="1" className="pb-2 mb-6 overflow-x-auto ">
          <VStack
            align="center"
            className={`h-8 gap-[6px] py-[7px] px-2.5 rounded-lg ${sortBy === 'name' && 'bg-selected-dark'} `}
          >
            <Text Tag="p" text="Назва товару" size="sm" color="white" />
            <Icon
              Svg={sortArrows}
              width={16}
              height={16}
              className="cursor-pointer "
              onClick={() => {
                dispatch(sellerProductsPageActions.setSortBy('name'));
                dispatch(
                  sellerProductsPageActions.setSortDirection(
                    sortDirection === '-1' ? '1' : '-1',
                  ),
                );
              }}
            />
          </VStack>
          <VStack
            align="center"
            className={`h-8 gap-[6px] py-[7px] px-2.5 rounded-lg ${sortBy === 'price' && 'bg-selected-dark'} `}
          >
            <Text Tag="p" text="Ціна" size="sm" color="white" />
            <Icon
              Svg={sortArrows}
              width={16}
              height={16}
              className="cursor-pointer"
              onClick={() => {
                dispatch(sellerProductsPageActions.setSortBy('price'));
                dispatch(
                  sellerProductsPageActions.setSortDirection(
                    sortDirection === '-1' ? '1' : '-1',
                  ),
                );
              }}
            />
          </VStack>
          <VStack
            align="center"
            className={`h-8 gap-[6px] py-[7px] px-2.5 rounded-lg ${sortBy === 'discount_start' && 'bg-selected-dark'} `}
          >
            <Text
              Tag="p"
              text="Термін акції"
              size="sm"
              color="white"
              className="whitespace-nowrap"
            />
            <Icon
              Svg={sortArrows}
              width={16}
              height={16}
              className="cursor-pointer"
              onClick={() => {
                dispatch(sellerProductsPageActions.setSortBy('discount_start'));
                dispatch(
                  sellerProductsPageActions.setSortDirection(
                    sortDirection === '-1' ? '1' : '-1',
                  ),
                );
              }}
            />
          </VStack>
          <VStack
            align="center"
            className={`h-8 gap-[6px] py-[7px] px-2.5 rounded-lg ${sortBy === 'quantity' && 'bg-selected-dark'} `}
          >
            <Text Tag="p" text="Кількість" size="sm" color="white" />
            <Icon
              Svg={sortArrows}
              width={16}
              height={16}
              className="cursor-pointer"
              onClick={() => {
                dispatch(sellerProductsPageActions.setSortBy('quantity'));
                dispatch(
                  sellerProductsPageActions.setSortDirection(
                    sortDirection === '-1' ? '1' : '-1',
                  ),
                );
              }}
            />
          </VStack>
        </VStack>
        <HStack gap="2">
          {products?.map((product) => (
            <HStack
              align="center"
              className="py-3 px-4 rounded-2xl bg-selected-dark"
              key={product._id}
            >
              <SellerProductStatusBadge status="blocked" />
              <VStack align="center">
                <label htmlFor="inputcheckbox" className="relative" aria-label="checkbox">
                  <input
                    checked={selectedProductsIds.includes(product._id)}
                    type="checkbox"
                    className="peer relative appearance-none cursor-pointer w-6 h-6 border-[1px] border-light-grey rounded focus:outline-none"
                    onChange={() => {
                      const productId = product._id;

                      setSelectedProductsIds((prevIds) =>
                        prevIds.includes(productId)
                          ? prevIds.filter((id) => id !== productId)
                          : [...prevIds, productId],
                      );
                    }}
                  />
                  <span className="absolute text-main-white transition-opacity opacity-0 left-0.5 bottom-1 pointer-events-none peer-checked:opacity-100">
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
                <div className="relative flex items-center w-[60px] h-[60px]">
                  {product.discount && product.discount !== 0 ? (
                    <div className="absolute right-1 top-0 h-3 w-6 bg-error-red rounded-lg ">
                      <Text
                        Tag="span"
                        text="Sale"
                        size="xxs"
                        color="white"
                        className="absolute right-1 top-[1px] leading-[10px] text-[8px]"
                      />
                    </div>
                  ) : (
                    // eslint-disable-next-line react/jsx-no-useless-fragment
                    <></>
                  )}
                  <Image
                    width="68px"
                    height="68px"
                    src={`${product?.images[0]}`}
                    alt="product-card"
                  />
                </div>
                <HStack>
                  <Link
                    to={getRouteProduct(`${product?._id}`)}
                    className="h-[44px] w-[160px] mb-1.5 text-wrap self-center overflow-hidden"
                  >
                    <Text
                      Tag="span"
                      text={product?.name}
                      size="sm"
                      className=" text-left"
                      color="white"
                    />
                  </Link>
                  <HStack className="mb-0.5">
                    {product?.discount && product?.discount !== 0 && (
                      <VStack gap="1" align="center">
                        <Text
                          size="sm"
                          Tag="p"
                          text={countDiscount(product.price, product.discount)}
                          color="white"
                        />
                        <Text
                          font="ibm-plex-sans"
                          size="sm"
                          Tag="span"
                          text="грн"
                          color="white"
                        />
                      </VStack>
                    )}
                    <VStack gap="1" align="center">
                      <Text
                        size="sm"
                        Tag="p"
                        text={product?.price.toString()}
                        className={`${product?.discount && product?.discount !== 0 && 'line-through'}`}
                        color={`${product?.discount && product?.discount !== 0 ? 'gray' : 'white'}`}
                      />
                      <Text
                        size="sm"
                        font="ibm-plex-sans"
                        Tag="span"
                        text="грн"
                        color={`${product?.discount && product?.discount !== 0 ? 'gray' : 'white'}`}
                      />
                    </VStack>
                  </HStack>
                  <Text
                    size="xs"
                    Tag="p"
                    text={`${product?.quantity.toString()} шт`}
                    className=""
                    color="white"
                  />
                  {product?.discount && product?.discount !== 0 && (
                    <Text
                      size="xs"
                      Tag="p"
                      text={`Термін акції ${product?.discount_start?.slice(0, 10)} - ${product?.discount_end?.slice(0, 10)}`}
                      className="!text-[8px]"
                      color="white"
                    />
                  )}
                </HStack>
                <MobileProductController
                  product={product}
                  editHandler={() => setIsFormOpen(true)}
                  deleteHandler={deleteByIdHandler}
                />
              </VStack>
            </HStack>
          ))}
        </HStack>
      </>
    );
  };

  return isFormOpen ? (
    <ProductForm />
  ) : (
    <HStack className="w-full">
      <div className="w-full bg-dark-grey rounded-2xl lg:px-4 lg:py-5 ">
        <VStack
          justify="between"
          align="center"
          className="flex-row-reverse mb-3 pt-[18px] lg:mb-1 lg:py-4 lg:pl-[38px] lg:pr-[10px] lg:flex-row "
        >
          <Button
            disabled={selectedProductsIds?.length === 0}
            variant="clear"
            className="disabled:invisible"
            onClick={() => deleteByIdHandler(selectedProductsIds)}
          >
            <Text
              Tag="span"
              text="Видалити вибране"
              size="md"
              color="white"
              className="underline lg:no-underline "
            />
          </Button>
          <Button
            variant="primary"
            className="flex items-center gap-2 h-[38px]"
            onClick={() => setIsFormOpen(true)}
          >
            <Icon Svg={plus} width={12} height={12} />
            <Text Tag="span" text="Додати продукт" size="sm" />
          </Button>
        </VStack>

        <div className="w-full lg:h-[450px] ">{renderProducts()}</div>
      </div>
      <Pagination
        dataLength={totalProducts}
        itemsPerPage={limit}
        currentPage={currentPage}
        setPage={handleClick}
        offset={offset}
        fetchPrev={fetchPrev}
        fetchNext={fetchNext}
      />
    </HStack>
  );
};

export default ManagingProducts;
