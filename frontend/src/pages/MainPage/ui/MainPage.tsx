import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import SliderWidget from '../../../widgets/Slider/ui/SliderWidget';

import { ProductSectionLayout } from '@/enteties/Product';
import { getUserAuthData, userActions } from '@/enteties/User';
import { getUserByCredentials } from '@/features/userAuth/model/services/getUserByCredentials';
import {
  useGetNewProductsQuery,
  useGetPopularProductsQuery,
  useGetPromotionsProductsQuery,
} from '@/pages/ProductsPage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Sidebar } from '@/widgets/Sidebar';

interface Props {}

const MainPage: FC<Props> = () => {
  const navigate = useNavigate();

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
    navigate(0);
  };

  return (
    <div data-testid="MainPage" className="mt-[136px]">
      <div>
        {user?.username}
        {!user ? (
          <Button variant="fill" onClick={loginHandler}>
            GET
          </Button>
        ) : (
          <Button
            variant="fill"
            onClick={() => {
              dispatch(userActions.logout());
              navigate(0);
            }}
          >
            Log out
          </Button>
        )}
      </div>
      <Container>
        <VStack justify="between" align="center">
          <Sidebar />
          <SliderWidget />
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
