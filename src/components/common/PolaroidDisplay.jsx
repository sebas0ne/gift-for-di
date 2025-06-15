// components/PolaroidDisplay.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/common/PolaroidDisplay.css';

const polaroids = [
  {
    src: '/images/cita-en-mac-1.png',
    description: 'Una cita especial.',
  },
  {
    src: '/images/primera-navidad-2.png',
    description: 'Nuestra primera navidad.',
  },
  {
    src: '/images/primera-cita-1.png',
    description: 'Primera Cita.',
  }
];

const PolaroidDisplay = ({ isVisible, onClose }) => {
  const randomIndex = Math.floor(Math.random() * polaroids.length);
  const { src, description } = polaroids[randomIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Fondo difuminado */}
          <motion.div
            className="polaroidBackdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Polaroid centrado */}
          <motion.div
            className="polaroidContainer"
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <div className="polaroid">
              <img src={src} alt="Polaroid" className="polaroidImage" />
              <p className="polaroidCaption">{description}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PolaroidDisplay;
