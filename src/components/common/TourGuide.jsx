// src/components/TourGuide.jsx
import { useEffect, useRef } from 'react';
import Shepherd from 'shepherd.js';

import '../../styles/common/TourGuide.css';

const TourGuide = () => {
  const tourRef = useRef(null);
  const hasStartedRef = useRef(false);

  if (!tourRef.current) {
    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        scrollTo: true,
        cancelIcon: { enabled: true },
        classes: 'shepherd-theme-arrows',
      },
      useModalOverlay: true,
    });

    tour.addStep({
      id: 'step-1',
      text: 'Escanea los QRs y disfruta, son 17 por cierto.',
      attachTo: { element: '.qrSection', on: 'bottom' },
      buttons: [{ text: 'Siguiente', action: tour.next }],
    });

    tour.addStep({
      id: 'step-2',
      text: 'Si das click a este botón puedes descubrir muchas sorpresas.',
      attachTo: { element: '.infoButton', on: 'bottom-end' },
      buttons: [
        { text: 'Volver', action: tour.back },
        { text: 'Finalizar', action: tour.complete },
      ],
    });

    tourRef.current = tour;
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!hasStartedRef.current && !localStorage.getItem('hasSeenTour')) {
        tourRef.current.start();
        hasStartedRef.current = true;
        localStorage.setItem('hasSeenTour', 'true');
      }
    }, 300);
  
    return () => clearTimeout(timeout);
  }, []);

  return null;
};

export default TourGuide;
