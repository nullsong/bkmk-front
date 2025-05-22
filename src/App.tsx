import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.css'; 
import MainPage from './pages/MainPage';
import SearchPage from 'pages/search/SearchPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
