import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'; 
import { DetailPage, MainPage, SearchPage } from '@pages';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/book/:id" element={<DetailPage />} />
      </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
