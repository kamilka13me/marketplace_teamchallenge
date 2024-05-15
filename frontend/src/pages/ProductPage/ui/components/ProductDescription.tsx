import { FC, useState } from 'react';

import { countDiscount, Product } from '@/enteties/Product';
import { quantityCalc } from '@/enteties/Product/ui/ProductCard/ProductCard';
import { Rating } from '@/enteties/Rating';
import { getUserAuthData, getUserWishlist, getWishlist } from '@/enteties/User';
import { $api } from '@/shared/api/api';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface Props {
  product: Product;
  rating: number;
  feedbackLength: number;
  size?: 'medium' | 'big';
}

const ProductDescription: FC<Props> = (props) => {
  const { product, rating, size = 'big', feedbackLength } = props;

  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserAuthData);

  const { wishlist } = useAppSelector(getWishlist);

  const handleWishClick = async () => {
    try {
      if (user) {
        setButtonIsDisabled(true);

        await $api.put(`${ApiRoutes.WISHLIST}/${product._id}`);

        dispatch(getUserWishlist({ _id: user._id }));
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error in WishHeartClick:', error);
    } finally {
      setButtonIsDisabled(false);
    }
  };

  return (
    <HStack className="bg-dark-grey p-4 rounded-2xl min-w-[343px] max-w-[646px] w-full lg:py-8 lg:h-[514px]">
      <div
        className={`${size === 'big' ? 'max-h-[80px]' : 'max-h-[52px]'} h-full w-full overflow-hidden`}
      >
        <Text
          Tag="h3"
          text={product?.name || ''}
          size="4xl"
          font="ibm-plex-sans"
          className={`text-ellipsis ${size === 'medium' ? '!text-xl !leading-[26px]' : ''} max-w-[310px] lg:max-w-full`}
          color="white"
        />
      </div>

      <VStack gap="4" align="center" className="mt-2 h-5">
        <Rating rating={rating} />
        <Text
          Tag="p"
          text={`${feedbackLength || 0} відгуків`}
          size="xs"
          color="gray-light"
          className="mt-2"
        />
      </VStack>

      {product?.condition && (
        <div className="bg-green px-2 rounded-lg mt-2.5 leading-[0px] py-[2px] lg:mt-3">
          <Text Tag="span" text={product?.condition || ''} size="xs" color="white" />
        </div>
      )}

      <VStack gap="1" className="mt-[14px]">
        <Text Tag="p" text="Бренд:" size="lg" color="white" />
        <Text Tag="span" text={product?.brand || 'Відсутній'} size="lg" color="white" />
      </VStack>

      <Text Tag="p" text={product?.description} size="md" color="gray-light" />

      <div className="mt-6">
        <VStack gap="4" align="center">
          <VStack gap="1" align="center" className="">
            <Text
              size="4xl"
              font="ibm-plex-sans"
              Tag="p"
              text={countDiscount(product?.price, product?.discount || 0).toString()}
              color="white"
              className=""
            />
            <Text
              size="2xl"
              font="ibm-plex-sans"
              Tag="span"
              text="грн"
              color="white"
              className="mt-1"
            />
          </VStack>

          {product?.discount ? (
            <HStack
              justify="center"
              align="center"
              className="rounded-lg bg-error-red px-1 h-[20px]"
            >
              <Text
                Tag="span"
                text={`- ${product?.discount}%`}
                size="xs"
                color="white"
                className="!leading-[0px]"
              />
            </HStack>
          ) : (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <></>
          )}
        </VStack>
        {product?.discount ? (
          <VStack gap="1" align="center" className="-mt-1">
            <Text
              size="md"
              font="ibm-plex-sans"
              Tag="p"
              text={product?.price.toFixed(0).toString() || ''}
              className="line-through font-semibold lg:text-lg"
              color="gray"
            />
            <Text font="ibm-plex-sans" size="md" Tag="span" text="грн" color="gray" />
          </VStack>
        ) : (
          <div className="h-[30px]" />
        )}
        <Text
          Tag="p"
          size="sm"
          text={quantityCalc(product?.quantity || 0).text}
          color={quantityCalc(product?.quantity || 0).color}
          className=""
        />
      </div>
      <Button
        variant="primary"
        disabled={buttonIsDisabled}
        onClick={() => handleWishClick()}
        className={`${wishlist?.includes(product?._id) ? '!bg-disabled' : ''} h-[52px] mt-6 w-full lg:max-w-[319px] ${size === 'big' && 'w-[319px]'}`}
      >
        {wishlist?.includes(product?._id) ? 'Прибрати з обраного' : 'Додати в обране'}
      </Button>
    </HStack>
  );
};

export default ProductDescription;
