import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { subtractDatesInDays, getTodayKey } from '../../utils/handlingDates';

import CONSTANT from '../../utils/constant';
import '../../styles/common/PolaroidDisplay.css';

const PolaroidDisplay = ({ isVisible, onClose }) => {
  const [currentPolaroid, setCurrentPolaroid] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isVisible) return;

    const storedData = JSON.parse(localStorage.getItem('polaroidTracker')) || undefined;
    const todayKey = getTodayKey();
    let tracker = storedData;
    const lastDayKey = tracker ? tracker.lastDay : todayKey;
    const diffDays = subtractDatesInDays(todayKey,lastDayKey);

    if (tracker === undefined) {
      tracker = {
        countDaily: 0,
        count: 0,
        lastDay: todayKey
      };
      localStorage.setItem('polaroidTracker', JSON.stringify(tracker));
    }
    if (diffDays > 0) {
      tracker.countDaily = 0;
    }
    if (tracker.count === CONSTANT.polaroids.length) {
      tracker.count = 0;
    }
    if (tracker.countDaily < CONSTANT.maxImgDaily) {
      const polaroidToShow = CONSTANT.polaroids[tracker.count];
        tracker.countDaily++;
        tracker.count++;
        tracker.lastDay = todayKey;
        tracker = {
          countDaily: tracker.countDaily,
          count: tracker.count,
          lastDay: tracker.lastDay
        };
        localStorage.setItem('polaroidTracker', JSON.stringify(tracker));
        setIsLoading(true);
        setCurrentPolaroid(polaroidToShow);
    } else {
      setIsLoading(true);
      setCurrentPolaroid(CONSTANT.defaultImage);
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && currentPolaroid && (
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
            {isLoading && <div className="polaroidLoader"></div>}
              <img src={currentPolaroid.src} alt="Polaroid" className={`polaroidImage ${isLoading ? 'hidden' : ''}`} onLoad={() => setIsLoading(false)} />
              <p className="polaroidCaption">{currentPolaroid.description}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PolaroidDisplay;
