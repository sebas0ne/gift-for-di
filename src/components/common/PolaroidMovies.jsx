import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import '../../styles/common/PolaroidDisplay.css';

const PolaroidMovies = ({ isVisible, imagesData,  onClose }) => {
    useEffect(() => {
        if (!isVisible) return;
      }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            className="polaroidBackdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="polaroidContainer"
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <div className="polaroid">
              <img src={imagesData.image} alt="Polaroid" className="polaroidImage" />
              <p className="polaroidCaption">{imagesData.title}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PolaroidMovies;
