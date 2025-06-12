// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import './styles/variables.css';

import CircularTextLoader from './components/common/CircularTextLoader';
import Home from './pages/Home/Home';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Router>
      <div className="appContainer">
        {isLoading ? (
          <CircularTextLoader />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
