import { FC, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import { MainPage } from '@/pages/MainPage';

interface Props {}

const AppRouter: FC<Props> = () => {
  return (
    <Suspense fallback="Loading...">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/user" element={<>User Paqe</>} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
