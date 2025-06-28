// src/pages/CountdownGate.jsx
import { useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import CircularText from "../components/animations/CircularText";
import FlipUnit from "../components/animations/FlipUnit"

import CONSTANT from '../utils/constant';
import '../styles/Pages/CountdownGate.css';

function CountdownGate({ targetDate, onComplete }) {
  const [timeLeft, setTimeLeft] = useState({});
  const [skipCountdown, setSkipCountdown] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const formatTime = (value) => String(value ?? 0).padStart(2, '0');

  const calculateTimeLeft = useCallback(() => {
    const [year, month, day] = targetDate.split('-').map(Number);
    const target = new Date(Date.UTC(year, month - 1, day, 5, 0, 0));
    const now = new Date();
  
    const difference = target - now;
    if (difference <= 0) return {};
  
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, [targetDate]);

  useEffect(() => {
    const initial = calculateTimeLeft();
    if (Object.keys(initial).length === 0) {
      setSkipCountdown(true);
      onComplete();
    }
    setTimeLeft(initial);
    setIsReady(true);
  }, [calculateTimeLeft, onComplete]);

  useEffect(() => {
    if (skipCountdown) return;
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      if (Object.keys(updated).length === 0) {
        clearInterval(timer);
        gsap.to('.countdownGate', {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            const gate = document.querySelector('.countdownGate');
            if (gate) gate.style.display = 'none';
            onComplete();
          },
        });
        return;
      }
      setTimeLeft(updated);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, calculateTimeLeft, onComplete, skipCountdown]);

  if (!isReady || skipCountdown) return null;

  return (
    <div className="countdownGate">
      <div className="titleCountdown">
        <CircularText
          text={CONSTANT.titleCountdown}
          onHover="pause"
          spinDuration={10}
          className="countdown"
        />
      </div>

      <div className="countdown">
        {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
          <FlipUnit key={unit} value={formatTime(timeLeft[unit])} label={unit} />
        ))}
      </div>
    </div>
  );
}

export default CountdownGate;
