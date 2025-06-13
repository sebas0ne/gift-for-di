// src/pages/Home/Home.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Heart, Star, Image, Moon, HandHeart } from 'lucide-react';
import DaysTogether from '../../components/common/DaysTogether';
import AnimatedLayout from '../../layouts/AnimatedLayout';

import BackgroundAnimation from '../../components/animations/BackgroundAnimation';
import FloatingParticles from '../../components/effects/FloatingParticles';
import EffectMessage from '../../components/effects/EffectMessage';

import CONSTANT from '../../utils/constant';
import '../../styles/Pages/Home/Home.css';

function Home() {
  const [showButtons, setShowButtons] = useState(false);
  const [heartbeat, setHeartbeat] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [activeEffect, setActiveEffect] = useState(null);
  const [magicMode, setMagicMode] = useState(false);
  const [showElement, setShowElement] = useState(false);

  const toggleButtons = () => {
    setShowButtons((prev) => !prev);
  };

  const handleHeartbeat = () => {
    setHeartbeat(true);
    setShowMessage(true);
    setShowElement(true);

    setTimeout(() => {
      setHeartbeat(false);
      setShowElement(false);
    }, 3000);

    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const handleHeartbeatEffect = () => {
    setActiveEffect('hearts');

    setTimeout(() => {
      setActiveEffect(null);
    }, 6000);
  };

  const handleStarWish = () => {
    setActiveEffect('stars');
    
    setTimeout(() => {
      setActiveEffect(null);
    }, 6000);
  };

  const handleMagicMode = () => {
    setMagicMode(!magicMode);
    
    setTimeout(() => {

    }, 2000);
  };

  const buttonIcons = [
    { icon: <HandHeart size={20} />, label: 'HandHeart', onClick: handleHeartbeatEffect },
    { icon: <Star size={20} />, label: 'Tune', onClick: handleStarWish },
    { icon: <Image size={20} />, label: 'Party' },
    { icon: <Moon size={20} />, label: 'Surprise', onClick: handleMagicMode },
  ];

  return (
    <AnimatedLayout transitionName="bounceUp">
      <div className={`homeContainer ${heartbeat ? 'heartbeat' : ''} ${magicMode ? 'magic-mode' : ''}`}>

      <BackgroundAnimation />

        {activeEffect === 'hearts' && <FloatingParticles type="hearts" count={80} />}
        {activeEffect === 'stars' && <FloatingParticles type="stars" count={80} />}

        <div className="cornerHeartButton">
          <button className="eyeButton" onClick={handleHeartbeat}>
            <Heart size={24} />
          </button>
        </div>
        <div className="cornerEyeButton" hidden={showElement ? true : false}>
          <button className="eyeButton" onClick={toggleButtons}>
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
                {buttonIcons.map(({ icon, label, onClick }) => (
                  <motion.button
                    key={label}
                    className="eyeButton"
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

        {showMessage && (
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
           <EffectMessage message={CONSTANT.effectsMessage.goodNight} />
        )}

        <div className={`homeFooter ${showElement ? 'hiddenText' : ''}`}>
          <DaysTogether
            textPrincipal={CONSTANT.home.principal}
            textSecondary={CONSTANT.home.secondary}
            startDate={CONSTANT.daysTogether}
          />
        </div>
      </div>
    </AnimatedLayout>
  );
}

export default Home;
