// src/animations/pageTransitions.js

const pageTransitions = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.6, ease: 'easeInOut' }
    },
  
    slideUp: {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -40 },
      transition: { duration: 0.6, ease: 'easeOut' }
    },
  
    slideLeft: {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 100 },
      transition: { duration: 0.5, ease: 'easeInOut' }
    },
  
    portal: {
      initial: { opacity: 0, rotateY: 90 },
      animate: { opacity: 1, rotateY: 0 },
      exit: { opacity: 0, rotateY: -90 },
      transition: { duration: 0.7, ease: 'easeInOut' }
    },
  
    zoom: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.1 },
      transition: { duration: 0.5 }
    },
  
    bounceUp: {
      initial: { opacity: 0, y: 100 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 100 },
      transition: { duration: 0.6, type: 'spring', stiffness: 100 }
    },
  
    slideFadeBottom: {
      initial: { opacity: 0, y: 80 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 80 },
      transition: { duration: 0.7, ease: 'easeOut' }
    },
  
    dissolve: {
      initial: { opacity: 0, scale: 0.95, filter: 'blur(5px)' },
      animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, scale: 1.05, filter: 'blur(8px)' },
      transition: { duration: 0.6, ease: 'easeInOut' }
    },
  };

export default pageTransitions;
