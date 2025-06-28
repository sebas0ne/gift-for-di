// src/components/common/PolaroidMovies.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import '../../styles/common/PolaroidDisplay.css';

const PolaroidMovies = ({ isVisible, imagesData,  onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    setIsLoading(true);
    const saved = localStorage.getItem(`rating-${imagesData.title}`);
    if (saved) {
      setRating(parseFloat(saved));
    } else {
      setRating(0);
    }
  }, [isVisible, imagesData]);

  const handleRate = (value) => {
    setRating(value);
    localStorage.setItem(`rating-${imagesData.title}`, value);
  };

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
              {isLoading && <div className="polaroidLoader"></div>}
              <img
                src={imagesData.image}
                alt="Polaroid"
                className={`polaroidImage ${isLoading ? 'hidden' : ''}`}
                onLoad={() => setIsLoading(false)}
              />
              <p className="polaroidCaption">{imagesData.title}</p>

              <div className="polaroidSeparator"></div>

              <div className="polaroidGenres">
                {imagesData.movie_genres?.map((genre, index) => (
                  <span key={index} className="genreTag">{genre}</span>
                ))}
              </div>

              <div className="polaroidSeparator"></div>

              <div className="starRatingContainer">
                  {[...Array(10)].map((_, index) => {
                    const starIndex = index + 1;
                    const isHalf = rating >= starIndex - 0.5 && rating < starIndex;
                    const isFull = rating >= starIndex;

                    const handleStarClick = (e) => {
                      const { left, width } = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX || e.touches?.[0]?.clientX;
                      const clickedOnLeft = x - left < width / 2;

                      const newRating = clickedOnLeft ? starIndex - 0.5 : starIndex;
                      handleRate(newRating);
                    };

                    return (
                      <span
                        key={index}
                        className={`star ${isFull ? 'filled' : isHalf ? 'half' : 'empty'}`}
                        onClick={handleStarClick}
                        onTouchStart={handleStarClick}
                      >
                        ★
                      </span>
                    );
                  })}
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PolaroidMovies;
