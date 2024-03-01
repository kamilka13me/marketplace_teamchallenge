import { FC } from 'react';

import { useParams } from 'react-router-dom';

import { ReactHelmet } from '@/shared/SEO';

interface Props {}

const ProductPage: FC<Props> = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <ReactHelmet link={`/product/${id}`} title={id} description="Product" noIndex />
      {id}
    </div>
  );
};

export default ProductPage;
