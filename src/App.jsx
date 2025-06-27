// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import './styles/variables.css';

import AnimatedLayout from './layouts/AnimatedLayout';
import AnimatedLayoutMenu from './layouts/AnimatedLayoutMenu';
import CircularTextLoader from './components/common/CircularTextLoader';
import CountdownGate from './pages/CountdownGate';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Gift from './pages/Gift';
import ThingsAboutYou from './pages/ThingsAboutYou';
import WhyILoveYou from './pages/WhyILoveYou';
import Timeline from './pages/Timeline';
import LoveMenu from './pages/LoveMenu';

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
            <Route path="/" element={<AnimatedLayout><Home /></AnimatedLayout>} />
            <Route path="/thingsAboutYou" element={<AnimatedLayoutMenu><ThingsAboutYou /></AnimatedLayoutMenu>} />
            <Route path="/movies" element={<AnimatedLayoutMenu><Movies /></AnimatedLayoutMenu>} />
            <Route path="/gift" element={<AnimatedLayoutMenu><Gift /></AnimatedLayoutMenu>} />
            <Route path="/whyILoveYou" element={<AnimatedLayoutMenu><WhyILoveYou /></AnimatedLayoutMenu>} />
            <Route path="/timeline" element={<AnimatedLayoutMenu transitionName="portal"><Timeline /></AnimatedLayoutMenu>} />
            <Route path="/loveMenu" element={<AnimatedLayoutMenu><LoveMenu /></AnimatedLayoutMenu>} />
          </Routes>
        )}
      </>
  );
}

export default App;
