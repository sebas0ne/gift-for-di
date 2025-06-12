// src/layouts/AnimatedLayout.jsx
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import pageTransitions from '../utils/pageTransitions';

function AnimatedLayout({ children, transitionName = 'fade' }) {
  const transition = pageTransitions[transitionName];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={window.location.pathname}
        {...transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimatedLayout;
