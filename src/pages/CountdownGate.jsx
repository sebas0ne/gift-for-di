import { useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import CircularText from "../components/animations/CircularText";
import '../styles/Pages/CountdownGate.css'

function CountdownGate({ targetDate, onComplete }) {
  const [timeLeft, setTimeLeft] = useState({});
  const [finished, setFinished] = useState(false);
  const [skipCountdown, setSkipCountdown] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const formatTime = (value) => String(value).padStart(2, '0');

  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, [targetDate]);

  useEffect(() => {
    const initialTimeLeft = calculateTimeLeft();
    setTimeLeft(initialTimeLeft);

    if (Object.keys(initialTimeLeft).length === 0) {
      setSkipCountdown(true);
      onComplete();
    }

    setIsReady(true);
  }, [calculateTimeLeft, onComplete]);

  useEffect(() => {
    if (skipCountdown) return;

    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      setTimeLeft(updatedTimeLeft);

      if (Object.keys(updatedTimeLeft).length === 0 && !finished) {
        clearInterval(timer);
        setFinished(true);
        gsap.to('.countdown-gate', {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            const gate = document.querySelector('.countdown-gate');
            if (gate) gate.style.display = 'none';
            onComplete();
          },
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft, finished, onComplete, skipCountdown]);

  if (!isReady || skipCountdown) return null;

  return (
    <div className="countdown-gate">
      <div className="title-countdown">
        <CircularText
          text="* ESTE REGALO * SE DESBLOQUEA * EN "
          onHover="pause"
          spinDuration={10}
          className="countdown"
        />
      </div>

      <div className="countdown">
        {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
          <div className="countdown-item" key={unit}>
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">{formatTime(timeLeft[unit])}</div>
                <div className="flip-card-back">{formatTime(timeLeft[unit])}</div>
              </div>
            </div>
            <span>{unit.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountdownGate;
