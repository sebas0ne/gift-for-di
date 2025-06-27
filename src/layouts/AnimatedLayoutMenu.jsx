// src/layouts/AnimatedLayoutMenu.jsx
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Menu from '../components/animations/Menu';
import pageTransitions from '../utils/pageTransitions';

function AnimatedLayoutMenu({ children, transitionName = 'bounceUp' }) {
  const transition = pageTransitions[transitionName];

  return (
    <AnimatePresence>
      <Menu />
      <motion.div
        key={window.location.pathname}
        {...transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimatedLayoutMenu;
