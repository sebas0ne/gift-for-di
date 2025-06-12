// src/pages/Home/Home.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye, Heart, Star, Music, Smile } from 'lucide-react';
import DaysTogether from '../../components/common/DaysTogether';
import AnimatedLayout from '../../layouts/AnimatedLayout';
import CONSTANT from '../../utils/constant';
import '../../styles/Pages/Home/Home.css';

function Home() {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const [heartbeat, setHeartbeat] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const toggleButtons = () => {
    setShowButtons((prev) => !prev);
  };

  const handleHeartbeat = () => {
    setHeartbeat(true);
    setShowMessage(true);

    setTimeout(() => {
      setHeartbeat(false);
    }, 2000);

    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const buttonIcons = [
    { icon: <Heart size={20} />, label: 'Love', onClick: handleHeartbeat },
    { icon: <Star size={20} />, label: 'Wish' },
    { icon: <Music size={20} />, label: 'Tune' },
    { icon: <Smile size={20} />, label: 'Surprise' },
  ];

  return (
    <AnimatedLayout transitionName="bounceUp">
      <div className={`homeContainer ${heartbeat ? 'heartbeat' : ''}`}>
        <div className="cornerEyeButton">
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
                {buttonIcons.map(({ icon, label, onClick }, index) => (
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

        <div className="homeContent">
          <h1 className="birthdayText">
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

        <button
          onClick={() => navigate('/about')}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '8px',
            background: 'black',
            color: 'white',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          Ir a About
        </button>

        {showMessage && (
          <motion.div
            className="heartbeatHeart"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="heartbeatText">
              Mi corazón late por ti todos los días.
            </div>
          </motion.div>
        )}

        <div className="homeFooter">
          <DaysTogether
            textPrincipal={CONSTANT.home.principal}
            textSecondary={CONSTANT.home.secondary}
            startDate={CONSTANT.home.birthdayDate}
          />
        </div>
      </div>
    </AnimatedLayout>
  );
}

export default Home;
