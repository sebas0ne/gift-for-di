// src/components/animations/FlipUnit.jsx
import { useState, useEffect } from 'react';

function FlipUnit({ value, label }) {
    const [previousValue, setPreviousValue] = useState(value);
    const [flipping, setFlipping] = useState(false);
  
    useEffect(() => {
      if (value !== previousValue) {
        setFlipping(true);
        const timeout = setTimeout(() => {
          setFlipping(false);
          setPreviousValue(value);
        }, 500);
        return () => clearTimeout(timeout);
      }
    }, [value, previousValue]);
  
    return (
      <div className="countdownItem">
        <div className="flipUnit">
          <div className={`card ${flipping ? 'flip' : ''}`}>
            <div className="cardFace flipBottom">{previousValue}</div>
            <div className="cardFace foldBottom">{value}</div>
          </div>
        </div>
        <span>{label.toUpperCase()}</span>
      </div>
    );
  }

  export default FlipUnit;
