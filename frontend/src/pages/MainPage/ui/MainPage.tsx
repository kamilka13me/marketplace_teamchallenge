import { FC } from 'react';

import {
  ProductSectionLayout,
  useGetNewProductsQuery,
  useGetPopularProductsQuery,
  useGetPromotionsProductsQuery,
} from '@/enteties/Product';
import { getUserAuthData, userActions } from '@/enteties/User';
import { getUserByCredentials } from '@/features/userAuth/model/services/getUserByCredentials';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Sidebar } from '@/widgets/Sidebar';
import SliderWidget from '@/widgets/Slider/ui/SliderWidget';

interface Props {}

const images: string[] = [
  'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
  'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
  'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
  'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
  'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
];

const MainPage: FC<Props> = () => {
  const user = useAppSelector(getUserAuthData);
  const newProduct = useGetNewProductsQuery({});
  const popularProduct = useGetPopularProductsQuery({});
  const promotionsProduct = useGetPromotionsProductsQuery({});

  const dispatch = useAppDispatch();
  const loginHandler = async () => {
    await dispatch(
      getUserByCredentials({
        email: 'user123@example.com',
        password: '12345678',
      }),
    );
  };

  return (
    <div data-testid="MainPage" className="mt-[100px]">
      <div>
        {user?.username}
        {!user ? (
          <Button variant="fill" onClick={loginHandler}>
            GET
          </Button>
        ) : (
          <Button variant="fill" onClick={() => dispatch(userActions.logout())}>
            Log out
          </Button>
        )}
      </div>

      <Container>
        <VStack justify="between" className="">
          <Sidebar />
          <SliderWidget images={images} />
        </VStack>
        <HStack gap="6" className="mt-10">
          <ProductSectionLayout
            isLoading={newProduct.isLoading}
            title="Новинки"
            products={newProduct.data}
          />
          <ProductSectionLayout
            isLoading={promotionsProduct.isLoading}
            title="Акційні пропозиції"
            products={promotionsProduct.data}
          />
          <ProductSectionLayout
            isLoading={popularProduct.isLoading}
            title="Популярні товари"
            products={popularProduct.data}
          />
        </HStack>
      </Container>
    </div>
  );
};

export default MainPage;
