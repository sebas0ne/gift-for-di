// src/pages/Home/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/Pages/Home/Home.css';

function Home() {
  return (
    <div className="homeContainer">
      <motion.h1
        className="birthdayText"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut'
        }}
      >
        ¡Feliz Cumpleaños Di!
      </motion.h1>
    </div>
  );
}

export default Home;
