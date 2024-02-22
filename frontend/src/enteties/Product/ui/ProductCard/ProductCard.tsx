import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import ProductCardSkeleton from './ProductCardSkeleton';

import { Product } from '@/enteties/Product';
import { getUserAuthData } from '@/enteties/User';
import { $api } from '@/shared/api/api';
import heart from '@/shared/assets/icons/heart.svg?react';
import { getRouteProduct } from '@/shared/const/routes';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Icon } from '@/shared/ui/Icon';
import { Image } from '@/shared/ui/Image';
import Link from '@/shared/ui/Link/Link';
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

  const user = useAppSelector(getUserAuthData);

  const handleWishHeartClick = async (id: string) => {
    if (user) {
      await $api.put(`/wishlist/${id}`);

      const res = await $api.get(`/users/${user?._id}`);

      localStorage.setItem('wishlist', res.data.user.wishlist);
    }
  };

  if (!product) {
    return <ProductCardSkeleton />;
  }

  return (
    <div className="relative w-[313px] h-[445px] p-4 rounded-2xl shadow-custom-base">
      {images.length > 0 ? (
        <Link
          to={getRouteProduct(`${_id}`)}
          className="line-clamp-2 text-[16px] !leading-[22.4px]"
        >
          <Image
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
              font="ibm-plex-sans"
              Tag="p"
              text={price.toString()}
              className="line-through text-[18px] font-semibold"
              color="gray"
            />
            <Text font="ibm-plex-sans" Tag="span" text="грн" color="gray" />
          </VStack>
        ) : (
          <div className="h-[40px]" />
        )}

        {/*  Main price */}
        <VStack gap="1" align="center" className="gap-1 ">
          <Text
            font="ibm-plex-sans"
            Tag="p"
            text={countDiscount(price, discount || 0).toString()}
            className="text-[32px]"
          />
          <Text font="ibm-plex-sans" Tag="span" text="грн" className="text-[24px]" />
        </VStack>

        {/*  Quantity */}
        <Text
          Tag="span"
          text={t(quantityCalc(quantity).text)}
          color={quantityCalc(quantity).color}
          className="mt-2 !leading-[17.64px]"
        />
      </div>

      {/*  Heart Icon */}
      <HStack className="absolute top-[24px] right-[24px]">
        <Icon
          clickable
          onClick={() => handleWishHeartClick(_id)}
          Svg={heart}
          className="!stroke-2 !stroke-gray-900"
        />
      </HStack>
    </div>
  );
};

export default ProductCard;
