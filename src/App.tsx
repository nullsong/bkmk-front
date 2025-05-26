import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.css'; 
import MainPage from './pages/MainPage';
import SearchPage from 'pages/search/SearchPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
