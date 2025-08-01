import React from 'react';
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { AuthPage, DetailPage, MainPage, SearchPage } from '@pages';
import ProtectedRoute from 'routes/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>}>
            <Route path="/home" element={<MainPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/book/:id" element={<DetailPage />} />
          </Route>
          <Route path="/" element={<AuthPage />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
