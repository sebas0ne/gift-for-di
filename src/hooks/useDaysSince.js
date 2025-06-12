// src/hooks/useDaysSince.js
import { useState, useEffect } from 'react';

const useDaysSince = (startDate) => {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const today = new Date();
    const start = new Date(startDate);
    const diffTime = today - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays);
  }, [startDate]);

  return days;
};

export default useDaysSince;
