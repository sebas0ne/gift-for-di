// src/pages/Home/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import DaysTogether from '../../components/common/DaysTogether';
import '../../styles/Pages/Home/Home.css';

function Home() {
  const birthdayDate = '2023-10-21';
  const text = '¡Feliz  Cumpleaños  Di!';
  const principal = 'Te recuerdo que llevamos';
  const secondary = 'días juntos';

  return (
    <div className="homeContainer">
      <div className="cornerEyeButton">
        <button className="eyeButton">
          <Eye size={24} />
        </button>
      </div>

      <div className="homeContent">
        <h1 className="birthdayText">
          {text.split('').map((char, index) => (
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

      <div className="homeFooter">
        <DaysTogether textPrincipal={principal} textSecondary={secondary} startDate={birthdayDate} />
      </div>
    </div>
  );
}

export default Home;
