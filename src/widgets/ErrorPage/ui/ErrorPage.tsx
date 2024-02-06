import { FC } from 'react';

import { Button } from '@/shared/ui/Button';

interface Props {}

const ErrorPage: FC<Props> = () => {
  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <>
      <p>Some Error</p>
      <Button onClick={reloadPage}>Reload</Button>
    </>
  );
};

export default ErrorPage;
