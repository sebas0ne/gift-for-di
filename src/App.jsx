// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import './styles/variables.css';

import CircularTextLoader from './components/common/CircularTextLoader';
import CountdownGate from './pages/CountdownGate';
import Home from './pages/Home/Home';
import Movies from './pages/Movies';

import CONSTANT from './utils/constant';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
      <>
      {!showContent && (
          <CountdownGate
            targetDate={CONSTANT.birthdayDate}
            onComplete={() => setShowContent(true)}
          />
        )}

        {showContent && isLoading ? (
          <CircularTextLoader />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
          </Routes>
        )}
      </>
  );
}

export default App;
