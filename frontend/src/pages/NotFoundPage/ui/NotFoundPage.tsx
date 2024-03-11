import React, { FC } from 'react';

import { ErrorPage } from '@/widgets/ErrorPage';

interface Props {}

const NotFoundPage: FC<Props> = () => {
  return (
    <div data-testid="NotFoundPage">
      <ErrorPage />
    </div>
  );
};

export default NotFoundPage;
