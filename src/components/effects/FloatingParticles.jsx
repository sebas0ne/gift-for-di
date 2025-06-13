
// src/components/effects/FloatingParticles.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FloatingParticles = ({ type = 'hearts', count = 20 }) => {
  const [particles, setParticles] = useState([]);
  const getParticleEmoji = (type) => {
    const emojis = {
      hearts: ['❤️‍🔥', '❤️', '♥️', '❣️','💌','❤️‍🔥', '❤️', '♥️', '❣️','💌', '❤️', '♥️', '❣️'],
      stars: ['✨', '⭐', '🌟', '💫','✨', '⭐', '🌟', '💫','✨', '⭐', '🌟','⭐', '🌟']
    };
    const emojiSet = emojis[type] || emojis.hearts;
    return emojiSet[Math.floor(Math.random() * emojiSet.length)];
  };

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 4 + Math.random() * 2,
        size: 0.8 + Math.random() * 0.4
      });
    }
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="floatingParticles">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`particle particle-${type}`}
          style={{ 
            left: `${particle.x}%`, 
            top: `${particle.y}%`,
            fontSize: `${particle.size * 1.5}rem`
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            scale: [0, particle.size * 1.5, 0],
            y: [0, -100],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeOut"
          }}
        >
          {getParticleEmoji(type)}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingParticles;