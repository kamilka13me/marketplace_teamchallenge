import { FC } from 'react';

import { useParams } from 'react-router-dom';

interface Props {}

const ProductPage: FC<Props> = () => {
  const { id } = useParams<{ id: string }>();

  return <div>{id}</div>;
};

export default ProductPage;
