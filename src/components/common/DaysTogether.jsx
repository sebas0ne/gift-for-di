// src/components/common/DaysTogether.jsx
import React from 'react';
import useDaysSince from '../../hooks/useDaysSince';
import '../../styles/common/daysTogether.css';

function DaysTogether({ startDate, textPrincipal, textSecondary }) {
  const days = useDaysSince(startDate);

  return (
    <div className="daysTogether">
      {textPrincipal} <span>{days}</span> {textSecondary} ❤️
    </div>
  );
}

export default DaysTogether;
