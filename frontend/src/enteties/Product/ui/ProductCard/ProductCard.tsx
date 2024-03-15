import { FC, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Product } from '../../model/types/product';

import ProductCardSkeleton from './ProductCardSkeleton';

import { getUserAuthData, getUserWishlist, getWishlist } from '@/enteties/User';
import { $api } from '@/shared/api/api';
import heart from '@/shared/assets/icons/heart.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { getRouteProduct } from '@/shared/const/routes';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Image } from '@/shared/ui/Image';
import { Link } from '@/shared/ui/Link';
import { Skeleton } from '@/shared/ui/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextColors } from '@/shared/ui/Text';

interface quantityResult {
  text: string;
  color: TextColors;
}

const quantityCalc = (quantity: number): quantityResult => {
  if (quantity > 5) {
    return {
      text: 'Є в наявності',
      color: 'green',
    };
  }
  if (quantity <= 5 && quantity > 0) {
    return {
      text: 'Закінчується',
      color: 'orange',
    };
  }

  return {
    text: 'Немає в наявності',
    color: 'red',
  };
};

const countDiscount = (value: number, percentage: number): string => {
  if (percentage === 100) {
    return '0';
  }

  return (value - Math.round((value * percentage) / 100)).toFixed(2);
};

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = (props) => {
  const { t } = useTranslation();

  const { product } = props;

  const { _id, name, discount, images, price, quantity } = product;

  const [heartIsDisabled, setHeartIsDisabled] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserAuthData);

  const { wishlist } = useAppSelector(getWishlist);

  const handleWishHeartClick = async () => {
    try {
      if (user) {
        setHeartIsDisabled(true);

        await $api.put(`${ApiRoutes.WISHLIST}/${_id}`);

        dispatch(getUserWishlist({ _id: user._id }));
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error in WishHeartClick:', error);
    } finally {
      setHeartIsDisabled(false);
    }
  };

  if (!product) {
    return <ProductCardSkeleton />;
  }

  return (
    <div className="relative w-[313px] h-[445px] p-4 rounded-2xl shadow-custom-base hover:shadow-custom-hover duration-75">
      {images.length > 0 ? (
        <Link
          to={getRouteProduct(`${_id}`)}
          className="line-clamp-2 text-[16px] !leading-[22.4px]"
        >
          <Image
            loadingFallback={<Skeleton width={281} height={252} />}
            src={`${process.env.BASE_URL}${images[0]}`}
            alt="product-card-img"
            className="!h-[252px] !w-[281px]"
          />
        </Link>
      ) : (
        <Link
          to={getRouteProduct(`${_id}`)}
          className="line-clamp-2 text-[16px] !leading-[22.4px]"
        >
          <Image src="" alt="product-card-img" className="!h-[252px] !w-[281px]" />
        </Link>
      )}

      <div className="mt-2">
        {/* Name */}
        <div className="h-[44px] ">
          <Link
            to={getRouteProduct(`${_id}`)}
            className="line-clamp-2 text-[16px] !leading-[22.4px]"
          >
            {name}
          </Link>
        </div>

        {/*  Check discount */}
        {discount ? (
          <VStack gap="1" align="center" className="mt-1">
            <Text
              size="lg"
              font="ibm-plex-sans"
              Tag="p"
              text={price.toString()}
              className="line-through font-semibold"
              color="gray"
            />
            <Text font="ibm-plex-sans" size="sm" Tag="span" text="грн" color="gray" />
          </VStack>
        ) : (
          <div className="h-[40px]" />
        )}

        {/*  Main price */}
        <VStack gap="1" align="center" className="gap-1 ">
          <Text
            size="4xl"
            font="ibm-plex-sans"
            Tag="p"
            text={countDiscount(price, discount || 0).toString()}
            className={`${discount && 'text-red'}`}
          />
          <Text
            size="2xl"
            font="ibm-plex-sans"
            Tag="span"
            text="грн"
            className={` ${discount && 'text-red'}`}
          />
        </VStack>

        {/*  Quantity */}
        <Text
          Tag="span"
          size="sm"
          text={t(quantityCalc(quantity).text)}
          color={quantityCalc(quantity).color}
          className="mt-2"
        />
      </div>

      {/*  Heart Icon */}
      <HStack className="absolute top-[24px] right-[24px]">
        <Button
          variant="clear"
          disabled={heartIsDisabled}
          onClick={() => handleWishHeartClick()}
        >
          <Icon
            Svg={heart}
            className={`${wishlist?.includes(_id) ? 'fill-secondary' : '!stroke-2 !stroke-gray-900'}  ${heartIsDisabled && 'opacity-40'}`}
          />
        </Button>
      </HStack>
    </div>
  );
};

export default ProductCard;
