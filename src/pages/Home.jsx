// src/pages/Home/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Heart, Star, Image, Moon, HandHeart, CalendarDays, AlignJustify } from 'lucide-react';
import DaysTogether from '../components/common/DaysTogether';

import BackgroundAnimation from '../components/animations/BackgroundAnimation';
import FloatingParticles from '../components/effects/FloatingParticles';
import EffectMessage from '../components/effects/EffectMessage';
import PolaroidDisplay from '../components/common/PolaroidDisplay';

import CONSTANT from '../utils/constant';
import '../styles/Pages/Home/Home.css';

function Home() {
  const [showButtons, setShowButtons] = useState(false);
  const [heartbeat, setHeartbeat] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [activeEffect, setActiveEffect] = useState(null);
  const [magicMode, setMagicMode] = useState(false);
  const [showElement, setShowElement] = useState(false);
  const [showPolaroid, setShowPolaroid] = useState(false);
  const [showDaysText, setShowDaysText] = useState(() => {
    const storedDate = localStorage.getItem('showTextDaysDate');
    const today = new Date().toLocaleDateString('sv-SE');
    return storedDate === today;
  });
  const navigate = useNavigate();

  const handleShowPolaroid = () => {
    setShowElement(true);
    setShowMessage(true);
    setShowPolaroid(true);
  };

  const handleOnClosePolaroid = () => {
    setShowPolaroid(false)
    setShowElement(false);
    setShowMessage(false);
  }

  const toggleButtons = () => {
    setShowButtons((prev) => !prev);
  };

  const handleHeartbeat = () => {
    setHeartbeat(true);
    setShowElement(true);

    setTimeout(() => {
      setHeartbeat(false);
      setShowElement(false);
    }, 3000);
  };

  const handleHeartbeatEffect = () => {
    setShowMessage(true);
    setActiveEffect('hearts');

    setTimeout(() => {
      setActiveEffect(null);
      setShowMessage(false);
    }, 6000);
  };

  const handleStarWish = () => {
    setShowMessage(true);
    setActiveEffect('stars');
    
    setTimeout(() => {
      setActiveEffect(null);
      setShowMessage(false);
    }, 6000);
  };

  const handleMagicMode = () => {
    setMagicMode(!magicMode);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleRevealDays = () => {
    const today = new Date().toLocaleDateString('sv-SE');
    localStorage.setItem('showTextDaysDate', today);
    setShowDaysText(true);
  };

  const listButtonIcons = [
    { icon: <HandHeart size={20} />, label: 'HandHeart', onClick: handleHeartbeatEffect },
    { icon: <Star size={20} />, label: 'Star', onClick: handleStarWish },
    { icon: <Image size={20} />, label: 'Image', onClick: handleShowPolaroid },
    { icon: <Moon size={20} />, label: 'Moon', onClick: handleMagicMode },
  ];

  return (
      <div className={`homeContainer ${heartbeat ? 'heartbeat' : ''} ${magicMode ? 'magic-mode' : ''}`}>

      {!showElement && <BackgroundAnimation />}

        {activeEffect === 'hearts' && <FloatingParticles type="hearts" count={80} />}
        {activeEffect === 'stars' && <FloatingParticles type="stars" count={100} />}

        <div className={`homeFooter ${showElement ? 'hiddenText' : ''}`}>
          {showDaysText ? (
            <DaysTogether
              textPrincipal={CONSTANT.home.principal}
              textSecondary={CONSTANT.home.secondary}
              startDate={CONSTANT.daysTogether}
            />
          ) : (
            <button className="iconButton" onClick={handleRevealDays}>
              <CalendarDays size={20} />
            </button>
          )}
        </div>

        <div className="cornerHeartButton" hidden={magicMode ? true : false}>
          <button className="iconButton" onClick={handleHeartbeat}>
            <Heart size={24} />
          </button>
        </div>

        <div className="cornerMenuButton" hidden={showElement ? true : false}>
          <button className="iconButton" onClick={() => handleNavigation('/thingsAboutYou')}>
            <AlignJustify size={20} />
          </button>
        </div>

        <div className="cornerEyeButton" hidden={showElement ? true : false}>
          <button className="iconButton" onClick={toggleButtons}>
            <Eye size={24} />
          </button>

          <AnimatePresence>
            {showButtons && (
              <motion.div
                className="expandedButtons"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {listButtonIcons.map(({ icon, label, onClick }) => (
                  <motion.button
                    key={label}
                    className="iconButton"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    style={{ marginTop: '0.5rem' }}
                    onClick={onClick}
                  >
                    {icon}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={`homeContent ${showElement ? 'hiddenText' : ''}`}>
          <h1 className="birthdayText enhanced-title">
            {CONSTANT.home.text.split('').map((char, index) => (
              <motion.span
                key={index}
                className="bounceLetter"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                  delay: index * 0.1,
                }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>

        {heartbeat && (
          <motion.div
            className="heartbeatHeart"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="heartbeatText">
              {CONSTANT.heartText}
            </div>
          </motion.div>
        )}

        {activeEffect === 'hearts' && (
          <EffectMessage message={CONSTANT.effectsMessage.hearts} />
        )}

        {activeEffect === 'stars' && (
          <EffectMessage message={CONSTANT.effectsMessage.stars} />
        )}

        {magicMode && (
           <EffectMessage message={CONSTANT.effectsMessage.goodNight} nameClass={showMessage} />
        )}

        <PolaroidDisplay isVisible={showPolaroid} onClose={handleOnClosePolaroid} />
      </div>
  );
}

export default Home;
