import { FC, useEffect, useState } from 'react';

import { Button } from '@/shared/ui/Button';

interface Props {}

const BugButton: FC<Props> = () => {
  const [error, setError] = useState(false);

  const onThrow = () => setError(true);

  useEffect(() => {
    if (error) {
      throw new Error();
    }
  }, [error]);

  return <Button onClick={onThrow}>Throw Error</Button>;
};

export default BugButton;
