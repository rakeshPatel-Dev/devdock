import React from 'react';
import DevDockHome from './pages/Home';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pages/Login';

const App = () => {
  const location = useLocation();
  const showHeaderFooter = location.pathname !== '/login';

  return (
    <div>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<DevDockHome />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      {showHeaderFooter && <Footer />}
    </div>
  );
};

export default App;   