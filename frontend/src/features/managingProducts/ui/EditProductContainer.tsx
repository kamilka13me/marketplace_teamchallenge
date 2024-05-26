import { FC } from 'react';

import { SellerProduct } from '@/enteties/Product';
import { ProductForm } from '@/features/createProduct';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import useAxios from '@/shared/lib/hooks/useAxios';

interface Props {
  productId: string;
  closeForm: () => void;
}

interface ApiResponse {
  product: SellerProduct;
}

const EditProductContainer: FC<Props> = (props) => {
  const { productId, closeForm } = props;

  const { data, isLoading } = useAxios<ApiResponse>(`${ApiRoutes.PRODUCTS}/${productId}`);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProductForm
        onCloseForm={closeForm}
        product={data?.product || ({} as SellerProduct)}
      />
    </div>
  );
};

export default EditProductContainer;
