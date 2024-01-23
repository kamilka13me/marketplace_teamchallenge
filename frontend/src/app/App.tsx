import { FC } from 'react';

import { Button } from '@/shared/ui/Button';

const App: FC = () => {
  return (
    <>
      <Button>Click</Button>
      <h1 className="text-3xl font-bold underline text-violet-500">Hello world!</h1>
    </>
  );
};

export default App;
