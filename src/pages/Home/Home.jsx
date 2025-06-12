// src/pages/Home/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import DaysTogether from '../../components/common/DaysTogether';
import '../../styles/Pages/Home/Home.css';

function Home() {
  const birthdayDate = '2023-10-21';
  const principal = 'Te recuerdo que llevamos';
  const secondary = 'días juntos';

  return (
    <div className="homeContainer">
      <div className="homeContent">
        <motion.h1
          className="birthdayText"
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        >
          ¡Feliz Cumpleaños Di!
        </motion.h1>
      </div>

      <div className="homeFooter">
        <DaysTogether textPrincipal={principal} textSecondary={secondary} startDate={birthdayDate} />
      </div>
    </div>
  );
}

export default Home;
