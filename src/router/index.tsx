import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const LazyHome = React.lazy(() => import('@/pages/home'));

export default function ElectronRouter() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path='/' element={<LazyHome />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
