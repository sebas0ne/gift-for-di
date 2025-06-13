// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import './styles/variables.css';

import CircularTextLoader from './components/common/CircularTextLoader';
import CountdownGate from './pages/CountdownGate';
import Home from './pages/Home/Home';
import About from './pages/About';

import CONSTANT from './utils/constant';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Router>
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
            <Route path="/about" element={<About />} />
          </Routes>
        )}
      </>
    </Router>
  );
}

export default App;
