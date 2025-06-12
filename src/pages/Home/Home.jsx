// src/pages/Home/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import DaysTogether from '../../components/common/DaysTogether';
import AnimatedLayout from '../../layouts/AnimatedLayout'
import CONSTANT from '../../utils/constant';
import '../../styles/Pages/Home/Home.css';

function Home() {
  const navigate = useNavigate();
  return (
    <AnimatedLayout transitionName="bounceUp">
      <div className="homeContainer">
        <div className="cornerEyeButton">
          <button className="eyeButton">
            <Eye size={24} />
          </button>
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
        {/* Botón temporal para probar navegación */}
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
        <div className="homeFooter">
          <DaysTogether textPrincipal={CONSTANT.home.principal} textSecondary={CONSTANT.home.secondary} startDate={CONSTANT.home.birthdayDate} />
        </div>
      </div>
    </AnimatedLayout>
  );
}

export default Home;
